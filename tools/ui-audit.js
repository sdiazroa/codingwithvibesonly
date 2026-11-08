window.__audit = (() => {
  const lum = c => { const [r,g,b] = c.map(v => { v/=255; return v<=0.03928? v/12.92 : Math.pow((v+0.055)/1.055,2.4)}); return 0.2126*r+0.7152*g+0.0722*b };
  const parse = s => { const m = s.match(/rgba?\(([^)]+)\)/); if(!m) return null; const p=m[1].split(',').map(Number); return {c:p.slice(0,3), a: p[3]===undefined?1:p[3]} };
  const bgOf = el => { let e=el; const layers=[]; while(e){ const p=parse(getComputedStyle(e).backgroundColor); if(p&&p.a>0){ layers.push(p); if(p.a>=1) break;} e=e.parentElement;} let base=[255,255,255]; for(const l of layers.reverse()){ base=base.map((b,i)=>l.c[i]*l.a+b*(1-l.a)); } return base };
  const out = {path: location.pathname, vw: innerWidth, vh: innerHeight, hscroll: document.documentElement.scrollWidth > innerWidth + 1};
  const fails=[]; const seen=new Set();
  document.querySelectorAll('body *').forEach(el=>{ const hasText=[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()); if(!hasText) return; const cs=getComputedStyle(el); if(cs.visibility==='hidden'||cs.display==='none') return; const r=el.getBoundingClientRect(); if(r.width===0||r.height===0) return; const fg=parse(cs.color); if(!fg) return; const bg=bgOf(el); const fgc=fg.c.map((v,i)=>v*fg.a+bg[i]*(1-fg.a)); const L1=lum(fgc), L2=lum(bg); const ratio=(Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05); const size=parseFloat(cs.fontSize); const bold=parseInt(cs.fontWeight)>=700; const large=size>=24||(size>=18.66&&bold); const need=large?3:4.5; if(ratio<need){ const key=el.tagName+'.'+el.className+Math.round(ratio*10); if(!seen.has(key)){seen.add(key); fails.push(el.textContent.trim().slice(0,24)+' | '+ratio.toFixed(2)+' need '+need+' | '+size+'px')}} });
  const small=[]; document.querySelectorAll('a,button,input,select,textarea,summary').forEach(el=>{ const r=el.getBoundingClientRect(); const cs=getComputedStyle(el); if(r.width===0||r.height===0||cs.visibility==='hidden') return; const inline=el.tagName==='A'&&cs.display==='inline'; if(r.height<32 && !inline && !el.classList.contains('hp')) small.push((el.textContent||el.name||'').trim().slice(0,20)+' '+Math.round(r.height)+'px') });
  out.h1=document.querySelectorAll('h1').length;
  out.imgNoAlt=[...document.images].filter(i=>!i.hasAttribute('alt')).length;
  out.sizes=[...new Set([...document.querySelectorAll('body *')].filter(e=>[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())).map(e=>Math.round(parseFloat(getComputedStyle(e).fontSize))))].sort((a,b)=>a-b).join(',');
  const cta=document.querySelector('.hero .btn'); out.ctaBottom=cta?Math.round(cta.getBoundingClientRect().bottom):null; const cl=document.querySelector('.continue-link'); out.contBottom=cl?Math.round(cl.getBoundingClientRect().bottom):null;
  const h2=document.querySelector('.home > h2'); out.nextSectionBelowFold=h2?Math.round(h2.getBoundingClientRect().top-innerHeight):null; out.contrast=fails.slice(0,8); out.small=small.slice(0,6);
  return JSON.stringify(out);
});
