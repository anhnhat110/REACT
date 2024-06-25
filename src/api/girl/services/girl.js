'use strict';

/**
 * girl service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::girl.girl');
