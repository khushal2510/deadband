/* Galaxy page: orrery, signal delay, cosmic scale, Milky Way */
var DUR=function(s){
  if(!isFinite(s))return "–";
  if(s<1)return (s*1000).toFixed(0)+" ms";
  if(s<60)return s.toFixed(1)+" s";
  if(s<3600)return Math.floor(s/60)+" min "+Math.round(s%60)+" s";
  if(s<86400)return Math.floor(s/3600)+" h "+Math.round((s%3600)/60)+" min";
  if(s<86400*365.25){var d=s/86400;return d.toFixed(d<10?1:0)+" days"}
  var y=s/86400/365.25;return y<1000?y.toFixed(y<10?1:0)+" years":y.toExponential(2).replace("e+"," × 10^")+" years";
};

/* ---------- orrery ---------- */
(function(){
  var cv=$("#orrery");if(!cv)return;var ctx=cv.getContext("2d");
  /* a AU, per days, L0 mean longitude at J2000 (deg), px radius */
  var P=[
   {n:"Mercury",c:"#B9B1A8",a:0.387,per:87.97,L0:252.25,px:3,kind:"Terrestrial planet",d:"4,879 km",day:"58.6 Earth days to rotate once. A solar day lasts 176 Earth days.",moons:"0",temp:"167 °C mean",g:3.7,fact:"Surface temperatures swing from about −180 °C at night to about 430 °C by day, because it has almost no atmosphere to hold heat."},
   {n:"Venus",c:"#E8C58A",a:0.723,per:224.7,L0:181.98,px:5,kind:"Terrestrial planet",d:"12,104 km",day:"243 Earth days, and it spins backwards. A day is longer than its year.",moons:"0",temp:"464 °C mean",g:8.87,fact:"Surface pressure is about 92 bar, like being roughly 900 m under the sea. It is hotter than Mercury thanks to its thick CO₂ atmosphere."},
   {n:"Earth",c:"#5B9BE8",a:1.0,per:365.25,L0:100.46,px:5,kind:"Terrestrial planet",d:"12,742 km",day:"23 h 56 min (sidereal). A solar day is 24 h.",moons:"1",temp:"15 °C mean",g:9.81,fact:"The only place we know of with liquid water on the surface and with engineers who need a break."},
   {n:"Mars",c:"#D4684A",a:1.524,per:687,L0:355.45,px:4,kind:"Terrestrial planet",d:"6,779 km",day:"24 h 37 min",moons:"2 (Phobos, Deimos)",temp:"−65 °C mean",g:3.71,fact:"Olympus Mons is about 22 km high, nearly two and a half times the height of Mount Everest above sea level."},
   {n:"Jupiter",c:"#D9B38C",a:5.203,per:4332.6,L0:34.4,px:11,kind:"Gas giant",d:"142,984 km (equatorial)",day:"9 h 56 min",moons:"95+ known",temp:"−110 °C at the 1 bar level",g:24.8,fact:"Its mass is more than twice that of all the other planets combined. The Great Red Spot is a storm that has been observed for centuries."},
   {n:"Saturn",c:"#E3CE9B",a:9.537,per:10759,L0:49.95,px:9,kind:"Gas giant",d:"120,536 km (equatorial)",day:"10 h 33 min",moons:"270+ known",temp:"−140 °C at the 1 bar level",g:10.4,fact:"Its mean density is lower than that of water, so a big enough bathtub would float it. The rings are mostly water ice and span hundreds of thousands of km, yet are typically only about 10 metres to a kilometre thick."},
   {n:"Uranus",c:"#9ADBE0",a:19.19,per:30688,L0:313.24,px:7,kind:"Ice giant",d:"51,118 km",day:"17 h 14 min, spinning backwards",moons:"29 known",temp:"−195 °C at the 1 bar level",g:8.69,fact:"Its axis is tilted about 98°, so it effectively rolls around the Sun on its side. Each pole gets around 42 years of sunlight, then 42 years of darkness."},
   {n:"Neptune",c:"#4C6FE0",a:30.07,per:60182,L0:304.88,px:7,kind:"Ice giant",d:"49,528 km",day:"16 h 6 min",moons:"16 known",temp:"−200 °C at the 1 bar level",g:11.15,fact:"Found in 1846 by calculation from irregularities in Uranus's orbit. It has the fastest winds of any planet, up to about 2,000 km/h."},
   {n:"Pluto",c:"#C9B6A3",a:39.48,per:90560,L0:238.93,px:3,kind:"Dwarf planet",d:"2,377 km",day:"6.4 Earth days",moons:"5",temp:"−230 °C",g:0.62,fact:"Reclassified as a dwarf planet in 2006. Its heart-shaped plain, Sputnik Planitia, was revealed by New Horizons in 2015."}
  ];
  var SUN={n:"Sun",c:"#FFC85A",kind:"Star (G-type)",d:"1,392,700 km",day:"About 25 Earth days at the equator, faster there than at the poles",moons:"8 planets and the rest of the system",temp:"5,500 °C surface, about 15 million °C core",g:274,fact:"Holds 99.86% of the mass of the solar system. Its light takes 8 minutes 20 seconds to reach us."};
  var J2000=Date.UTC(2000,0,1,12),DAY=86400000;
  var simT=(Date.now()-J2000)/DAY,playing=!reduce,speed=20,mode="whole",labels=true,sel="Earth",W=0,H=0,dpr=1,last=performance.now(),vis=true,hover=null,pos=[];
  var stars=[];for(var i=0;i<160;i++)stars.push([Math.random(),Math.random(),0.4+Math.random()*1.2,Math.random()*6]);
  var $sp=$("#orrSpeed"),$sd=$("#orrSpeedV"),$pl=$("#orrPlay"),$dt=$("#orrDate");
  function size(){var r=cv.getBoundingClientRect();dpr=Math.min(window.devicePixelRatio||1,2);W=r.width;H=r.height;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)}
  function rad(a){var Rmax=Math.min(W*0.47,H*0.47);if(mode==="whole")return Rmax*Math.sqrt(a/39.48)*0.98+12;return (Rmax/5.8)*a+14}
  function frame(now){
    var dt=Math.min(0.1,(now-last)/1000);last=now;
    if(playing)simT+=speed*dt;
    draw(now/1000);
    if(vis&&!document.hidden)requestAnimationFrame(frame);else running=false;
  }
  var running=false;
  function go(){if(!running){running=true;last=performance.now();requestAnimationFrame(frame)}}
  function draw(t){
    var cx=W/2,cy=H/2;ctx.clearRect(0,0,W,H);
    stars.forEach(function(s){ctx.globalAlpha=0.35+0.4*Math.sin(t*0.8+s[3]);ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(s[0]*W,s[1]*H,s[2]*0.7,0,6.2832);ctx.fill()});ctx.globalAlpha=1;
    var g=ctx.createRadialGradient(cx,cy,0,cx,cy,70);g.addColorStop(0,"rgba(255,200,90,.55)");g.addColorStop(1,"rgba(255,200,90,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,70,0,6.2832);ctx.fill();
    ctx.fillStyle=SUN.c;ctx.beginPath();ctx.arc(cx,cy,12,0,6.2832);ctx.fill();
    if(sel==="Sun"){ctx.strokeStyle="#fff";ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(cx,cy,19,0,6.2832);ctx.stroke()}
    pos=[];
    P.forEach(function(p){
      var r=rad(p.a);if(mode==="inner"&&r>Math.min(W,H)*0.5+40){return}
      ctx.strokeStyle="rgba(150,165,230,.22)";ctx.lineWidth=1;ctx.beginPath();ctx.arc(cx,cy,r,0,6.2832);ctx.stroke();
      var ang=(p.L0+360*simT/p.per)*Math.PI/180,x=cx+r*Math.cos(ang),y=cy-r*Math.sin(ang);
      pos.push({n:p.n,x:x,y:y,r:Math.max(p.px+6,12)});
      if(p.n==="Saturn"){ctx.strokeStyle="rgba(227,206,155,.8)";ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(x,y,p.px*1.9,p.px*0.7,-0.4,0,6.2832);ctx.stroke()}
      ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(x,y,p.px,0,6.2832);ctx.fill();
      if(p.n==="Earth"){var ma=simT/27.32*6.2832;ctx.fillStyle="#DDE";ctx.beginPath();ctx.arc(x+Math.cos(ma)*11,y-Math.sin(ma)*11,1.6,0,6.2832);ctx.fill()}
      if(sel===p.n){ctx.strokeStyle="#fff";ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x,y,p.px+6,0,6.2832);ctx.stroke()}
      if(labels||sel===p.n||hover===p.n){ctx.fillStyle=sel===p.n||hover===p.n?"#fff":"rgba(200,210,245,.75)";ctx.font="11px 'DM Mono', monospace";ctx.textAlign="left";ctx.fillText(p.n,x+p.px+8,y+4)}
    });
    var d=new Date(J2000+simT*DAY);
    $dt.textContent=d.toISOString().slice(0,10);
  }
  function pick(e){
    var r=cv.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,best=null,bd=1e9;
    if(Math.hypot(x-W/2,y-H/2)<22)return "Sun";
    pos.forEach(function(p){var d=Math.hypot(p.x-x,p.y-y);if(d<p.r&&d<bd){bd=d;best=p.n}});return best}
  cv.addEventListener("click",function(e){var n=pick(e);if(n)choose(n)});
  cv.addEventListener("pointermove",function(e){var n=pick(e);if(n!==hover){hover=n;cv.style.cursor=n?"pointer":"default";if(!playing)draw(0)}});
  /* controls */
  function spd(v){return 0.5*Math.pow(10,v/100*4)}
  function setSpeed(){speed=spd(+$sp.value);$sd.textContent=(speed<10?speed.toFixed(1):Math.round(speed).toLocaleString())+" days/s"}
  $sp.addEventListener("input",setSpeed);setSpeed();
  $pl.addEventListener("click",function(){playing=!playing;$pl.textContent=playing?"Pause":"Play";go()});
  $("#orrToday").addEventListener("click",function(){simT=(Date.now()-J2000)/DAY;if(!playing)draw(0)});
  $("#orrMode").addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;mode=b.dataset.m;$$("#orrMode button").forEach(function(x){x.setAttribute("aria-pressed",x===b?"true":"false")});if(!playing)draw(0)});
  $("#orrLabels").addEventListener("change",function(e){labels=e.target.checked;if(!playing)draw(0)});
  if(reduce)$pl.textContent="Play";
  /* chips and card */
  var chips=$("#pChips");
  chips.innerHTML=[SUN].concat(P).map(function(p){return '<button type="button" class="pchip" data-n="'+p.n+'" aria-pressed="false"><i style="background:'+p.c+'"></i>'+p.n+'</button>'}).join("");
  chips.addEventListener("click",function(e){var b=e.target.closest("[data-n]");if(b)choose(b.dataset.n)});
  var kg=$("#myKg");
  function card(){
    var p=sel==="Sun"?SUN:P.filter(function(x){return x.n===sel})[0],m=+kg.value||0;
    $$("#pChips .pchip").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.n===sel?"true":"false")});
    var w=(m*p.g/9.80665);
    $("#pCard").innerHTML='<div class="pcard"><div class="globe" style="background:radial-gradient(circle at 32% 30%,'+p.c+',#10142e 140%)"></div><div>'+
      '<div class="label" style="color:var(--deck-muted)">'+esc(p.kind)+'</div><h3 style="font:400 2.4rem/1.1 var(--font-display); margin:4px 0 6px">'+esc(p.n)+'</h3><p>'+esc(p.fact)+'</p>'+
      '<div class="stats">'+
        '<div class="stat"><small>Diameter</small><b>'+esc(p.d)+'</b></div>'+
        (p.a?'<div class="stat"><small>Distance from Sun</small><b>'+p.a.toFixed(2)+' AU</b></div><div class="stat"><small>Year</small><b>'+DUR(p.per*86400)+'</b></div>':'')+
        '<div class="stat"><small>Day</small><b style="font-weight:400; font-size:.9rem">'+esc(p.day)+'</b></div>'+
        '<div class="stat"><small>Moons</small><b>'+esc(p.moons)+'</b></div>'+
        '<div class="stat"><small>Temperature</small><b style="font-weight:400; font-size:.9rem">'+esc(p.temp)+'</b></div>'+
        '<div class="stat"><small>Gravity</small><b>'+p.g+' m/s² ('+(p.g/9.80665).toFixed(2)+' g)</b></div>'+
      '</div>'+
      '<p style="margin-top:14px; font-size:.95rem">Your '+m+' kg would read <b style="color:var(--deck-accent)">'+w.toFixed(w<10?1:0)+' kg</b> on a scale here'+(p.kind.indexOf("giant")>-1||p.n==="Sun"?' (at the cloud tops or visible surface)':'')+'.</p></div></div>';
  }
  function choose(n){sel=n;card();if(!playing)draw(0)}
  kg.addEventListener("input",card);
  if("IntersectionObserver" in window){new IntersectionObserver(function(e){vis=e[0].isIntersecting;if(vis)go()}).observe(cv)}
  document.addEventListener("visibilitychange",function(){if(!document.hidden)go()});
  document.addEventListener("viewshown",function(e){if(e.detail==="solar"){size();go()}});
  window.addEventListener("resize",function(){size();if(!playing)draw(0)});
  size();card();go();
})();

/* ---------- signal delay ---------- */
(function(){
  var dest=$("#sdDest");if(!dest)return;
  var C=299792.458;
  var D=[["Moon (average)",384400],["Sun",149.6e6],["Mars at closest",54.6e6],["Mars at farthest",401e6],["Jupiter (average)",778.5e6],["Saturn (average)",1433.5e6],["Neptune (average)",4495e6],["Voyager 1 (about 170 AU, approximate)",25.4e9],["Proxima Centauri (4.25 light-years)",4.0e13],["Your field transmitter, 300 m away",0.3]];
  var S=[["Airliner, 900 km/h",900/3600],["Apollo-era spacecraft record, 11 km/s",11],["Voyager 1, 17 km/s",17],["Parker Solar Probe peak, 192 km/s",192],["A very patient walk, 5 km/h",5/3600]];
  dest.innerHTML=D.map(function(d,i){return '<option value="'+i+'"'+(i===2?" selected":"")+'>'+esc(d[0])+'</option>'}).join("");
  $("#sdSpeed").innerHTML=S.map(function(d,i){return '<option value="'+i+'"'+(i===2?" selected":"")+'>'+esc(d[0])+'</option>'}).join("");
  var dot=$("#sdDot"),run=0;
  function calc(){
    var km=D[+dest.value][1],lt=km/C,tt=km/S[+$("#sdSpeed").value][1];
    var au=km/149.5978707e6;
    $("#sdOut").innerHTML='<div class="kpi"><small>Distance</small><b>'+(km<1?(km*1000).toFixed(0)+" m":(km>=1e12?(km/9.4607e12).toFixed(2)+" ly":fmt(km,0)+" km"))+'</b></div>'+
      '<div class="kpi"><small>In AU</small><b>'+(au<0.001?au.toExponential(1):fmt(au,au<10?3:1))+'</b></div>'+
      '<div class="kpi"><small>Signal, one way</small><b>'+DUR(lt)+'</b></div>'+
      '<div class="kpi"><small>Ping, round trip</small><b>'+DUR(lt*2)+'</b></div>'+
      '<div class="kpi"><small>Travel time</small><b>'+DUR(tt)+'</b></div>';
    $("#sdNote").textContent=lt<1?"Practically instant. A 300 m field cable is limited by the electronics, not by light.":(lt<60?"A fast conversation is still possible.":(lt<3600?"A control loop over this distance has serious dead time. Operators plan, send, then wait.":"Nobody controls this live. Spacecraft run on stored commands and make decisions on board."))
  }
  function fly(){
    cancelAnimationFrame(run);var km=D[+dest.value][1],lt=Math.max(km/C,0.001),t0=performance.now(),dur=reduce?1:4500,bar=$("#sdBar");
    function f(now){var k=clamp((now-t0)/dur,0,1),w=bar.clientWidth-24;dot.style.transform="translateX("+(k*w).toFixed(1)+"px)";$("#sdClock").textContent="t = "+DUR(lt*k);if(k<1)run=requestAnimationFrame(f)}
    run=requestAnimationFrame(f)}
  dest.addEventListener("change",function(){calc();fly()});$("#sdSpeed").addEventListener("change",calc);$("#sdGo").addEventListener("click",fly);
  calc();dot.style.transform="translateX(0)";
})();

/* ---------- cosmic scale ladder ---------- */
(function(){
  var host=$("#ladder");if(!host)return;
  var C=299792.458,LY=9.4607e12;
  var R=[
   ["Earth's diameter",1.2742e4,"All of us, plus every plant and every instrument loop, fit on this ball."],
   ["Earth to Moon",3.844e5,"Apollo crews needed about three days to cross it. A signal needs 1.3 seconds."],
   ["Earth to Sun (1 AU)",1.496e8,"The astronomical unit, the ruler of the solar system. Light needs 8 min 20 s."],
   ["Sun to Neptune",4.495e9,"About 30 AU. Light needs just over 4 hours."],
   ["Voyager 1 today (about)",2.54e10,"Roughly 170 AU out, travelling at about 17 km/s. Light needs close to a day."],
   ["Nearest star, Proxima Centauri",4.0e13,"4.25 light-years. About 270,000 AU."],
   ["Width of the Milky Way",9.46e17,"About 100,000 light-years across, with 100 to 400 billion stars."],
   ["Distance to Andromeda",2.4e19,"About 2.5 million light-years. You can see this galaxy with the naked eye on a dark night."],
   ["Observable universe (radius)",4.4e23,"About 46 billion light-years in comoving distance, the farthest we can in principle observe."]
  ];
  var lo=3.5,hi=24;
  host.innerHTML=R.map(function(r,i){var w=(Math.log10(r[1])-lo)/(hi-lo)*100,lt=r[1]/C;
    return '<div class="rung" tabindex="0" data-i="'+i+'"><b>'+esc(r[0])+'</b><div class="bar" aria-hidden="true"><i style="width:'+w.toFixed(1)+'%"></i></div><small>'+fmt(r[1],0)+' km<br>light: '+DUR(lt)+'</small><div class="rung-d">'+esc(r[2])+'</div></div>'}).join("");
  host.addEventListener("click",function(e){var r=e.target.closest(".rung");if(r)r.classList.toggle("open")});
  host.addEventListener("keydown",function(e){if((e.key==="Enter"||e.key===" ")&&e.target.classList.contains("rung")){e.preventDefault();e.target.classList.toggle("open")}});
})();

/* ---------- Milky Way ---------- */
(function(){
  var cv=$("#mw");if(!cv)return;var ctx=cv.getContext("2d"),W=0,H=0,dpr=1,pts=[],rot=0,vis=true,last=performance.now(),running=false;
  var ARMS=4,N=2600;
  function seed(){pts=[];var s=11;function r(){s=(s*16807)%2147483647;return s/2147483647}
    for(var i=0;i<N;i++){
      var arm=i%ARMS,rr=Math.pow(r(),0.7),a=arm*(Math.PI*2/ARMS)+rr*5.2+(r()-0.5)*(0.5+0.5*(1-rr)),rad=rr;
      var hue=rr<0.25?"255,214,150":(rr<0.7?"186,205,255":"150,170,255");
      pts.push({a:a,r:rad,s:0.5+r()*1.4,c:hue,al:0.25+r()*0.6})}
    for(var j=0;j<500;j++){var rr2=Math.pow(r(),2.2)*0.28,a2=r()*6.283;pts.push({a:a2,r:rr2,s:0.8+r()*1.6,c:"255,226,170",al:0.3+r()*0.5})}}
  function size(){var r=cv.getBoundingClientRect();dpr=Math.min(window.devicePixelRatio||1,2);W=r.width;H=r.height;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)}
  function draw(){
    var cx=W/2,cy=H/2,R=Math.min(W,H)*0.46,tilt=0.62;ctx.clearRect(0,0,W,H);
    var g=ctx.createRadialGradient(cx,cy,0,cx,cy,R*0.5);g.addColorStop(0,"rgba(255,220,160,.45)");g.addColorStop(1,"rgba(255,220,160,0)");ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    pts.forEach(function(p){var a=p.a+rot*(1.2-p.r*0.7),x=cx+Math.cos(a)*p.r*R,y=cy+Math.sin(a)*p.r*R*tilt;ctx.fillStyle="rgba("+p.c+","+p.al+")";ctx.beginPath();ctx.arc(x,y,p.s,0,6.2832);ctx.fill()});
    /* sun marker at 26,000 ly of 50,000 ly radius */
    var sa=rot*(1.2-0.52*0.7)+2.2,sx=cx+Math.cos(sa)*0.52*R,sy=cy+Math.sin(sa)*0.52*R*tilt;
    ctx.strokeStyle="#FF8F52";ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(sx,sy,8,0,6.2832);ctx.stroke();ctx.fillStyle="#FFC85A";ctx.beginPath();ctx.arc(sx,sy,3,0,6.2832);ctx.fill();
    ctx.fillStyle="#FFE3B8";ctx.font="12px 'DM Mono', monospace";ctx.textAlign="left";ctx.fillText("You are here",sx+14,sy+4);
    ctx.fillStyle="rgba(255,255,255,.55)";ctx.fillText("Galactic centre",cx+10,cy-10);
  }
  function frame(now){var dt=Math.min(0.1,(now-last)/1000);last=now;if(!reduce)rot+=dt*0.04;draw();if(vis&&!document.hidden)requestAnimationFrame(frame);else running=false}
  function go(){if(!running){running=true;last=performance.now();requestAnimationFrame(frame)}}
  if("IntersectionObserver" in window){new IntersectionObserver(function(e){vis=e[0].isIntersecting;if(vis)go()}).observe(cv)}
  document.addEventListener("viewshown",function(e){if(e.detail==="milky"){size();go()}});
  window.addEventListener("resize",function(){size();draw()});
  seed();size();draw();go();
})();
