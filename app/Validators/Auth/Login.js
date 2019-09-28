'use strict'

const Antl = use('Antl')

class Login {
  get rules() {
    return {
      email: 'required|email',
      password: 'required|string',
    }
  }

  get messages() {
    return Antl.list('validation')
  }

  get validateAll() {
    return true
  }

  async fails(errors) {
    return this.ctx.response.status(400).send({ errors })
  }
}

module.exports = Login
