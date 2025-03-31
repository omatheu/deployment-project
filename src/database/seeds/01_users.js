exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  return await knex('users').insert([
    { nome: 'João Silva', email: 'joao@example.com' },
    { nome: 'Maria Santos', email: 'maria@example.com' },
    { nome: 'Pedro Oliveira', email: 'pedro@example.com' },
    { nome: 'Ana Costa', email: 'ana@example.com' },
    { nome: 'Carlos Pereira', email: 'carlos@example.com' }
  ]);
}; 