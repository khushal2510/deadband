/* ---------- relief valve ---------- */
(function(){
  var p=0.9,venting=false,raf=0,last=0;
  var meter=$("#ventMeter"),msg=$("#ventMsg"),btn=$("#ventBtn"),svg=$("#ventSvg"),fill=$("#ventFill");
  function paint(){
    var pct=Math.round(p*100);meter.style.width=pct+"%";
    var h=Math.max(2,Math.round(56*p));fill.setAttribute("y",String(120-h));fill.setAttribute("height",String(h));
    var t;if(p>0.75)t="<b>Deadline pressure "+pct+"%.</b> Hold the button.";
    else if(p>0.4)t="<b>"+pct+"%.</b> Venting nicely. Keep going.";
    else if(p>0.12)t="<b>"+pct+"%.</b> Nearly there. Drop your shoulders.";
    else t="<b>"+pct+"%.</b> Back to normal operating pressure.";
    msg.innerHTML=t}
  function tick(now){var dt=Math.min(0.1,(now-last)/1000);last=now;
    if(venting)p=Math.max(0,p-0.2*dt);else if(p<0.9)p=Math.min(0.9,p+0.012*dt);
    paint();if(venting||p<0.9)raf=requestAnimationFrame(tick);else raf=0}
  function start(){if(venting)return;venting=true;svg.classList.add("venting");last=performance.now();if(!raf)raf=requestAnimationFrame(tick)}
  function stop(){venting=false;svg.classList.remove("venting");if(!raf){last=performance.now();raf=requestAnimationFrame(tick)}}
  btn.addEventListener("pointerdown",function(e){try{btn.setPointerCapture(e.pointerId)}catch(x){}start()});
  btn.addEventListener("pointerup",stop);btn.addEventListener("pointercancel",stop);btn.addEventListener("lostpointercapture",stop);
  btn.addEventListener("keydown",function(e){if((e.key===" "||e.key==="Enter")&&!e.repeat){e.preventDefault();start()}});
  btn.addEventListener("keyup",function(e){if(e.key===" "||e.key==="Enter"){e.preventDefault();stop()}});
  paint();
})();

