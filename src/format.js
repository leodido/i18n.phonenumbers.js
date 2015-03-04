'use strict';

goog.provide('leodido.i18n.PhoneNumbers.FORMAT');

goog.require('i18n.phonenumbers.PhoneNumberFormat');


/**
 * Available formats
 * @enum {number}
 */
var formats = {
  /**
   * @expose
   */
  E164: i18n.phonenumbers.PhoneNumberFormat.E164,
  /**
   * @expose
   */
  INTERNATIONAL: i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL,
  /**
   * @expose
   */
  NATIONAL: i18n.phonenumbers.PhoneNumberFormat.NATIONAL,
  /**
   * @expose
   */
  RFC3966: i18n.phonenumbers.PhoneNumberFormat.RFC3966
};

goog.exportSymbol('leodido.i18n.PhoneNumbers.FORMAT', formats);
