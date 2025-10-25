
import { getCadastros } from './storage.js';

export function homeTemplate(){
  return `<section class="card"><h2>Quem Somos</h2><p>A <strong>Amor Animal</strong> promove resgates e adoções responsáveis.</p></section>
  <section class="card"><h2>Nosso Impacto</h2><p>Total de cadastros: <strong>${getCadastros().length}</strong></p></section>`;
}

export function projetosTemplate(){
  const cad = getCadastros();
  const lista = cad.length ? '<ul>' + cad.map(c => `<li><strong>${escape(c.nome)}</strong> — ${escape(c.tipo)} — ${escape(c.cidade)}</li>`).join('') + '</ul>' : '<p>Nenhum cadastro ainda.</p>';
  return `<section class="card"><h2>Projetos</h2><p>Campanhas e iniciativas.</p></section><section class="card"><h2>Cadastros</h2>${lista}</section>`;
}

export function cadastroTemplate(){
  return `<section class="card"><h2>Cadastro</h2>
  <form id="form-cadastro" novalidate>
    <label for="nome">Nome Completo</label>
    <input id="nome" name="nome" required>
    <label for="email">E-mail</label>
    <input id="email" name="email" type="email" required>
    <label for="cpf">CPF</label>
    <input id="cpf" name="cpf" required placeholder="000.000.000-00">
    <label for="telefone">Telefone</label>
    <input id="telefone" name="telefone" required placeholder="(00) 00000-0000">
    <button type="submit" class="btn">Enviar</button>
  </form></section>`;
}

function escape(s){ return String(s||'').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[m]); }
