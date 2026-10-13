(async()=>{
 const el=document.getElementById('accessCount');
 const endpoint="https://contador-geometria-horizonte.furukawaluzia.chatgpt.site/api/accesses";
 const storageKey='horizonte_github_session_v1';
 try{
  let session;
  try{session=sessionStorage.getItem(storageKey);if(!session){session=crypto.randomUUID();sessionStorage.setItem(storageKey,session);}}catch{session=crypto.randomUUID();}
  const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({session}),credentials:'omit'});
  if(!response.ok)throw new Error('unavailable');const data=await response.json();
  if(!Number.isSafeInteger(data.visits)||data.visits<0)throw new Error('invalid');
  el.textContent=new Intl.NumberFormat('pt-BR').format(data.visits)+' acesso'+(data.visits===1?'':'s');
  el.title='Total global: uma visita por sessão do navegador. Recarregar a página na mesma sessão não soma outra visita.';
 }catch{el.textContent='Contador temporariamente indisponível';}
})();
