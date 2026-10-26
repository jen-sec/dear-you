(async function(){
'use strict';let a=null;try{const raw=sessionStorage.getItem('dear-you-cup-v1');sessionStorage.removeItem('dear-you-cup-v1');a=JSON.parse(raw)}catch(e){}
const r=window.DearCup.result(a);if(!r){document.getElementById('empty-result').hidden=false;return}
document.getElementById('result-content').hidden=false;const set=(id,text)=>document.getElementById(id).textContent=text;set('result-title',r.title);set('result-line',r.line);set('result-reason',r.reason);set('result-note',r.note);
[r.time,r.drink,r.flavor].forEach(text=>{const s=document.createElement('span');s.textContent=text;document.getElementById('result-tags').append(s)});
const canvas=document.getElementById('result-card'),ctx=canvas.getContext('2d');canvas.setAttribute('aria-label',[r.title,r.line,r.drink,r.style,'취향 제안 카드, 메뉴 개발 중'].join('. '));
const btn=document.getElementById('download-card'),status=document.getElementById('download-status');btn.disabled=true;
const photo=new Image();photo.src=a.flavor==='deep'?'assets/taste-deep.jpg':a.flavor==='bright'?'assets/taste-bright.jpg':'assets/hero.jpg';try{await photo.decode()}catch(e){}
if(document.fonts)await document.fonts.ready;
ctx.fillStyle='#f3efe5';ctx.fillRect(0,0,1080,1350);ctx.fillStyle='#182e45';
function text(s,x,y,size,font='sans-serif'){ctx.font=`${size}px ${font}`;ctx.fillText(s,x,y)}
text('DEAR YOU',80,110,48,'Georgia');text('COFFEE HOUSE',80,142,16);ctx.textAlign='right';text('MY AFTERNOON CUP',1000,105,18);text('나의 오후 한 잔',1000,136,18);ctx.textAlign='left';
ctx.strokeStyle='#182e4545';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(80,172);ctx.lineTo(1000,172);ctx.stroke();
text(r.time+'  /  YOUR OWN RHYTHM',80,225,22);text(r.title,80,311,59);text(r.line,80,363,27);
ctx.save();ctx.beginPath();ctx.roundRect(80,415,920,480,[100,100,4,4]);ctx.clip();if(photo.naturalWidth){const scale=Math.max(920/photo.width,480/photo.height);const w=photo.width*scale,h=photo.height*scale;ctx.drawImage(photo,80+(920-w)/2,415+(480-h)/2,w,h)}else{ctx.fillStyle='#d8d6c9';ctx.fillRect(80,415,920,480);ctx.fillStyle='#182e45';text('A LITTLE MORE YOU.',145,660,52,'Georgia')};ctx.restore();
ctx.fillStyle='#182e45';text('TODAY’S TASTE',80,960,20);text(r.drink,80,1027,44);text(r.style,80,1080,29);ctx.strokeStyle='#182e4535';ctx.beginPath();ctx.moveTo(80,1130);ctx.lineTo(1000,1130);ctx.stroke();text('카페인은 가볍게, 취향은 그대로.',80,1184,27);text('취향 제안 카드 · 메뉴 개발 중 · 건강 판정이 아닙니다.',80,1234,19);text('제품 이미지: AI 생성 콘셉트',80,1267,18);ctx.textAlign='right';text('With love,',1000,1220,23,'Georgia');text('DEAR YOU.',1000,1260,30,'Georgia');
btn.disabled=false;
let imageUrl=null;btn.addEventListener('click',()=>{status.textContent='이미지를 준비하고 있어요.';canvas.toBlob(blob=>{if(!blob){status.textContent='이미지 저장에 실패했어요. 다시 시도해주세요.';return}if(imageUrl)URL.revokeObjectURL(imageUrl);imageUrl=URL.createObjectURL(blob);const link=document.createElement('a');link.href=imageUrl;link.download='DEAR-YOU-my-cup.png';document.body.append(link);link.click();link.remove();const fallback=document.getElementById('image-fallback');fallback.href=imageUrl;fallback.hidden=false;status.textContent='저장을 요청했어요. 다운로드가 시작되지 않으면 아래에서 이미지를 열어 저장해주세요.';if(typeof window.gtag==='function')window.gtag('event','card_download',{location:'result'});},'image/png')});
})();
