'use strict';

goog.provide('leodido.i18n.PhoneNumbers.FORMAT');

goog.require('i18n.phonenumbers.PhoneNumberFormat');


/**
 * Available formats
 * @enum {number}
 */
var formats = {};
formats['E164'] = i18n.phonenumbers.PhoneNumberFormat.E164;
formats['INTERNATIONAL'] = i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL;
formats['NATIONAL'] = i18n.phonenumbers.PhoneNumberFormat.NATIONAL;
formats['RFC3966'] = i18n.phonenumbers.PhoneNumberFormat.RFC3966;
