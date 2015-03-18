'use strict';

goog.provide('leodido.i18n.PhoneNumbers');

goog.require('i18n.phonenumbers.PhoneNumberUtil');
goog.require('leodido.i18n.PhoneNumbers.ERROR');
goog.require('i18n.phonenumbers.PhoneNumberFormat');
goog.require('leodido.i18n.PhoneNumbers.FORMAT');
goog.require('i18n.phonenumbers.PhoneNumberType');
goog.require('leodido.i18n.PhoneNumbers.TYPE');
goog.require('i18n.phonenumbers.PhoneNumberUtil.ValidationResult');
goog.require('leodido.i18n.PhoneNumbers.RESULT');

var phoneNumberUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();



/**
 * @constructor
 */
var PhoneNumbers = function() {};


/**
 * Get the type of the given number.
 *
 * @param {string} phoneNumber
 * @param {?string} regionCode
 * @return {?string}
 * @throws {i18n.phonenumbers.PhoneNumberType} if the string is not considered to be a
 * viable phone number or if no default region was supplied.
 */
function getNumberType(phoneNumber, regionCode) {
  regionCode = regionCode || 'us';
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneNumberUtil.getNumberType(number);
}


/**
 * Return the region where a phone number is from.
 *
 * @param {string} phoneNumber
 * @param {?string} regionCode
 * @return {?string}
 * @throws {i18n.phonenumbers.Error} if the string is not considered to be a
 * viable phone number or if no default region was supplied.
 */
function getRegionCodeForNumber(phoneNumber, regionCode) {
  regionCode = regionCode || 'us';
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneNumberUtil.getRegionCodeForNumber(number);
}


/**
 * Format a phone number
 *
 * @param {string} phoneNumber
 * @param {?string} regionCode
 * @param {?i18n.phonenumbers.PhoneNumberFormat} format
 * @return {string}
 * @throws {i18n.phonenumbers.Error} if the string is not considered to be a
 * viable phone number or if no default region was supplied.
 */
function formatNumber(phoneNumber, regionCode, format) {
  regionCode = regionCode || 'us';
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  format = (typeof format == 'undefined') ? i18n.phonenumbers.PhoneNumberFormat.E164 : format;
  return phoneNumberUtil.format(number, format);
}


/**
 * Formats a phone number using the original phone number format that the number is parsed from.
 *
 * @param {string} phoneNumber
 * @param {?string} regionCode
 * @return {string}
 * @throws {i18n.phonenumbers.Error} if the string is not considered to be a
 * viable phone number or if no default region was supplied.
 */
function formatOriginal(phoneNumber, regionCode) {
  regionCode = regionCode || 'us';
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneNumberUtil.formatInOriginalFormat(number, regionCode);
}


/**
 * Formats a phone number for out-of-country dialing purposes.
 *
 * @param {string} regionCallingFrom
 * @param {string} phoneNumber
 * @param {?string} regionCode
 * @return {?string}
 * @throws {i18n.phonenumbers.Error} if the string is not considered to be a
 * viable phone number or if no default region was supplied.
 */
function formatOutOfCountryCalling(regionCallingFrom, phoneNumber, regionCode) {
  regionCode = regionCode || 'us';
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneNumberUtil.formatOutOfCountryCallingNumber(number, regionCallingFrom);
}


/**
 * Return a phone number formatted in such a way that it can be dialed from a mobile phone in a specific region.
 * If the number cannot be reached from the region
 * (e.g. some countries block toll-free numbers from being called outside of the country),
 * the method launch an exception.
 *
 * @param {string} regionCallingFrom
 * @param {string} phoneNumber
 * @param {?string} regionCode
 * @return {?string}
 * @throws {i18n.phonenumbers.Error} if the string is not considered to be a
 * viable phone number or if no default region was supplied.
 * @throws {Error} if the number can not be reached from the region
 */
function formatMobileDialing(regionCallingFrom, phoneNumber, regionCode) {
  regionCode = regionCode || 'us';
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  var output = phoneNumberUtil.formatNumberForMobileDialing(number, regionCallingFrom, true);
  if (output === '') {
    throw new Error(
        'Current phone number (i.e., "' + phoneNumber +
        '") can not be dialed from a mobile phone within the "' +
        regionCallingFrom.toUpperCase() + '" region'
    );
  }
  return output;
}


/**
 * Formats a phone number in national format for dialing using the carrier.
 * The {@code carrierCode} will always be used regardless of whether the phone number already has a preferred domestic
 * carrier code stored.
 * If {@code carrierCode} contains an empty string, returns the number in national format without any carrier code.
 *
 * @param {string} carrierCode the carrier selection code to be used.
 * @param {string} phoneNumber the phone number to be formatted.
 * @param {?string} regionCode
 * @return {string} the formatted phone number in national format for dialing
using the carrier as specified in the {@code carrierCode}.
 */
function formatNationalWithCarrierCode(carrierCode, phoneNumber, regionCode) {
  regionCode = regionCode || 'us';
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneNumberUtil.formatNationalNumberWithCarrierCode(number, carrierCode);
}


/**
 * Formats a phone number in national format for dialing using the carrier as specified in the
 * preferred_domestic_carrier_code field. If that is missing, use the {@code fallbackCarrierCode}
 * passed in instead.
 * If there is no {@code preferred_domestic_carrier_code}, and the {@code fallbackCarrierCode} contains an empty string,
 * return the number in national format without any carrier code.
 *
 * Use {@link #formatNationalWithCarrierCode} instead if the carrier code passed in should take precedence
 * over the number's {@code preferred_domestic_carrier_code} when formatting.
 *
 * @param {string} fallbackCarrierCode the carrier selection code to be used,
 *     if none is found in the phone number itself.
 * @param {string} phoneNumber the phone number to be formatted.
 * @param {?string} regionCode
 * @return {string} the formatted phone number in national format for dialing
 *     using the number's preferred_domestic_carrier_code, or the
 *     {@code fallbackCarrierCode} passed in if none is found.
 */
function formatNationalWithPreferredCarrierCode(fallbackCarrierCode, phoneNumber, regionCode) {
  regionCode = regionCode || 'us';
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneNumberUtil.formatNationalNumberWithPreferredCarrierCode(number, fallbackCarrierCode);
}


/**
 * Get an example phone number for the given region code
 *
 * Default format, used when format not specified, is E164 format.
 *
 * @param {string} regionCode
 * @param {i18n.phonenumbers.PhoneNumberType} type
 * @param {?i18n.phonenumbers.PhoneNumberFormat} format
 * @return {?string}
 */
function getExampleNumber(regionCode, type, format) {
  var number = phoneNumberUtil.getExampleNumberForType(regionCode, type);
  if (!number) {
    return null;
  }
  format = (typeof format == 'undefined') ? i18n.phonenumbers.PhoneNumberFormat.E164 : format;
  return phoneNumberUtil.format(number, format);
}


/**
 * Check (lenient) whether a phone number is a possible number.
 *
 * @param {string} phoneNumber
 * @param {?string} regionCode
 * @return {boolean}
 * @throws {i18n.phonenumbers.Error} if the string is not considered to be a
 * viable phone number or if no default region was supplied.
 */
function isPossibleNumber(phoneNumber, regionCode) {
  regionCode = regionCode || 'us';
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneNumberUtil.isPossibleNumber(number);
}


/**
 * Check whether a phone number is a valid number (i.e., matches a valid pattern).
 *
 * @param {string} phoneNumber
 * @param {?string} regionCode
 * @return {boolean}
 * @throws {i18n.phonenumbers.Error} if the string is not considered to be a
 * viable phone number or if no default region was supplied.
 */
function isValidNumber(phoneNumber, regionCode) {
  regionCode = regionCode || 'us';
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneNumberUtil.isValidNumber(number);
}


/**
 * Verify whether a phone number is valid for a certain region.
 * Note this doesn't verify the number is actually in use, which is impossible to tell by just
 * looking at a number itself.
 * If the country calling code is not the same as the country calling code for the region,
 * this immediately exits with false.
 * After this, the specific number pattern rules for the region are examined.
 * This is useful for determining for example whether a particular number is
 * valid for Canada, rather than just a valid NANPA number.
 * Warning: In most cases, you want to use {@link #isValidNumber} instead.
 * For example, this method will mark numbers from British Crown dependencies such as the Isle of Man as invalid
 * for the region "GB" (United Kingdom), since it has its own region code, "IM", which may be undesirable.
 *
 * @param {string} phoneNumber the phone number that we want to validate.
 * @param {string} regionCode the region that we want to validate the phone number for.
 * @return {boolean} a boolean that indicates whether the number is of a valid pattern.
 */
function isValidNumberForRegion(phoneNumber, regionCode) {
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneNumberUtil.isValidNumberForRegion(number, regionCode);
}


/**
 * Check (lenient) whether a phone number is a possible number.
 * If the phone number is not possible it gives us the reason.
 *
 * @param {string} phoneNumber
 * @param {?string} regionCode
 * @return {i18n.phonenumbers.PhoneNumberUtil.ValidationResult}
 * @throws {i18n.phonenumbers.Error} if the string is not considered to be a
 * viable phone number or if no default region was supplied.
 */
function isPossibleNumberWithReason(phoneNumber, regionCode) {
  regionCode = regionCode || 'us';
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneNumberUtil.isPossibleNumberWithReason(number);
}


/**
 * Convenience method to get a list of what regions the library has metadata for.
 * @return {!Array.<string>} region codes supported by the library.
 */
function getSupportedRegions() {
  return phoneNumberUtil.getSupportedRegions();
}


goog.exportSymbol('leodido.i18n.PhoneNumbers', PhoneNumbers);
goog.exportSymbol('leodido.i18n.PhoneNumbers.getNumberType', getNumberType);
goog.exportSymbol('leodido.i18n.PhoneNumbers.getRegionCodeForNumber', getRegionCodeForNumber);
goog.exportSymbol('leodido.i18n.PhoneNumbers.formatNumber', formatNumber);
goog.exportSymbol('leodido.i18n.PhoneNumbers.formatOriginal', formatOriginal);
goog.exportSymbol('leodido.i18n.PhoneNumbers.formatOutOfCountryCalling', formatOutOfCountryCalling);
goog.exportSymbol('leodido.i18n.PhoneNumbers.formatMobileDialing', formatMobileDialing);
goog.exportSymbol('leodido.i18n.PhoneNumbers.formatNationalWithCarrierCode', formatNationalWithCarrierCode);
goog.exportSymbol(
    'leodido.i18n.PhoneNumbers.formatNationalWithPreferredCarrierCode',
    formatNationalWithPreferredCarrierCode
);
goog.exportSymbol('leodido.i18n.PhoneNumbers.getExampleNumber', getExampleNumber);
goog.exportSymbol('leodido.i18n.PhoneNumbers.isValidNumber', isValidNumber);
goog.exportSymbol('leodido.i18n.PhoneNumbers.isValidNumberForRegion', isValidNumberForRegion);
goog.exportSymbol('leodido.i18n.PhoneNumbers.isPossibleNumber', isPossibleNumber);
goog.exportSymbol('leodido.i18n.PhoneNumbers.isPossibleNumberWithReason', isPossibleNumberWithReason);
goog.exportSymbol('leodido.i18n.PhoneNumbers.getSupportedRegions', getSupportedRegions);
goog.exportSymbol('leodido.i18n.PhoneNumbers.RESULT', results);
goog.exportSymbol('leodido.i18n.PhoneNumbers.TYPE', types);
goog.exportSymbol('leodido.i18n.PhoneNumbers.ERROR', errors);
goog.exportSymbol('leodido.i18n.PhoneNumbers.FORMAT', formats);

// TODO: do a function that guess countries/regioncodes?
