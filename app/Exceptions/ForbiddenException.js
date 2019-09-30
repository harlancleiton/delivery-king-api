'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

const Antl = use('Antl')

class ForbiddenException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle(error, { response }) {
    const message = Antl.formatMessage('messages.forbidden')
    response.status(403).send({ errors: [{ message }] })
  }
}

module.exports = ForbiddenException
