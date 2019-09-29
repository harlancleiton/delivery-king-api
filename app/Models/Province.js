'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Province extends Model {
  cities() {
    return this.hasMany('App/Models/City')
  }
}

module.exports = Province
