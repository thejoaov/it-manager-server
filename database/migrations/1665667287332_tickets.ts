import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tickets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.string('location').notNullable()
      table.integer('opener_id').unsigned().references('id').inTable('profiles')
      table.enum('status', ['open', 'closed', 'solving']).defaultTo('open')
      table.integer('assignee_id').unsigned().references('id').inTable('profiles')
      table.enum('priority', ['low', 'medium', 'high']).defaultTo('low')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
