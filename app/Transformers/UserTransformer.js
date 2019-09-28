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
    const { id, first_name, last_name, roles, cpf } = model
    return { id, first_name, last_name, roles, cpf }
  }
}

module.exports = UserTransformer
