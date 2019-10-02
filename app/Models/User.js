'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get traits() {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission',
    ]
  }

  coupons() {
    return this.belongsToMany('App/Models/Coupon')
  }

  tokens() {
    return this.hasMany('App/Models/Token')
  }

  images() {
    return this.belongsTo('App/Models/Image')
  }

  addresses() {
    return this.hasMany('App/Models/Address')
  }
}

module.exports = User
