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
    minimist = require('minimist'),
    knownArgs = {
      'string': ['target', 'level'],
      'default': {
        target: 'full',
        level: 'patch'
      },
      'alias': { t: 'target', l: 'level' }
    };


/**
 * @typedef {Object} GulpArguments
 * @property {!string} level
 * @property {!string} target
 */
var GulpArguments;


/** @type {GulpArguments} */
var args = minimist(process.argv.slice(2), knownArgs),
    allowedLevels = ['major', 'minor', 'patch', 'prerelease'],
    allowedTargets = ['full', 'lite', 'test'],
    targetsHelp = { options: {} },
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
levelsHelp.options['level=' + allowedLevels.join('|')] = 'Version level to increment';
targetsHelp.options['target=' + allowedTargets.join('|')] = 'Files to use';


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
 * tests: Array,
 * metadata: {full: string, lite: string, test: string},
 * deps: Array
 * }}
 */
var settings = {
  compiler: 'bower_components/closure-compiler/compiler.jar',
  library: 'bower_components/closure-library/',
  output: {
    full: bundle.main,
    lite: 'lite.' + bundle.main,
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
  tests: [],
  metadata: {
    full: 'bower_components/libphonenumber/javascript/i18n/phonenumbers/metadata.js',
    lite: 'bower_components/libphonenumber/javascript/i18n/phonenumbers/metadatalite.js',
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
        test: settings.tests
      },
      pattern = {
        full: ['*asyoutypeformatter*', '*phonenumberutil*'],
        lite: ['*asyoutypeformatter*', '*phonenumberutil*'],
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
        test: settings.tests
      },
      options = { deps: [], exclude: [] },
      source = src[getTarget()],
      metadata = [settings.metadata[getTarget()]];

  options.input = metadata.concat(source);
  options.path = [settings.library];
  options.output_mode = 'list';

  calcdeps.calcdeps(options, function(err, results) {
    if (err) {
      gutil.log(gutil.colors.red(err));
      process.exit(1);
    } else {
      settings.deps = results;
      done();
    }
  });
});

gulp.task('compile', false, ['deps'], function() {
  var target = getTarget(),
      level = 'VERBOSE',
      errors = ['accessControls', 'ambiguousFunctionDecl', 'checkDebuggerStatement', 'checkRegExp',
        'checkTypes', 'checkVars', 'const', 'constantProperty', 'deprecated', 'duplicate', 'duplicateMessage',
        'es5Strict', 'externsValidation', 'fileoverviewTags', 'globalThis', 'internetExplorerChecks', 'invalidCasts',
        'misplacedTypeAnnotation', 'missingProperties', 'nonStandardJsDocs', 'strictModuleDepCheck', 'suspiciousCode',
        'typeInvalidation', 'undefinedNames', 'undefinedVars', 'unknownDefines', 'uselessCode', 'visibility'];
  var cflags = {
    compilation_level: 'ADVANCED_OPTIMIZATIONS',
    language_in: 'ECMASCRIPT5_STRICT',
    generate_exports: true,
    output_wrapper: '(function(){%output%})();', // NOTE: IIFE
    warning_level: level,
    jscomp_error: errors
  };
  return gulp.src(settings.deps)
      .pipe(debug({title: 'Input'}))
      .pipe(ccompiler({
        compilerPath: settings.compiler,
        fileName: settings.output[target],
        compilerFlags: cflags
      }));
});

// Strip multiline comments
gulp.task('rm-ml-comments', false, [], function() {
  return gulp.src([settings.output[getTarget()]])
      .pipe(debug({ title: 'Removing multiline comments from '}))
      .pipe(replace(/(?:\/\*(?:[\s\S]*?)\*\/)/g, ''))
      .pipe(gulp.dest('./'));
});

gulp.task('build', 'Build the library from source files', [], function(cb) {
  sequence('clean', 'compile', 'rm-ml-comments', cb);
}, targetsHelp);

gulp.task('clean', 'Clean build', [], function(cb) {
  del([settings.output[getTarget()], 'npm-debug.log'], cb);
}, targetsHelp);

gulp.task('version', 'Print the library version', [], function() {
  return gutil.log('Library', gutil.colors.magenta(bundle.name) + ',', gutil.colors.magenta(bundle.version));
});

gulp.task('bump', 'Bump version up for a new release', [], function() {
  return gulp.src(['./bower.json', 'package.json'])
      .pipe(bump({ type: getLevel() }))
      .pipe(gulp.dest('./'));
}, levelsHelp);

// TODO: sourcemap

gulp.task('localize', false, [], function() {

});
