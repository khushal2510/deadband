/* Tank zen: keep the level in the green band by hand, or let a PI controller show you how */
(function(){
  var L=0.5,v=0.45,auto=false,t=0,I=0,hist=[],last=performance.now(),raf=0,vis=true,dstep=0,nextStep=14;
  var fillR=$("#tkFill"),wave=$("#tkWave"),vsl=$("#tkValve"),vv=$("#tkValveV"),msg=$("#tkMsg"),score=$("#tkScore"),aut=$("#tkAuto"),lvlTxt=$("#tkLvl"),stream=$("#tkStream");
  var TOP=40,H=200; /* svg tank interior from y=40 to 240 */
  function demand(tm){return 0.24+0.07*Math.sin(tm/9)+0.04*Math.sin(tm/3.1)+dstep}
  function paint(){
    var y=TOP+H*(1-L);fillR.setAttribute("y",y.toFixed(1));fillR.setAttribute("height",(TOP+H-y).toFixed(1));wave.setAttribute("transform","translate(0 "+(y-TOP).toFixed(1)+")");
    lvlTxt.textContent=Math.round(L*100)+"%";
    stream.setAttribute("opacity",(0.2+v*0.8).toFixed(2));stream.setAttribute("stroke-width",(1+v*7).toFixed(1));
    vv.textContent=Math.round(v*100)+"%";
  }
  function step(now){
    var dt=Math.min(0.1,(now-last)/1000);last=now;t+=dt;
    if(t>nextStep){dstep=(Math.random()-0.5)*0.16;nextStep=t+10+Math.random()*14}
    if(auto){var e=0.5-L;I+=e*dt*0.25;I=clamp(I,-0.6,0.6);v=clamp(0.48+2.2*e+I,0,1);vsl.value=Math.round(v*100)}
    var inflow=v*0.5,out=Math.max(0,demand(t))*(0.4+0.8*L);
    L=clamp(L+(inflow-out)/4*dt,0,1);
    hist.push(L>=0.4&&L<=0.6?1:0);if(hist.length>600)hist.shift();
    var pct=Math.round(hist.reduce(function(a,b){return a+b},0)/hist.length*100);
    score.textContent=pct+"%";
    msg.textContent=L<0.12?"Low-low level. The pump is gasping. Open the inlet.":(L>0.88?"High-high level. Close the inlet before it overflows.":(L>=0.4&&L<=0.6?"In the green band. Breathe.":"Drifting. Small corrections work best."));
    paint();
    if(vis&&!document.hidden)raf=requestAnimationFrame(step);else raf=0;
  }
  function run(){if(!raf){last=performance.now();raf=requestAnimationFrame(step)}}
  vsl.addEventListener("input",function(){if(auto){auto=false;aut.setAttribute("aria-pressed","false");aut.textContent="Let the controller try"}v=+vsl.value/100});
  aut.addEventListener("click",function(){auto=!auto;I=0;aut.setAttribute("aria-pressed",auto?"true":"false");aut.textContent=auto?"Take back control":"Let the controller try"});
  if("IntersectionObserver" in window){new IntersectionObserver(function(e){vis=e[0].isIntersecting;if(vis)run()}).observe($("#tankBox"))}
  document.addEventListener("visibilitychange",function(){if(!document.hidden)run()});
  vsl.value=Math.round(v*100);paint();if(!reduce)run();else{score.textContent="paused";msg.textContent="Reduced motion is on, so the tank is paused. Move the valve to start it.";vsl.addEventListener("input",run,{once:true})}
})();
