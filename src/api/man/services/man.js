'use strict';

/**
 * man service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::man.man');
