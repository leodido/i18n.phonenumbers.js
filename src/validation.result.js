'use strict';

goog.provide('leodido.i18n.PhoneNumbers.RESULT');

goog.require('i18n.phonenumbers.PhoneNumberUtil.ValidationResult');


/**
 * Validation results hash
 * @enum {number}
 */
var results = {};
results['IS_POSSIBLE'] = i18n.phonenumbers.PhoneNumberUtil.ValidationResult.IS_POSSIBLE;
results['INVALID_COUNTRY_CODE'] = i18n.phonenumbers.PhoneNumberUtil.ValidationResult.INVALID_COUNTRY_CODE;
results['TOO_SHORT'] = i18n.phonenumbers.PhoneNumberUtil.ValidationResult.TOO_SHORT;
results['TOO_LONG'] = i18n.phonenumbers.PhoneNumberUtil.ValidationResult.TOO_LONG;
