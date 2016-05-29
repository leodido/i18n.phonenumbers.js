i18n phone numbers
==================

**Parse, format, and validate international phone numbers through Google's libphonenumber**.

[![Bower](https://img.shields.io/bower/v/i18n-phonenumbers.svg?style=flat-square)](http://github.com/leodido/i18n.phonenumbers.js/releases/latest) [![License](https://img.shields.io/badge/license-apache--2.0-yellowgreen.svg?style=flat-square)](http://opensource.org/licenses/Apache-2.0)

This repository provides an already compiled JavaScript library aimed to parse, to format and to validate international telephone numbers. It wraps Google's [libphonenumber](https://github.com/googlei18n/libphonenumber) library.

There are two main files:

1. library with **full metadata** (i.e. **i18n.phonenumbers.min.js**)
2. library with **lite metadata**, that lacks example phone numbers (i.e. **lite.i18n...**)

However, **other versions** (smaller) **of the library can be built restricting countries metadata**. E.g.,

* library containing only europe (extended) metadata
* library containing only eurozone metadata
* etc. etc.

See [package.json](./package.json#L38-L51) for other available shortcut build scripts.

Generally **you can build any version of the library** (see [below](#build) for details).

This feature is very useful when your application needs **only the phone numbers of a specific country set** and you want to **save space**.

Do you want to format and validate only italian phone numbers?

Clone the repository, install its dependencies, and then run:

```
# gulp countrybuild --country=it
```

You'll get a file 10 times smaller than the full one.

Demos
-----

A demo demonstrating **i18n phone number parsing** is available [here](http://bit.ly/parse-phonenumbers).

You don't know Belize's phone numbers? No hassle. At this [link](http://bit.ly/phonenumbers-generator) you can **generate example phone numbers** for each country in the world!


Differences from other forks/wrappers
-------------------------------------

1. Built-in integration with Google Closure (compiler and library)
2. Automated fetch (via bower) of the Google's libphonenumber library
3. Fully automated build system
4. Support for various build types (e.g., with full metadata, with country's specific metadata)
5. Easy to maintain, simple to upgrade

Install
-------

Install it via `bower`.

```
# bower install i18n-phonenumbers
```

Otherwise you can simply grab `*.i18n.phonenumbers.min.js` file/s or use [rawgit](https://rawgit.com).

```html
<script src="https://cdn.rawgit.com/leodido/i18n.phonenumbers.js/master/dist/i18n.phonenumbers.min.js"></script>
```

Overview
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

* `formatOutOfCountryCalling(regionCallingFrom, phoneNumber, regionCode)`

    Formats a phone number for out-of-country dialing purposes.

* `formatMobileDialing(regionCallingFrom, phoneNumber, regionCode)`

    Returns a phone number formatted in such a way that it can be dialed from a mobile phone in a specific region.
    
* `formatNationalWithCarrierCode(carrierCode, phoneNumber, regionCode)`

    Formats a phone number in national format for dialing using the carrier.

* `formatNationalWithPreferredCarrierCode(fallbackCarrierCode, phoneNumber, regionCode)`

    Formats a phone number in national format for dialing using the preferred domestic carrier code (or a fallback carrier code if the preferred is missing).

* `getExampleNumber(regionCode, type, format)`

    Retrieves an example phone number of the given type (fixed line, mobile, etc.) for the specified region and formats it into the provided format (or fallbacks to E164 format).

* `isValidNumber(phoneNumber, regionCode)`

    Full validates a phone number for a region using length and prefix information.
    
* `isValidNumberForRegion(phoneNumber, regionCode)`

    Full verifies whether a phone number is valid for a certain region or not.

* `isPossibleNumber(phoneNumber, regionCode)`

    Quickly guesses whether a phone number is possible by using only the length information (faster then full validation).

* `isPossibleNumberWithReason(phoneNumber, regionCode)`

    As above but gives us additional info about the provided phone number.

The exported object `leodido.i18n.AsYouTypeFormatter` is a proxy to Google's `i18n.phonenumbers.AsYouTypeFormatter`. It can be used to format phone numbers on-the-fly when users enter each digit, with this functions:

* `inputDigit(nextChar)`

* `inputDigitAndRememberPosition(nextChar)`

* `getRememberedPosition()`


#### Notes

- Unless otherwise specified the `regionCode` always defaults to 'US'.


#### Examples

In the **demo** directory you can find examples covering phone number validation, formatting (as you type or one shot) and generation.

Update
------

Have googlers committed new metadata or something else?

No problem, ping me ([@leodido](https://twitter.com/leodido)) and I will update it to the last release of Google's libphonenumber.

Or simply **DIY**.

1. Clone this repo

    ```
    # git clone git@github.com:leodido/i18n.phonenumbers.js.git
    # cd i18n.phonenumbers.js/
    ```

2. Install it locally (you will need `npm`, of course) ...
    
    ```
    # npm install
    ```

3. Build it against the last grabbed release of libphonenumber (see below) and **make me a PR**. I'll be happy to merge it.

Makefile contains helpers to upgrade the library.

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
#    --target=full|lite|bycountry|test      Files to use
#   bump                                    Bump version up for a new release 
#    --level=major|minor|patch|prerelease   Version level to increment
#   clean                                   Clean build 
#    --target=full|lite|bycountry|test      Files to use
#  countrybuild                             Build a library that supports only specified countries 
#    --country=it,es,fr,de,..               Comma separated list of ISO 3166-1 alpha-2 country codes 
#    --prefix=...                           If specifiec the output file name will be <prefix>.i18n.phonenumbers.min.
#   help                                    Display this help text
#   lint                                    Lint JS source files 
#    --target=full|lite|bycountry|test      Files to use
#   version                                 Print the library version
```

To build a new version (both full and lite) of the JavaScript library:

```
# npm run release
```

Or

```
# make release
```

Known issues
------------

* Target `test` needs to be fixed

* Missing country codes:

    * **XK** (Kosovo) -> should be added to targets: `release-eu-extended`, `release-cefta`
    
    * **IC** (Canary Islands) -> should be added to targets: `release-eu-extended`
    
    * **EA** (Ceuta and Melilla) -> should be added to targets: `release-eu-extended`

---

[![Analytics](https://ga-beacon.appspot.com/UA-49657176-1/i18n.phonenumbers.js)](https://github.com/igrigorik/ga-beacon)
