'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuariosSchema extends Schema {
  up () {
    this.table('usuarios', (table) => {
      // alter table
    })
  }

  down () {
    this.table('usuarios', (table) => {
      // reverse alternations
      table.timestamps()
    })
  }
}

module.exports = UsuariosSchema
