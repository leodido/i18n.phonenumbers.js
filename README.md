I18n phone numbers
==================

**Parse, format, and validate international phone numbers through Google's libphonenumber**.

[![Bower](https://img.shields.io/bower/v/i18n-phonenumbers.svg?style=flat-square)]() [![License](https://img.shields.io/badge/license-Apache--2.0-yellowgreen.svg)](http://opensource.org/licenses/Apache-2.0)

This repository provides an already compiled JavaScript library aimed to parse, to format and to validate international telephone numbers. It uses the last version (actually 7.0.3) of Google's [libphonenumber](https://github.com/googlei18n/libphonenumber).

There are two available builds:

1. with full metadata

2. with lite metadata (lacks example numbers)

Features
--------

Exported on `leodido.i18n.PhoneNumbers` object:

* `getNumberType(phoneNumber, regionCode)`

    Retrieves the type of the given number (with region code). Distinguishes between more than 10 types of phone numbers (fixed line, mobile, VOIP, etc.).

* `getRegionCodeForNumber(phoneNumber, regionCode)`

    Retrieves the region where a phone number is from
    
* `formatNumber(phoneNumber, regionCode, format)`

    Formats a phone number for a region to a specific format (i.e., E164, international, national, or RFC3966).

* `formatOriginal(phoneNumber, regionCode)`

    Formats a phone number using the original phone number format that the number is parsed from.

* `formatOutOfCountryCalling(phoneNumber, regionCode, regionCallingFrom)`

    Formats a phone number for out-of-country dialing purposes.

* `formatMobileDialing(phoneNumber, regionCode, regionCallingFrom)`

    Returns a phone number formatted in such a way that it can be dialed from a mobile phone in a specific region.

* `getExampleNumber(regionCode, type, format)`

    Retrieves an example phone number of the given type (fixed line, mobile, etc.) for the specified region and formats it into the provided format (or fallbacks to E164 format).

* `isValidNumber(phoneNumber, regionCode)`

    Full validates a phone number for a region using length and prefix information.

* `isPossibleNumber(phoneNumber, regionCode)`

    Quickly guesses whether a phone number is possible by using only the length information (faster then full validation).

* `isPossibleNumberWithReason(phoneNumber, regionCode)`

    As above but gives us additional info about the provided phone number.

The exported object `leodido.i18n.AsYouTypeFormatter` is a simple proxy to Google's `i18n.phonenumbers.AsYouTypeFormatter`. It can be used to format phone numbers on-the-fly when users enter each digit, with this functions:

* `inputDigit(nextChar)`

* `inputDigitAndRememberPosition(nextChar)`

* `getRememberedPosition()`

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

1. Built-in integration with Google Closure (compiler and library)

2. Automated fetch (via bower) of last version of Google's libphonenumber library

3. Automated build system, so simple and automated upgrades

Known issues
------------

* Target `test` needs to be fixed

---

[![Analytics](https://ga-beacon.appspot.com/UA-49657176-1/i18n.phonenumbers.js)](https://github.com/igrigorik/ga-beacon)
