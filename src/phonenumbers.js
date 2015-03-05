'use strict';

goog.provide('leodido.i18n.PhoneNumbers');

goog.require('i18n.phonenumbers.PhoneNumberFormat');
goog.require('i18n.phonenumbers.PhoneNumberType');
goog.require('i18n.phonenumbers.PhoneNumberUtil');
goog.require('i18n.phonenumbers.PhoneNumberUtil.ValidationResult');
goog.require('leodido.i18n.PhoneNumbers.TYPE');

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
 * @throws {i18n.phonenumbers.Error} if the string is not considered to be a
 * viable phone number or if no default region was supplied.
 */
function getNumberType(phoneNumber, regionCode) {
  regionCode = regionCode || 'us';
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode),
      output = phoneNumberUtil.getNumberType(number),
      types = leodido.i18n.PhoneNumbers.TYPE;
  for (var property in types) {
    if (types.hasOwnProperty(property) && types[property] === output) {
      return property;
    }
  }
  return null;
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
 * Formats a phone number using the original phone number format that the number
 * is parsed from.
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
 * @param {string} phoneNumber
 * @param {?string} regionCode
 * @param {string} regionCallingFrom
 * @return {?string}
 * @throws {i18n.phonenumbers.Error} if the string is not considered to be a
 * viable phone number or if no default region was supplied.
 */
function formatOutOfCountryCalling(phoneNumber, regionCode, regionCallingFrom) {
  if (!regionCallingFrom) {
    return null;
  }
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneNumberUtil.formatOutOfCountryCallingNumber(number, regionCallingFrom);
}


/**
 * Return a phone number formatted in such a way that it can be dialed from a mobile phone in a specific region.
 * If the number cannot be reached from the region
 * (e.g. some countries block toll-free numbers from being called outside of the country),
 * the method returns an empty string.
 *
 * @param {string} phoneNumber
 * @param {?string} regionCode
 * @param {string} regionCallingFrom
 * @return {?string}
 * @throws {i18n.phonenumbers.Error} if the string is not considered to be a
 * viable phone number or if no default region was supplied.
 */
function formatMobileDialing(phoneNumber, regionCode, regionCallingFrom) {
  if (!regionCallingFrom) {
    return null;
  }
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneNumberUtil.formatNumberForMobileDialing(number, regionCallingFrom, true);
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

goog.exportSymbol('leodido.i18n.PhoneNumbers', PhoneNumbers);
goog.exportSymbol('leodido.i18n.PhoneNumbers.getNumberType', getNumberType);
goog.exportSymbol('leodido.i18n.PhoneNumbers.getRegionCodeForNumber', getRegionCodeForNumber);
goog.exportSymbol('leodido.i18n.PhoneNumbers.formatNumber', formatNumber);
goog.exportSymbol('leodido.i18n.PhoneNumbers.formatOriginal', formatOriginal);
goog.exportSymbol('leodido.i18n.PhoneNumbers.formatOutOfCountryCalling', formatOutOfCountryCalling);
goog.exportSymbol('leodido.i18n.PhoneNumbers.formatMobileDialing', formatMobileDialing);
goog.exportSymbol('leodido.i18n.PhoneNumbers.getExampleNumber', getExampleNumber);
goog.exportSymbol('leodido.i18n.PhoneNumbers.isValidNumber', isValidNumber);
goog.exportSymbol('leodido.i18n.PhoneNumbers.isPossibleNumber', isPossibleNumber);
goog.exportSymbol('leodido.i18n.PhoneNumbers.isPossibleNumberWithReason', isPossibleNumberWithReason);
