// === SNAPTIFY - Main JavaScript ===

// Lightbox
function lb(src){
  const el=document.getElementById('lightbox');
  document.getElementById('lb-img').src=src;
  el.classList.add('show');
}
document.getElementById('lightbox').addEventListener('click',function(){this.classList.remove('show')});

// Gallery switch
function sw(id,thumb,src){
  const main=document.getElementById(id+'-main');
  const img=main.querySelector('img');
  img.style.opacity='0';
  setTimeout(()=>{img.src=src;img.style.opacity='1'},250);
  thumb.parentElement.querySelectorAll('.thumb').forEach(t=>t.classList.remove('on'));
  thumb.classList.add('on');
}

// Mobile menu
const mt=document.getElementById('mt'),mm=document.getElementById('mm');
mt.addEventListener('click',()=>mm.classList.toggle('hidden'));
mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mm.classList.add('hidden')));

// Header scroll
const hdr=document.getElementById('hdr');
window.addEventListener('scroll',()=>{
  if(window.scrollY>50){
    hdr.style.background='rgba(15,23,42,0.95)';
    hdr.style.backdropFilter='blur(10px)';
    hdr.style.borderBottom='1px solid rgba(37,99,235,0.1)';
  }else{
    hdr.style.background='transparent';
    hdr.style.backdropFilter='none';
    hdr.style.borderBottom='none';
  }
});

// Scroll reveal
const obs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('v')});
},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.rv').forEach(el=>obs.observe(el));

// Counter animation
function animateCount(el,target){
  let current=0;const step=target/40;
  const timer=setInterval(()=>{
    current+=step;
    if(current>=target){current=target;clearInterval(timer)}
    el.textContent=Math.floor(current);
  },30);
}
const countObs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting&&!e.target.dataset.counted){
      e.target.dataset.counted='1';
      animateCount(e.target,parseInt(e.target.dataset.count));
    }
  });
},{threshold:0.5});
document.querySelectorAll('[data-count]').forEach(el=>countObs.observe(el));

// Form date min = today
const dateInput=document.getElementById('date');
if(dateInput){dateInput.setAttribute('min',new Date().toISOString().split('T')[0])}

// Parallax on mouse move (desktop hero)
document.addEventListener('mousemove',(e)=>{
  const floats=document.querySelectorAll('.hero-parallax');
  const x=(e.clientX/window.innerWidth-.5)*20;
  const y=(e.clientY/window.innerHeight-.5)*20;
  floats.forEach((el,i)=>{
    const speed=(i+1)*0.3;
    el.style.transform=`translate(${x*speed}px,${y*speed}px)`;
  });
});
