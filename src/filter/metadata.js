'use strict';

goog.provide('leodido.i18n.MetadataFilter');

goog.require('i18n.phonenumbers.metadata');



/**
 * MetadataFilter constructor
 * @param {!Array.<string>} countries
 * @constructor
 */
leodido.i18n.MetadataFilter = function(countries) {
  /**
   * The countries for which to extract metadata
   * @type {!Array.<string>}
   */
  this.countries = countries.constructor === Array ? countries : [];
  if (this.countries.length === 0) {
    throw new TypeError('Parameter must be an array of strings');
  }
  /**
   * Filtered country code to region code map
   * @type {!Object.<number, Array.<string>>}
   */
  this.newCountryCodeToRegionCodeMap = {};
  /**
   * Filtered mapping from a region code to the PhoneMetadata for that region
   * @type {!Object.<string, Array>}
   */
  this.newMetadata = {};

  // Privates
  var self = this;
  /**
   * Filter country code to region code map
   * @private
   */
  var getCountryCodeToRegionCodeMap = function() {
    /**
     * @type {!Object.<number, Array.<string>>}
     */
    var originalMap = i18n.phonenumbers.metadata.countryCodeToRegionCodeMap;
    for (var i = 0; i < self.countries.length; i++) {
      /**
       * @type {!string}
       */
      var countryCode = self.countries[i].toUpperCase();
      for (var countryCallingCode in originalMap) {
        if (originalMap.hasOwnProperty(countryCallingCode)) {
          /**
           * @type {Array.<string>}
           */
          var regionCodes = originalMap[countryCallingCode];
          if (regionCodes.indexOf(countryCode) !== -1) {
            if (typeof self.newCountryCodeToRegionCodeMap[~~countryCallingCode] === 'undefined') {
              self.newCountryCodeToRegionCodeMap[~~countryCallingCode] = [countryCode];
            } else {
              self.newCountryCodeToRegionCodeMap[~~countryCallingCode].push(countryCode);
            }
          }
        }
      }
    }
  };
  /**
   * Filter metadata
   * @private
   */
  var getMetadata = function() {
    /**
     * @type {!Object.<string, Array>}
     */
    var originalMetadata = i18n.phonenumbers.metadata.countryToMetadata;
    for (var countryCallingCode in self.newCountryCodeToRegionCodeMap) {
      if (self.newCountryCodeToRegionCodeMap.hasOwnProperty(countryCallingCode)) {
        /**
         * @type {Array.<string>}
         */
        var regionCodes = self.newCountryCodeToRegionCodeMap[countryCallingCode];
        for (var j = 0; j < regionCodes.length; j++) {
          var regionCode = regionCodes[j];
          var key = regionCode;
          // Handle "001" special case
          if (regionCode === '001') {
            key = countryCallingCode;
          }
          if (typeof originalMetadata[key] !== 'undefined') {
            self.newMetadata[key] = originalMetadata[key];
          }
        }
      }
    }
  };
  // Execution
  getCountryCodeToRegionCodeMap();
  getMetadata();
};
