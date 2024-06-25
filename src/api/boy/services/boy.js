'use strict';

/**
 * boy service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::boy.boy');
