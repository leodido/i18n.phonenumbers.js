'use strict';

goog.provide('leodido.i18n.PhoneNumbers.ERROR');

goog.require('i18n.phonenumbers.Error');


/**
 * Error messages
 * @enum {string}
 */
var errors = {};


/**
 * Self explanatory.
 */
errors['INVALID_COUNTRY_CODE'] = i18n.phonenumbers.Error.INVALID_COUNTRY_CODE;


/**
 * This generally indicates the string passed in had less than 3 digits in it.
 * More specifically, the number failed to match the pattern.
 */
errors['NOT_A_NUMBER'] = i18n.phonenumbers.Error.NOT_A_NUMBER;


/**
 * This indicates the string started with an international dialing prefix,
 * but after this was stripped from the number,
 * had less digits than any valid phone number (including country calling code) could have.
 */
errors['TOO_SHORT_AFTER_IDD'] = i18n.phonenumbers.Error.TOO_SHORT_AFTER_IDD;


/**
 * This indicates the string, after any country calling code has been stripped,
 * had less digits than any valid phone number could have.
 */
errors['TOO_SHORT_NSN'] = i18n.phonenumbers.Error.TOO_SHORT_NSN;


/**
 * This indicates the string had more digits than any valid phone number could have.
 */
errors['TOO_LONG'] = i18n.phonenumbers.Error.TOO_LONG;
