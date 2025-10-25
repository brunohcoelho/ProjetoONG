import { isAdult } from './utils.js';

function showFieldError(field, message){
  removeFieldError(field);
  field.classList.add('field-error');
  const p = document.createElement('p');
  p.className = 'error-text';
  p.id = field.id + '-error';
  p.innerText = message;
  field.setAttribute('aria-describedby', p.id);
  field.parentNode.insertBefore(p, field.nextSibling);
}

function removeFieldError(field){
  field.classList.remove('field-error');
  const existing = document.getElementById(field.id + '-error');
  if(existing) existing.remove();
  field.removeAttribute('aria-describedby');
}

function validateCPF(cpf){
  // basic format check already via pattern; implement a simple numeric-only length check
  if(!cpf) return false;
  const numbers = cpf.replace(/\D/g,'');
  return numbers.length === 11;
}

export function initForm(form){
  if(!form) return;
  // restore from localStorage if present
  const saved = localStorage.getItem('amor-animal-form');
  if(saved){
    try{
      const data = JSON.parse(saved);
      Object.keys(data).forEach(k => {
        const el = form.elements[k];
        if(el) el.value = data[k];
      });
    }catch(e){}
  }

  // real-time validation
  form.addEventListener('input', (e) => {
    const target = e.target;
    if(target.checkValidity()){
      removeFieldError(target);
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // clear previous errors
    Array.from(form.elements).forEach(el => {
      if(el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA'){
        removeFieldError(el);
      }
    });

    // required fields are handled by browser, but we'll add custom checks
    const nome = form.elements['nome'];
    const email = form.elements['email'];
    const cpf = form.elements['cpf'];
    const telefone = form.elements['telefone'];
    const nascimento = form.elements['nascimento'];
    const cep = form.elements['cep'];

    if(!nome.value.trim() || nome.value.trim().length < 3){
      showFieldError(nome, 'Informe seu nome completo (mínimo 3 caracteres).');
      valid = false;
    }
    if(!email.checkValidity()){
      showFieldError(email, 'Informe um e‑mail válido.');
      valid = false;
    }
    if(!validateCPF(cpf.value)){
      showFieldError(cpf, 'CPF inválido (deve conter 11 dígitos).');
      valid = false;
    }
    if(!telefone.checkValidity()){
      showFieldError(telefone, 'Telefone em formato inválido.');
      valid = false;
    }
    if(!nascimento.value || isAdult(nascimento.value) < 18){
      showFieldError(nascimento, 'Você deve ter pelo menos 18 anos.');
      valid = false;
    }
    if(!cep.checkValidity()){
      showFieldError(cep, 'CEP inválido.');
      valid = false;
    }

    if(!valid){
      const msg = document.getElementById('form-messages');
      if(msg) msg.innerText = 'Existem erros no formulário. Corrija-os antes de enviar.';
      return;
    }

    // save to localStorage (simulate submit)
    const data = {};
    Array.from(form.elements).forEach(el => {
      if(el.name) data[el.name] = el.value;
    });
    localStorage.setItem('amor-animal-form', JSON.stringify(data));

    const msg = document.getElementById('form-messages');
    if(msg) msg.innerText = 'Cadastro salvo localmente. Obrigado!';
    form.reset();
  });

  form.addEventListener('reset', () => {
    localStorage.removeItem('amor-animal-form');
    const msg = document.getElementById('form-messages');
    if(msg) msg.innerText = 'Formulário limpo.';
  });
}
