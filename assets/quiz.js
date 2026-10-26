(function(){
'use strict';
var form=document.getElementById('lead-form'),modal=document.getElementById('privacy-modal');
var answers={},key='dear-you-cup-v1',error=document.getElementById('quiz-error'),pending=null;
try{sessionStorage.removeItem(key)}catch(e){}
function count(){document.getElementById('quiz-progress').textContent=Object.keys(answers).length+' / 3 선택 완료'}
document.querySelectorAll('[data-question]').forEach(function(b){b.addEventListener('click',function(){answers[b.dataset.question]=b.dataset.value;document.querySelectorAll('[data-question="'+b.dataset.question+'"]').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});error.textContent='';count()})});
document.getElementById('reset-quiz').onclick=function(){answers={};pending=null;document.querySelectorAll('[data-question]').forEach(function(b){b.setAttribute('aria-pressed','false')});error.textContent='';count();document.querySelector('[data-question]').focus()};
form.addEventListener('submit',function(e){
 e.preventDefault();var missing=['time','flavor','caffeine'].find(function(q){return !answers[q]});
 if(missing){e.stopImmediatePropagation();error.textContent='세 가지 질문에 하나씩 답해주세요.';document.querySelector('[data-question="'+missing+'"]').focus();return}
 pending=Object.assign({},answers);
},true);
document.getElementById('privacy-ok').addEventListener('click',function(e){
 if(!pending||!document.getElementById('privacy-agree').checked)return;
 try{sessionStorage.setItem(key,JSON.stringify(pending))}catch(err){e.stopImmediatePropagation();modal.classList.remove('open');modal.setAttribute('aria-hidden','true');error.textContent='브라우저의 임시 저장소가 꺼져 있어 결과를 열 수 없어요. 저장소를 허용한 뒤 다시 시도해주세요.';document.getElementById('cta-submit').focus()}
},true);
function clearPending(){pending=null;document.getElementById('cta-submit').focus()}
document.getElementById('privacy-cancel').addEventListener('click',clearPending);
modal.addEventListener('click',function(e){if(e.target===modal)clearPending()});
document.addEventListener('keydown',function(e){if(!modal.classList.contains('open'))return;if(e.key==='Escape')clearPending();if(e.key==='Tab'){var items=[...modal.querySelectorAll('input,button:not(:disabled)')];var first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
})();
