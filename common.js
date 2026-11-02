/* Deadband shared helpers, theme, header, footer, views */
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var esc=function(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};
var clamp=function(v,a,b){return Math.min(b,Math.max(a,v))};
var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function store(k,v){try{if(v===undefined){return localStorage.getItem(k)}localStorage.setItem(k,v)}catch(e){return null}}
var SUP={"-":"⁻","0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹"};
function sci(x){if(!isFinite(x)||x===0)return "0";var e=Math.floor(Math.log10(Math.abs(x))),m=x/Math.pow(10,e);if(m>=9.95){m=1;e+=1}return m.toFixed(1)+" × 10"+String(e).split("").map(function(c){return SUP[c]}).join("")}
function fmt(n,d){if(!isFinite(n))return "–";d=d==null?2:d;var a=Math.abs(n);if(a!==0&&(a<0.01||a>=1e7))return sci(n);return n.toLocaleString(undefined,{maximumFractionDigits:d})}
var root=document.documentElement;

/* theme */
(function(){
  var st=store("db-theme");if(st==="dark"||st==="light")root.setAttribute("data-theme",st);
})();

/* tabs helper */
function makeTabs(list,cb){
  var btns=$$("[role=tab]",list);
  function pick(b){btns.forEach(function(x){x.setAttribute("aria-selected",x===b?"true":"false")});cb(b.dataset.key)}
  btns.forEach(function(b,i){
    b.addEventListener("click",function(){pick(b)});
    b.addEventListener("keydown",function(e){var n=null;if(e.key==="ArrowRight"||e.key==="ArrowDown")n=btns[(i+1)%btns.length];if(e.key==="ArrowLeft"||e.key==="ArrowUp")n=btns[(i-1+btns.length)%btns.length];if(n){e.preventDefault();n.focus();pick(n)}});
  });
}

/* header and footer */
(function(){
  var PAGES=[["index.html","Home","home"],["unwind.html","Unwind","unwind"],["galaxy.html","Galaxy","galaxy"],["field.html","Field guide","field"],["safety.html","Safety","safety"],["machinery.html","Machinery","machinery"],["desk.html","Desk","desk"]];
  var cur=window.PAGE||"home";
  var links=PAGES.map(function(p){return '<a href="'+p[0]+'"'+(p[2]===cur?' aria-current="page"':'')+'>'+p[1]+'</a>'}).join("");
  var hd=$("#topbar");
  if(hd){
    hd.className="topbar";
    hd.innerHTML='<div class="wrap">'+
      '<a class="brand" href="index.html" aria-label="Deadband home"><svg width="30" height="24" viewBox="0 0 30 24" fill="none" aria-hidden="true"><rect x="1" y="5" width="28" height="14" rx="3" stroke="var(--ink)" stroke-width="1.6"/><path class="wv" d="M3 12 C7 8 9 16 13 12 S19 9 21 12 S25 14 27 12" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round"/></svg>Deadband</a>'+
      '<nav class="nav" id="mainNav" aria-label="Pages">'+links+'</nav>'+
      '<button class="hbtn" id="ambBtn" type="button" aria-pressed="false" title="Play plant ambience"><span class="eq" aria-hidden="true"><i></i><i></i><i></i></span><span class="t">Ambience</span></button>'+
      '<button class="hbtn sq" id="themeBtn" type="button" aria-label="Switch light or dark theme" title="Switch theme"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button>'+
      '<button class="hbtn sq menu-btn" id="menuBtn" type="button" aria-label="Open menu" aria-expanded="false"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>'+
    '</div>';
    $("#themeBtn").addEventListener("click",function(){
      var c=root.getAttribute("data-theme"),dark=c?c==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches,n=dark?"light":"dark";
      root.setAttribute("data-theme",n);store("db-theme",n);
    });
    var nav=$("#mainNav"),mb=$("#menuBtn");
    mb.addEventListener("click",function(){var o=nav.classList.toggle("open");mb.setAttribute("aria-expanded",o?"true":"false")});
    nav.addEventListener("click",function(e){if(e.target.closest("a")){nav.classList.remove("open")}});
  }
  var ft=$("#foot");
  if(ft){
    ft.innerHTML='<div class="wrap grid"><div><p class="def">Deadband <i>(n.)</i> the range through which an input can change without the output responding.</p>'+
      '<p class="fine">Deadband is a reference and relaxation space for instrumentation and control engineers. Values are typical or illustrative, with sources named where it matters. Always follow the project specification, the editions of the standards your client names, vendor documentation and your company procedures.</p>'+
      '<div class="foot-links">'+PAGES.map(function(p){return '<a href="'+p[0]+'">'+p[1]+'</a>'}).join("")+'</div></div>'+
      '<div class="love">Built with <span class="heart" aria-label="love"><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.6 5 6 5c2 0 3.4 1.1 4 2.4.6-1.3 2-2.4 4-2.4 3.4 0 5.1 3.4 3.6 6.8C19.5 16.4 12 21 12 21z"/></svg></span> love by Khushal</div></div>';
    ft.className="foot";
  }
})();

/* views: switch between .topic panels with hash routing */
function initViews(){
  var host=$("#views"),bar=$("#viewTabs");if(!host||!bar)return;
  var panels=$$(".topic[data-topic]",host);
  bar.innerHTML=panels.map(function(p,i){var label=p.dataset.label||($(".tt",p)||{}).textContent||p.dataset.topic;return '<button class="tab" role="tab" data-key="'+esc(p.dataset.topic)+'" aria-selected="false">'+esc(label)+'</button>'}).join("");
  var tabs=$("[role=tablist]",bar.parentNode)||bar;
  function show(k,fromHash){
    var ok=panels.some(function(p){return p.dataset.topic===k});if(!ok)k=panels[0].dataset.topic;
    panels.forEach(function(p){p.hidden=p.dataset.topic!==k});
    $$("[role=tab]",bar).forEach(function(b){var on=b.dataset.key===k;b.setAttribute("aria-selected",on?"true":"false");if(on&&b.scrollIntoView&&!fromHash)b.scrollIntoView({block:"nearest",inline:"center"})});
    document.dispatchEvent(new CustomEvent("viewshown",{detail:k}));
  }
  makeTabs(bar,function(k){show(k);try{history.replaceState(null,"","#"+k)}catch(e){}});
  window.addEventListener("hashchange",function(){show(location.hash.replace("#",""),true)});
  show(location.hash.replace("#","")||panels[0].dataset.topic,true);
}
