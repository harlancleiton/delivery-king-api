'use strict'

const Antl = use('Antl')

class AdminStoreCategory {
  get rules() {
    return {
      title: 'required|unique:categories|string',
      description: 'required|string',
      image_id: 'exists:images,id',
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

module.exports = AdminStoreCategory
