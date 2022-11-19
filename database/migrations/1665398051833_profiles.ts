import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.string('name').nullable()
      table.date('birthdate').nullable()
      table
        .enum('role', ['admin', 'user', 'guest', 'support', 'technician', 'manager'])
        .defaultTo('user')
      table.string('telephone').defaultTo('')
      table.string('job_title').defaultTo('')
      table.timestamp('start_date').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
