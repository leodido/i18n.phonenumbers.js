'use strict';

goog.provide('leodido.i18n.MetadataFilter');

goog.require('i18n.phonenumbers.metadata');



/**
 * MetadataFilter constructor
 *
 * @param {!Array.<string>} countries
 * @constructor
 */
var MetadataFilter = function(countries) {
  // Obtain original country to region map and all country codes
  var originalMap = i18n.phonenumbers.metadata.countryCodeToRegionCodeMap,
      allCountries = [];
  for (var countryCallingCode in originalMap) {
    if (originalMap.hasOwnProperty(countryCallingCode)) {
      Array.prototype.push.apply(allCountries, originalMap[~~countryCallingCode]);
    }
  }
  // Unique the country codes
  allCountries = allCountries.filter(function uniq(value, index, that) {
    return that.indexOf(value) === index;
  });
  // Obtain original metadata for countries
  /**
   * @type {!Object.<string, Array>}
   */
  var originalMetadata = i18n.phonenumbers.metadata.countryToMetadata;
  // Verify the input country codes
  countries = (countries.constructor === Array ? countries : []);
  if (countries.length === 0) {
    throw new TypeError('An array with almost one country code is required');
  }
  for (var i = 0; i < countries.length; i++) {
    var countryCode = countries[i];
    if (typeof countryCode !== 'string') {
      throw new TypeError('Parameter must be an array of strings');
    }
    if (allCountries.indexOf(countryCode.toUpperCase()) === -1) {
      throw new Error('Country "' + countryCode.toUpperCase() + '" is invalid');
    }
  }
  /**
   * Filtered country code to region code map
   *
   * @type {!Object.<number, Array.<string>>}
   */
  var newCountryCodeToRegionCodeMap = {};
  /**
   * Filtered mapping from a region code to the PhoneMetadata for that region
   *
   * @type {!Object.<string, Array>}
   */
  var newMetadata = {};

  // Helpers
  /**
   * Filter country code to region code map
   *
   * @private
   */
  var getCountryCodeToRegionCodeMap = function() {
    for (var i = 0; i < countries.length; i++) {
      /**
       * @type {!string}
       */
      var countryCode = countries[i].toUpperCase();
      for (var countryCallingCode in originalMap) {
        if (originalMap.hasOwnProperty(countryCallingCode)) {
          countryCallingCode = ~~countryCallingCode;
          var regionCodes = originalMap[countryCallingCode];
          if (regionCodes.indexOf(countryCode) !== -1) {
            if (typeof newCountryCodeToRegionCodeMap[countryCallingCode] === 'undefined') {
              newCountryCodeToRegionCodeMap[countryCallingCode] = [countryCode];
            } else {
              newCountryCodeToRegionCodeMap[countryCallingCode].push(countryCode);
            }
          }
        }
      }
    }
  };
  /**
   * Filter metadata
   *
   * @private
   */
  var getMetadata = function() {
    for (var countryCallingCode in newCountryCodeToRegionCodeMap) {
      if (newCountryCodeToRegionCodeMap.hasOwnProperty(countryCallingCode)) {
        var regionCodes = newCountryCodeToRegionCodeMap[~~countryCallingCode];
        for (var j = 0; j < regionCodes.length; j++) {
          var regionCode = regionCodes[j];
          var key = regionCode;
          // Handle "001" special case
          if (regionCode === '001') {
            key = countryCallingCode;
          }
          if (typeof originalMetadata[key] !== 'undefined') {
            newMetadata[key] = originalMetadata[key];
          }
        }
      }
    }
  };

  // Execution
  getCountryCodeToRegionCodeMap();
  getMetadata();

  // Privileged
  return {
    /**
     * @expose
     */
    map: newCountryCodeToRegionCodeMap,
    /**
     * @expose
     */
    data: newMetadata
  };
};

goog.exportSymbol('leodido.i18n.MetadataFilter', MetadataFilter);
