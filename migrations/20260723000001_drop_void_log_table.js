exports.up = async function(knex) {
  const hasTable = await knex.schema.hasTable('void_log')
  if (hasTable) {
    await knex.schema.dropTable('void_log')
  }
}

exports.down = async function(knex) {
  const hasTable = await knex.schema.hasTable('void_log')
  if (!hasTable) {
    await knex.schema.createTable('void_log', function(t) {
      t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
      t.uuid('transaksi_id').notNullable().references('id').inTable('transaksi').onDelete('CASCADE')
      t.uuid('voided_by').notNullable().references('id').inTable('users').onDelete('RESTRICT')
      t.text('reason').notNullable()
      t.timestamp('voided_at').defaultTo(knex.fn.now())
    })
  }
}
