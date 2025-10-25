
export const STORAGE_KEY = 'amor-animal:cadastros';
export function saveCadastro(c){ const list = getCadastros(); list.push(c); localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }
export function getCadastros(){ try{ const raw = localStorage.getItem(STORAGE_KEY); return raw? JSON.parse(raw):[] }catch(e){console.error(e); return []} }
export function clearCadastros(){ localStorage.removeItem(STORAGE_KEY); }
