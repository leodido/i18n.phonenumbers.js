I18n phone numbers
==================

**Parse, format, and validate international phone numbers through Google's libphonenumber**.

[![Bower](https://img.shields.io/bower/v/i18n-phonenumbers.svg?style=flat-square)]()

This repository provides an already compiled JavaScript library aimed to parse, to format and to validate international telephone numbers. It uses the last version of Google's libphonenumber.

There are two available libraries:

1. with full metadata

2. with lite metadata (lacks example numbers)

Usage
-----

*WIP*

Install
-------

Install it via `bower`.

```
bower install i18n-phonenumbers
```

Otherwise you can simply grab `i18n.phonenumbers.min.js` file/s in the repository root.

Update
------

Have googlers committed new metadata or something else?

No problem, ping me ([@leodido](https://twitter.com/leodido)) and I will update it to the last release of Google's libphonenumber.

Or simply **DIY**.

1. Clone this repo

    ```
    $ git clone git@github.com:leodido/ni18n.phonenumbers.js.git
    $ cd i18n.phonenumbers.js/
    ```

2. Install it locally (you will need `npm`, of course) ...
    
    ```
    $ npm install
    ```

3. Build it against the last grabbed release of libphonenumber (see below) and **make me a PR**.

    ```
    $ npm run release
    ```

Build
-----

Build is handled through [Gulp](https://github.com/gulpjs/gulp/) and performed mainly via [Google Closure Compiler](https://github.com/google/closure-compiler).

Need help? Run `gulp help` !

```
# Usage
#   gulp [task]
# 
# Available tasks
#   build                                   Build the library from source files 
#    --target=full|lite|test                Files to use
#   bump                                    Bump version up for a new release 
#    --level=major|minor|patch|prerelease   Version level to increment
#   clean                                   Clean build 
#    --target=full|lite|test                Files to use
#   help                                    Display this help text
#   lint                                    Lint JS source files 
#    --target=full|lite|test                Files to use
#   version                                 Print the library version
```

To build a new version (both full and lite) of the JavaScript library:

```
$ npm run release
```

Differences from other forks/wrappers
-------------------------------------

* Built-in integration with Google Closure (compiler and library)
* Automated fetch (via bower) of last version of Google's libphonenumber library
* Automated build system, so simple and automated upgrades

Known issues
------------

* Target `test` needs to be fixed

---

[![Analytics](https://ga-beacon.appspot.com/UA-49657176-1/i18n.phonenumbers.js)](https://github.com/igrigorik/ga-beacon)
