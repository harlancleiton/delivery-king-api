'use strict'

const Antl = use('Antl')

class Register {
  get rules() {
    return {
      first_name: 'required|string',
      email: 'required|email|unique:users',
      password: 'required',
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

module.exports = Register
