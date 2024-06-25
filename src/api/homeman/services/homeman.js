'use strict';

/**
 * homeman service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::homeman.homeman');
