
import { saveCadastro } from './storage.js';
export function setupForm(){ const form = document.getElementById('form-cadastro'); if(!form) return;
  applyMasks(form);
  form.addEventListener('submit', function(ev){ ev.preventDefault();
    const erro = document.getElementById('mensagem-erro') || document.createElement('div');
    erro.id = 'mensagem-erro'; erro.setAttribute('role','alert'); erro.style.color='var(--cor-erro)';
    const data = Object.fromEntries(new FormData(form).entries());
    const tipo = form.querySelector('input[name="tipo"]:checked'); data.tipo = tipo ? tipo.value : 'Voluntário';
    const problems = [];
    if(!/\S+@\S+\.\S+/.test(data.email || '')) problems.push('E-mail inválido');
    // simples para demo
    if(problems.length){ erro.innerHTML = problems.map(p => `<div>• ${p}</div>`).join(''); form.prepend(erro); return; }
    saveCadastro({ nome: data.nome, email: data.email, cpf: data.cpf, telefone: data.telefone, cidade: data.cidade||'', tipo: data.tipo, criadoEm: new Date().toISOString() });
    form.reset(); erro.style.color='var(--cor-sucesso)'; erro.textContent='Cadastro enviado com sucesso!'; form.prepend(erro);
    setTimeout(()=> location.hash = '#/projetos', 900);
  }); 
}
function applyMasks(root){ const cpf = root.querySelector('#cpf'); const tel = root.querySelector('#telefone'); if(cpf) cpf.addEventListener('input', e=>{ let v=e.target.value.replace(/\D/g,'').slice(0,11); v=v.replace(/(\d{3})(\d)/,'$1.$2'); v=v.replace(/(\d{3})(\d)/,'$1.$2'); v=v.replace(/(\d{3})(\d{1,2})$/,'$1-$2'); e.target.value=v; }); if(tel) tel.addEventListener('input', e=>{ let v=e.target.value.replace(/\D/g,'').slice(0,11); v=v.replace(/^(\d{2})(\d)/,'($1) $2'); v=v.replace(/(\d)(\d{4})$/,'$1-$2'); e.target.value=v; }); }
