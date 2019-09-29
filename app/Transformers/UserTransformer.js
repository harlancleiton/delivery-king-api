'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class UserTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    const { id, first_name, last_name, email, roles, cpf } = model
    return { id, first_name, last_name, email, roles, cpf }
  }
}

module.exports = UserTransformer
