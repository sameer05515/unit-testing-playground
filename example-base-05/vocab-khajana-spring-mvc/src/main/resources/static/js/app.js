const K={favorites:'khajana.favorites',recent:'khajana.recent',progress:'khajana.progress',dark:'khajana.dark'};
const get=(k,f)=>{try{return JSON.parse(localStorage.getItem(k)??JSON.stringify(f))}catch{return f}};
const set=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
let favorites=get(K.favorites,[]),recent=get(K.recent,[]),progress=get(K.progress,{viewed:0,quizAttempts:0,quizCorrect:0});

function applyTheme(){
 const dark=localStorage.getItem(K.dark)==='true';
 document.documentElement.classList.toggle('dark',dark);
 document.body.classList.toggle('dark',dark);
 document.getElementById('themeBtn').textContent=dark?'☀️ Light':'🌙 Dark';
}
function persist(){
 set(K.favorites,favorites);set(K.recent,recent);set(K.progress,progress);
 document.getElementById('favoriteCount').textContent=favorites.length;
 const a=progress.quizAttempts?Math.round(progress.quizCorrect/progress.quizAttempts*100):0;
 document.getElementById('accuracy').textContent=a+'%';
}
function addRecent(id){
 recent=[id,...recent.filter(x=>x!==id)].slice(0,20);
 progress.viewed=(progress.viewed||0)+1;persist();renderLists();
}
function renderLists(){
 document.getElementById('favorites').innerHTML=favorites.length?favorites.map(id=>`<a class="block hover:text-indigo-600" href="/?wordId=${id}">⭐ Word #${id}</a>`).join(''):'No favorites yet.';
 document.getElementById('recent').innerHTML=recent.length?recent.map(id=>`<a class="block hover:text-indigo-600" href="/?wordId=${id}">🕘 Word #${id}</a>`).join(''):'No recently viewed words.';
}
function syncFavoriteButtons(){
 document.querySelectorAll('.favorite').forEach(b=>{
  const id=Number(b.dataset.id);b.textContent=favorites.includes(id)?'★':'☆';
  b.onclick=()=>{favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[id,...favorites];persist();renderLists();syncFavoriteButtons()};
 });
}
function speak(word){
 if(!('speechSynthesis' in window))return;
 speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(word);u.lang='en-US';u.rate=.82;speechSynthesis.speak(u);
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
async function startQuiz(){
 const modal=document.getElementById('quizModal'),body=document.getElementById('quizBody');
 modal.classList.remove('hidden');modal.classList.add('flex');body.innerHTML='<p>Loading quiz...</p>';
 const qs=await(await fetch('/api/quiz?count=10')).json();let i=0,score=0;
 function render(){
  if(i>=qs.length){body.innerHTML=`<div class="text-center py-8"><div class="text-5xl">🎉</div><h3 class="mt-3 text-2xl font-bold">Score: ${score}/${qs.length}</h3><p class="mt-2 text-slate-500">Progress saved locally.</p><button id="restart" class="mt-5 rounded-xl bg-indigo-600 px-4 py-2 text-white">Try Again</button></div>`;document.getElementById('restart').onclick=startQuiz;return}
  const q=qs[i];body.innerHTML=`<p class="text-sm text-slate-500">Question ${i+1} of ${qs.length}</p><h3 class="mt-2 text-2xl font-bold">${esc(q.word)}</h3><div class="mt-5 grid gap-3">${q.options.map((o,n)=>`<button class="option rounded-xl border p-4 text-left hover:bg-indigo-50 dark:hover:bg-indigo-950" data-i="${n}">${esc(o)}</button>`).join('')}</div>`;
  document.querySelectorAll('.option').forEach(b=>b.onclick=()=>{
   const selected=q.options[Number(b.dataset.i)];progress.quizAttempts++;
   if(selected===q.meaning){score++;progress.quizCorrect++;b.classList.add('border-green-500')}else b.classList.add('border-red-500');
   persist();setTimeout(()=>{i++;render()},350);
  });
 }
 render();
}
document.addEventListener('DOMContentLoaded',()=>{
 applyTheme();persist();renderLists();syncFavoriteButtons();
 document.getElementById('themeBtn').onclick=()=>{localStorage.setItem(K.dark,String(!document.documentElement.classList.contains('dark')));applyTheme()};
 document.querySelectorAll('.speak').forEach(b=>b.onclick=()=>speak(b.dataset.word));
 document.querySelectorAll('.word-card').forEach(c=>c.addEventListener('focus',()=>addRecent(Number(c.dataset.id))));
 document.addEventListener('keydown',e=>{
  if(e.key==='Escape')document.getElementById('search')?.focus();
  if(e.key==='ArrowDown'&&document.activeElement?.id==='search'){e.preventDefault();document.querySelector('.word-card')?.focus()}
  if((e.key==='Enter'||e.key===' ')&&document.activeElement?.classList.contains('word-card')){e.preventDefault();location.href=`/?wordId=${document.activeElement.dataset.id}`}
 });
 document.getElementById('randomBtn').onclick=async()=>{const w=await(await fetch('/api/random')).json();location.href=`/?wordId=${w.id}`};
 document.getElementById('quizBtn').onclick=startQuiz;
 document.getElementById('closeQuiz').onclick=()=>{const m=document.getElementById('quizModal');m.classList.add('hidden');m.classList.remove('flex')};
});
