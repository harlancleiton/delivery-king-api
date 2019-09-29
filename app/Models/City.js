'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class City extends Model {
  addresses() {
    return this.hasMany('App/Models/Address')
  }

  province() {
    return this.belongsTo('App/Models/Province')
  }

  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = City
