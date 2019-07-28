'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuariosSchema extends Schema {
  up () {
    this.create('usuarios', (table) => {
      table.increments()
      table.string('nombre')
      table.string('password')
      table.string('correo')
      table.string('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('usuarios')
  }
}

module.exports = UsuariosSchema
