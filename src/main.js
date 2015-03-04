'use strict';

goog.require('i18n.phonenumbers.AsYouTypeFormatter');
goog.require('i18n.phonenumbers.PhoneNumberFormat');
goog.require('i18n.phonenumbers.PhoneNumberType');
goog.require('i18n.phonenumbers.PhoneNumberUtil');
goog.require('i18n.phonenumbers.PhoneNumberUtil.ValidationResult');

var phoneNumberUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();


/**
 * Check (lenient) whether a phone number is a possible number.
 *
 * @param {string} phoneNumber
 * @param {?string} regionCode
 * @return {boolean}
 */
function isPossibleNumber(phoneNumber, regionCode) {
  regionCode = regionCode || 'us';
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneNumberUtil.isPossibleNumber(number);
}


/**
 * Check (lenient) whether a phone number is a possible number.
 * If the phone number is not possible it gives us the reason.
 *
 * @param {string} phoneNumber
 * @param {?string} regionCode
 * @return {i18n.phonenumbers.PhoneNumberUtil.ValidationResult}
 */
function isPossibleNumberWithReason(phoneNumber, regionCode) {
  regionCode = regionCode || 'us';
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneNumberUtil.isPossibleNumberWithReason(number);
}


/**
 * Tests whether a phone number is a valid number (i.e., matches a valid pattern).
 *
 * @param {string} phoneNumber
 * @param {?string} regionCode
 * @return {boolean}
 */
function isValidNumber(phoneNumber, regionCode) {
  regionCode = regionCode || 'us';
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneNumberUtil.isValidNumber(number);
}

function isValidNumberForRegion(phoneNumber, regionCode) {
  regionCode = regionCode || 'us';
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneNumberUtil.isValidNumberForRegion(number, regionCode);
}

function getRegionCodeForNumber(phoneNumber, regionCode) {
  regionCode = regionCode || 'us';
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneNumberUtil.getRegionCodeForNumber(number);
}

function getNumberType(phoneNumber, regionCode) {
  regionCode = regionCode || 'us';
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  var output;
  var PNT = i18n.phonenumbers.PhoneNumberType;
  switch (phoneNumberUtil.getNumberType(number)) {
    case PNT.FIXED_LINE:
      output = 'FIXED_LINE';
      break;
    case PNT.MOBILE:
      output = 'MOBILE';
      break;
    case PNT.FIXED_LINE_OR_MOBILE:
      output = 'FIXED_LINE_OR_MOBILE';
      break;
    case PNT.TOLL_FREE:
      output = 'TOLL_FREE';
      break;
    case PNT.PREMIUM_RATE:
      output = 'PREMIUM_RATE';
      break;
    case PNT.SHARED_COST:
      output = 'SHARED_COST';
      break;
    case PNT.VOIP:
      output = 'VOIP';
      break;
    case PNT.PERSONAL_NUMBER:
      output = 'PERSONAL_NUMBER';
      break;
    case PNT.PAGER:
      output = 'PAGER';
      break;
    case PNT.UAN:
      output = 'UAN';
      break;
    case PNT.UNKNOWN:
      output = 'UNKNOWN';
      break;
  }
  return output;
}

function formatE164(phoneNumber, regionCode) {
  var PNF = i18n.phonenumbers.PhoneNumberFormat;
  regionCode = regionCode || 'us';
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneNumberUtil.format(number, PNF.E164);
}

function formatNational(phoneNumber, regionCode) {
  var PNF = i18n.phonenumbers.PhoneNumberFormat;
  regionCode = regionCode || 'us';
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneNumberUtil.format(number, PNF.NATIONAL);
}

function formatInternational(phoneNumber, regionCode) {
  var PNF = i18n.phonenumbers.PhoneNumberFormat;
  regionCode = regionCode || 'us';
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneNumberUtil.format(number, PNF.INTERNATIONAL);
}

function formatInOriginalFormat(phoneNumber, regionCode) {
  regionCode = regionCode || 'us';
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneNumberUtil.formatInOriginalFormat(number, regionCode);
}

function formatOutOfCountryCallingNumber(phoneNumber, regionCode, target) {
  if (!target) { return; }
  var number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneNumberUtil.formatOutOfCountryCallingNumber(number, target);
}

goog.exportSymbol('PhoneNumber.isPossibleNumber', isPossibleNumber);
goog.exportSymbol('PhoneNumber.isPossibleNumberWithReason', isPossibleNumberWithReason);
goog.exportSymbol('PhoneNumber.isValidNumber', isValidNumber);
goog.exportSymbol('PhoneNumber.isValidNumberForRegion', isValidNumberForRegion);
goog.exportSymbol('PhoneNumber.getRegionCodeForNumber', getRegionCodeForNumber);
goog.exportSymbol('PhoneNumber.getNumberType', getNumberType);
goog.exportSymbol('PhoneNumber.formatE164', formatE164);
goog.exportSymbol('PhoneNumber.formatNational', formatNational);
goog.exportSymbol('PhoneNumber.formatInternational', formatInternational);
goog.exportSymbol('PhoneNumber.formatInOriginalFormat', formatInOriginalFormat);
goog.exportSymbol('PhoneNumber.formatOutOfCountryCallingNumber', formatOutOfCountryCallingNumber);

// TODO: study parseAndKeepRawInput method
// - what if regionCode is null?
// - what if regionCode is null and number does not start with + sign?
// - try/catch exception?
// TODO: study parseAndKeepRawInput and isValidNumber when used together
// try submitting a valid number but with wrong region code
// TODO: test function
// TODO: create other useful function
