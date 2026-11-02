/* Break timer */
(function(){
  var ring=$("#tmRing"),txt=$("#tmText"),start=$("#tmStart"),reset=$("#tmReset"),note=$("#tmNote"),seg=$$("#tmSeg button");
  var mins=5,end=0,total=0,id=0,running=false;
  function mmss(s){s=Math.max(0,Math.ceil(s));var m=Math.floor(s/60),r=s%60;return m+":"+(r<10?"0":"")+r}
  function show(rem){txt.textContent=mmss(rem);ring.style.setProperty("--p",total?((total-rem)/total*100).toFixed(1):0)}
  function tick(){
    var rem=(end-Date.now())/1000;
    if(rem<=0){clearInterval(id);running=false;show(0);ring.style.setProperty("--p",100);start.textContent="Start";note.textContent="Break over. The loops are still where you left them.";if(window.DBChime)window.DBChime();return}
    show(rem);
  }
  function set(m){mins=m;total=m*60;clearInterval(id);running=false;start.textContent="Start";show(total);ring.style.setProperty("--p",0);note.textContent="Pick a length and press start. Step away from the screen if you can."}
  seg.forEach(function(b){b.addEventListener("click",function(){seg.forEach(function(x){x.setAttribute("aria-pressed",x===b?"true":"false")});set(+b.dataset.m)})});
  start.addEventListener("click",function(){
    if(running){clearInterval(id);running=false;start.textContent="Resume";var rem=(end-Date.now())/1000;note.textContent="Paused.";txt.textContent=mmss(rem);end=0;total=total;mins=mins;paused=rem;return}
    var rem=typeof paused==="number"&&paused>0?paused:total;paused=0;end=Date.now()+rem*1000;running=true;start.textContent="Pause";note.textContent="Look at something far away for a moment.";tick();id=setInterval(tick,250)});
  var paused=0;
  reset.addEventListener("click",function(){paused=0;set(mins)});
  set(5);
})();
