'use strict'

const Antl = use('Antl')

class AdminUpdateCategory {
  get rules() {
    const { id } = this.ctx.params
    return {
      title: `required|unique:categories,title,id,${id}|string`,
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

module.exports = AdminUpdateCategory
