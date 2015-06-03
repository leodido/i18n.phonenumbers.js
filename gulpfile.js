'use strict';

var gulp = require('gulp'),
    debug = require('gulp-debug'),
    filter = require('gulp-filter'),
    replace = require('gulp-replace'),
    ccompiler = require('gulp-closure-compiler'),
    gjslint = require('gulp-gjslint'),
    bump = require('gulp-bump'),
    del = require('del'),
    calcdeps = require('calcdeps'),
    sequence = require('run-sequence'),
    gutil = require('gulp-util'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    minimist = require('minimist'),
    path = require('path'),
    knownArgs = {
      'string': ['target', 'level', 'country', 'prefix'],
      'default': {
        target: 'full',
        level: 'patch'
      },
      'alias': { t: 'target', l: 'level', c: 'country', p: 'prefix' }
    },
    metadataGenerated = false;


/**
 * @typedef {Object} GulpArguments
 * @property {!string} level
 * @property {!string} target
 * @property {!string} country
 */
var GulpArguments;


/** @type {GulpArguments} */
var args = minimist(process.argv.slice(2), knownArgs),
    allowedLevels = ['major', 'minor', 'patch', 'prerelease'],
    allowedTargets = ['full', 'lite', 'bycountry', 'test'],
    targetsHelp = { options: {} },
    countryHelp = { options: {} },
    levelsHelp = { options: {} };
var getLevel = function() {
  if (allowedLevels.indexOf(args.level) === -1) {
    args.level = knownArgs.default.level;
  }
  return args.level;
};
var getTarget = function() {
  if (allowedTargets.indexOf(args.target) === -1) {
    args.target = knownArgs.default.target;
  }
  return args.target;
};
var getCountries = function() {
  if (typeof args.country === 'string') {
    return args.country.split(',').map(Function.prototype.call, String.prototype.trim);
  }
  return [];
};
var getPrefix = function() {
  if (typeof args.prefix === 'string') {
    return args.prefix + '.';
  }
  return getCountries().join('.') + '.';
};
levelsHelp.options['level=' + allowedLevels.join('|')] = 'Version level to increment';
targetsHelp.options['target=' + allowedTargets.join('|')] = 'Files to use';
countryHelp.options['country=it,es,fr,de,..'] = 'Comma separated list of ISO 3166-1 alpha-2 country codes';
countryHelp.options['prefix=...'] = 'It specifies the output file name will be <prefix>.i18n.phonenumbers.min.js';


/**
 * @typedef {*} PackageJson
 * @property {!string} name
 * @property {!string} version
 * @property {!string} main
 */
var PackageJson;


/** @type {PackageJson} */
var bundle = require('./package.json');

// Redefine gulp to support help
gulp = require('gulp-help')(gulp, {
  description: 'Display this help text'
});


/**
 * @type {{
 * compiler: string,
 * library: string,
 * output: {full: (!string|*), lite: string, test: string},
 * sources: string[],
 * dist: !string,
 * bycountry: Array,
 * tests: Array,
 * metadata: {full: string, lite: string, test: string, bycountry: string},
 * deps: Array
 * }}
 */
var settings = {
  compiler: 'bower_components/closure-compiler/compiler.jar',
  library: 'bower_components/closure-library/',
  output: {
    full: bundle.main,
    lite: 'lite.' + bundle.main,
    bycountry: 'country.metadata.tmpl',
    test: 'test.' + bundle.main
  },
  sources: [
    'bower_components/libphonenumber/javascript/i18n/phonenumbers/phonemetadata.pb.js',
    'bower_components/libphonenumber/javascript/i18n/phonenumbers/phonenumber.pb.js',
    'bower_components/libphonenumber/javascript/i18n/phonenumbers/phonenumberutil.js',
    'bower_components/libphonenumber/javascript/i18n/phonenumbers/asyoutypeformatter.js',
    'bower_components/libphonenumber/javascript/i18n/phonenumbers/regioncodefortesting.js',
    'src/error.js',
    'src/validation.result.js',
    'src/type.js',
    'src/format.js',
    'src/phonenumbers.js',
    'src/asyoutypeformatter.js'
  ],
  dist: './dist',
  bycountry: [
    'src/filter/metadata.js'
  ],
  tests: [],
  metadata: {
    full: 'bower_components/libphonenumber/javascript/i18n/phonenumbers/metadata.js',
    lite: 'bower_components/libphonenumber/javascript/i18n/phonenumbers/metadatalite.js',
    bycountry: 'bower_components/libphonenumber/javascript/i18n/phonenumbers/metadata.js',
    test: 'bower_components/libphonenumber/javascript/i18n/phonenumbers/metadatafortesting.js'
  },
  deps: []
};
// NOTE: order matter


/**
 * @type {string[]}
 * // NOTE: test files need source files
 */
settings.tests = settings.sources.concat([
  // 'bower_components/libphonenumber/javascript/i18n/phonenumbers/regioncodefortesting.js',
  // 'bower_components/libphonenumber/javascript/i18n/phonenumbers/phonenumberutil_test.js', // FIXME
  'bower_components/libphonenumber/javascript/i18n/phonenumbers/asyoutypeformatter_test.js'
]);

gulp.task('lint', 'Lint JS source files', [], function() {
  var src = {
        full: settings.sources,
        lite: settings.sources,
        bycountry: settings.bycountry,
        test: settings.tests
      },
      pattern = {
        full: ['*asyoutypeformatter*', '*phonenumberutil*'],
        lite: ['*asyoutypeformatter*', '*phonenumberutil*'],
        bycountry: [],
        test: ['*asyoutypeformatter*', '*phonenumberutil*', '*testing*']
      },
      lintOptions = {
        flags: [
          '--flagfile=gjslint.conf'
        ]
      };
  // NOTE: metadata files not linted
  return gulp.src(src[getTarget()])
      .pipe(debug({ title: 'Lint'}))
      .pipe(filter(pattern[getTarget()]))
      .pipe(gjslint(lintOptions))
      .pipe(gjslint.reporter('console'), { fail: true });
}, targetsHelp);

// Sync task
gulp.task('deps', false, ['lint'], function(done) {
  var src = {
        full: settings.sources,
        lite: settings.sources,
        bycountry: settings.bycountry,
        test: settings.tests
      },
      options = { deps: [], exclude: [] },
      source = src[getTarget()],
      metadata = [metadataGenerated || settings.metadata[getTarget()]];

  options.input = metadata.concat(source);
  options.path = [settings.library];
  options.output_mode = 'list';

  calcdeps.calcdeps(options, function(err, results) {
    if (err) {
      gutil.log(gutil.colors.red(err));
      process.exit(1);
    } else {
      settings.deps = results;
      for (var i = 0; i < settings.deps.length; i++) {
        gutil.log('Dep #' + (i + 1), gutil.colors.green(settings.deps[i]));
      }
      done();
    }
  });
});

gulp.task('compile', false, ['deps'], function() {
  var target = getTarget(),
      wrapper = '(function(){%output%}).call(window);', //'(function(){%output%})();',
      level = 'VERBOSE',
      errors = ['accessControls', 'ambiguousFunctionDecl', 'checkDebuggerStatement', 'checkRegExp',
        'checkTypes', 'checkVars', 'const', 'constantProperty', 'deprecated', 'duplicate', 'duplicateMessage',
        'es5Strict', 'externsValidation', 'fileoverviewTags', 'globalThis', 'internetExplorerChecks', 'invalidCasts',
        'misplacedTypeAnnotation', 'missingProperties', 'nonStandardJsDocs', 'strictModuleDepCheck', 'suspiciousCode',
        'typeInvalidation', 'undefinedNames', 'undefinedVars', 'unknownDefines', 'uselessCode', 'visibility'];

  if (getTarget() === allowedTargets[2]) {
    wrapper = require('fs').readFileSync('src/template/country.metadata.tmpl', 'utf-8');
  }

  var outputFile = settings.output[target];
  if (metadataGenerated) {
    outputFile = getPrefix() + outputFile;
  }
  outputFile = path.join(settings.dist, outputFile);

  var cflags = {
    compilation_level: 'ADVANCED_OPTIMIZATIONS',
    language_in: 'ECMASCRIPT5_STRICT',
    generate_exports: true,
    output_wrapper: wrapper, // NOTE: IIFE
    warning_level: level,
    jscomp_error: errors
  };
  return gulp.src(settings.deps)
      .pipe(debug({title: 'Input'}))
      .pipe(ccompiler({
        compilerPath: settings.compiler,
        fileName: outputFile,
        compilerFlags: cflags
      }))
      .pipe(gulp.dest('./'));
});

// Strip multiline comments
gulp.task('rm-ml-comments', false, [], function() {
  var sourceFile = settings.output[getTarget()];
  if (metadataGenerated) {
    sourceFile = getPrefix() + sourceFile;
  }
  sourceFile = path.join(settings.dist, sourceFile);

  return gulp.src([sourceFile])
      .pipe(debug({ title: 'Removing multiline comments from' }))
      .pipe(replace(/(?:\/\*(?:[\s\S]*?)\*\/)/g, ''))
      .pipe(gulp.dest(settings.dist));
});

gulp.task('build', 'Build the library from source files', [], function(cb) {
  sequence('clean', 'compile', 'rm-ml-comments', cb);
}, targetsHelp);

gulp.task('clean', 'Clean build', [], function(cb) {
  var target = getTarget();
  var files = ['npm-debug.log'];
  files.push(path.join(settings.dist, settings.output[target]));
  for (var key in settings.output) {
    if (settings.output.hasOwnProperty(key)) {
      var fname = path.join(settings.dist, settings.output[key]);
      if (key !== target) {
        files.push('!' + fname);
      }
    }
  }
  gutil.log(files); // FIXME: remove me
  del(files, cb);
}, targetsHelp);

gulp.task('version', 'Print the library version', [], function() {
  return gutil.log('Library', gutil.colors.magenta(bundle.name) + ',', gutil.colors.magenta(bundle.version));
});

gulp.task('bump', 'Bump version up for a new release', [], function() {
  return gulp.src(['./bower.json', './package.json'])
      .pipe(bump({ type: getLevel() }))
      .pipe(gulp.dest('./'));
}, levelsHelp);

gulp.task('gen-metadata', false, [], function() {
  var countryCodes = getCountries();
  var metadataFileName = getPrefix() + 'metadata.js';
  var outputDirectory = './src';
  var stream = gulp.src(path.join(settings.dist, settings.output.bycountry))
      .pipe(template({
        namespace: 'i18n.phonenumbers.metadata',
        countries: countryCodes,
        mapJsdoc: '/**\n* A mapping from a country calling code to the region codes which denote the\n* region represented by that country calling code. In the case of multiple\n* countries sharing a calling code, such as the NANPA regions, the one\n* indicated with "isMainCountryForCode" in the metadata should be first.\n* @type {!Object.<number, Array.<string>>}\n*/',
        dataJsdoc: '/**\n* A mapping from a region code to the PhoneMetadata for that region.\n* @type {!Object.<string, Array>}\n*/'
      }))
      .pipe(rename(metadataFileName))
      .pipe(gulp.dest(outputDirectory));
  metadataGenerated = path.join(outputDirectory, metadataFileName);
  return stream;
}, countryHelp);

gulp.task('reset-target', false, [], function(cb) {
  args.target = allowedTargets[0]; // enforce target 'full'
  cb();
});

gulp.task('del-metadata', false, [], function(cb) {
  var metadataFile = path.join('./src', getPrefix() + 'metadata.js');
  del(metadataFile, cb);
});

gulp.task('countrybuild', 'Build a library that supports only specified countries', [], function(cb) {
  var countryCodes = getCountries();
  if (countryCodes.length > 0) {
    args.target = allowedTargets[2]; // enforce target 'bycountry'
    // 1 * compile metadata template
    // 2 * generate metadata from compiled template
    // 3 * remove compiled template
    // 4 * build a full version of the library with only the generated metadata
    sequence('build', 'gen-metadata', 'clean', 'reset-target', 'compile', 'rm-ml-comments', 'del-metadata', cb);
  } else {
    gutil.log(gutil.colors.magenta('ERROR:'), 'almost one valid country code needed.');
  }
}, countryHelp);
