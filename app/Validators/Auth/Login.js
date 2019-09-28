'use strict'

class Login {
  get rules() {
    return {
      email: 'required|email',
      password: 'required',
    }
  }

  get messages() {
    return {
      'email.required': 'Email não informado',
      'email.email': 'Você deve informar um endereço de email válido',
      'password.required': 'Senha não informada',
    }
  }

  get validateAll() {
    return true
  }

  async fails(errors) {
    return this.ctx.response.status(400).send({ errors })
  }
}

module.exports = Login
