'use strict';

goog.provide('leodido.i18n.PhoneNumbers.TYPE');

goog.require('i18n.phonenumbers.PhoneNumberType');


/**
 * Type of phone numbers.
 * @enum {number}
 */
var types = {};
types['FIXED_LINE'] = i18n.phonenumbers.PhoneNumberType.FIXED_LINE;
types['MOBILE'] = i18n.phonenumbers.PhoneNumberType.MOBILE;


/**
 * In some regions (e.g. the USA),
 * it is impossible to distinguish between fixed-line and mobile numbers by looking at the phone number itself
 */
types['FIXED_LINE_OR_MOBILE'] = i18n.phonenumbers.PhoneNumberType.FIXED_LINE_OR_MOBILE;


/**
 * Freephone lines
 */
types['TOLL_FREE'] = i18n.phonenumbers.PhoneNumberType.TOLL_FREE;
types['PREMIUM_RATE'] = i18n.phonenumbers.PhoneNumberType.PREMIUM_RATE;


/**
 * The cost of this call is shared between the caller and the recipient,
 * and is hence typically less than PREMIUM_RATE calls.
 * See http://en.wikipedia.org/wiki/Shared_Cost_Service for more information.
 */
types['SHARED_COST'] = i18n.phonenumbers.PhoneNumberType.SHARED_COST;


/**
 * Voice over IP numbers. This includes TSoIP (Telephony Service over IP).
 */
types['VOIP'] = i18n.phonenumbers.PhoneNumberType.VOIP;


/**
 * A personal number is associated with a person, and may be routed to either a MOBILE or FIXED_LINE number.
 * Some more information can be found here = http://en.wikipedia.org/wiki/Personal_Numbers
 */
types['PERSONAL_NUMBER'] = i18n.phonenumbers.PhoneNumberType.PERSONAL_NUMBER;
types['PAGER'] = i18n.phonenumbers.PhoneNumberType.PAGER;


/**
 * Used for 'Universal Access Numbers' or 'Company Numbers'.
 * They may be further routed to specific offices, but allow one number to be used for a company.
 */
types['UAN'] = i18n.phonenumbers.PhoneNumberType.UAN;


/**
 * Used for 'Voice Mail Access Numbers'.
 */
types['VOICEMAIL'] = i18n.phonenumbers.PhoneNumberType.VOICEMAIL;


/**
 * A phone number is of type UNKNOWN when it does not fit any of the known patterns for a specific region.
 */
types['UNKNOWN'] = i18n.phonenumbers.PhoneNumberType.UNKNOWN;
