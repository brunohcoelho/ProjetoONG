export function focusMain(){
  const app = document.getElementById('app');
  if(app){ app.setAttribute('tabindex','-1'); app.focus(); }
}

// helpers for validation reuse
export function isAdult(dateString){
  if(!dateString) return false;
  const today = new Date();
  const birth = new Date(dateString);
  const age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    return age - 1;
  }
  return age;
}
