
import { homeTemplate, projetosTemplate, cadastroTemplate } from './templates.js';
import { setupForm } from './form.js';

const routes = {'/': homeTemplate, '/projetos': projetosTemplate, '/cadastro': cadastroTemplate};
const app = document.getElementById('app') || document.body;

function render(){
  const path = (location.hash.replace('#','') || '/');
  const fn = routes[path] || routes['/'];
  app.innerHTML = fn();
  setupForm();
  updateNav();
  document.getElementById('app')?.focus();
}

function updateNav(){
  const links = document.querySelectorAll('nav a[data-link]');
  links.forEach(a => {
    const href = a.getAttribute('href') || '';
    a.classList.toggle('ativo', href === location.hash || (href === '#/' && (location.hash === '' || location.hash === '#/')));
  });
}

window.addEventListener('hashchange', render);
window.addEventListener('load', render);

export default { render };
