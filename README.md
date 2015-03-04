Date elements
=============

**AngularJS select directives for date elements**.

[![Bower](https://img.shields.io/bower/v/ng-date-elements.svg?style=flat-square)]()

### Directives:

- MonthSelect
- YearSelect
- SelectComposite
- ExpirySelect

*WIP*

Usage
-----

*WIP*

Install
-------

Install it via `bower`.

```
bower install ng-date-elements
```

Or, you can clone this repo and install it locally (you will need `npm`, of course).

```
$ git clone git@github.com:leodido/ng-date-elements.git
$ cd ng-date-elements/
$ npm install
```

Otherwise you can simply grab `date-elements.min.js` file in the repository root, and include it together with angular (~1.3) in your HTML page.

Build
-----

Build is handled through [Gulp](https://github.com/gulpjs/gulp/) and performed mainly via [Google Closure Compiler](https://github.com/google/closure-compiler).

Need help? Run `gulp help` !

```
# Usage
#   gulp [task]
# 
# Available tasks
#   build                                   Build the library 
#    --banner                               Prepend banner to the built file
#    --env=production|development           Kind of build to perform, defaults to production
#   bump                                    Bump version up for a new release 
#    --level=major|minor|patch|prerelease   Version level to bump
#   clean                                   Clean build directory
#   help                                    Display this help text
#   lint                                    Lint JS source files
#   version                                 Print the library version
```

To build a development version (logging not disabled, sourcemaps file) of JS lib:

```
$ gulp build --env dev
```

Or, also:

```
$ npm run development
```

Rather to build a production ready code:

```
$ npm run production
````

---

[![Analytics](https://ga-beacon.appspot.com/UA-49657176-1/ng-date-elements)](https://github.com/igrigorik/ga-beacon)
