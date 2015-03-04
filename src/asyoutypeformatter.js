'use strict';

goog.provide('leodido.i18n.AsYoutTypeFormatter');

goog.require('i18n.phonenumbers.AsYouTypeFormatter');



/**
 * Real-time phone number formatter
 *
 * @param {i18n.phonenumbers.RegionCode} regionCode
 * @constructor
 */
var Formatter = function(regionCode) {
  this.formatter = new i18n.phonenumbers.AsYouTypeFormatter(regionCode);
};


/**
 * Formats a phone number on-the-fly as each digit is entered.
 * @param {string} nextChar
 * @return {string}
 */
Formatter.prototype.inputDigit = function(nextChar) {
  return this.formatter.inputDigit(nextChar);
};


/**
 Same as {@link #inputDigit}, but remembers the position where
 * {@code nextChar} is inserted, so that it can be retrieved later by using
 * {@link #getRememberedPosition}. The remembered position will be automatically
 * adjusted if additional formatting characters are later inserted/removed in
 * front of {@code nextChar}.
 *
 * @param {string} nextChar
 * @return {string}
 */
Formatter.prototype.inputDigitAndRememberPosition = function(nextChar) {
  return this.formatter.inputDigitAndRememberPosition(nextChar);
};


/**
 * Returns the current position in the partially formatted phone number of the
 * character which was previously passed in as the parameter of
 * {@link #inputDigitAndRememberPosition}.
 *
 * @return {number}
 */
Formatter.prototype.getRememberedPosition = function() {
  return this.formatter.getRememberedPosition();
};


goog.exportSymbol('leodido.i18n.AsYouTypeFormatter', Formatter);
goog.exportSymbol('leodido.i18n.AsYouTypeFormatter.prototype.inputDigit', Formatter.prototype.inputDigit);
goog.exportSymbol(
    'leodido.i18n.AsYouTypeFormatter.prototype.inputDigitAndRememberPosition',
    Formatter.prototype.inputDigitAndRememberPosition
);
goog.exportSymbol(
    'leodido.i18n.AsYouTypeFormatter.prototype.getRememberedPosition',
    Formatter.prototype.getRememberedPosition
);

