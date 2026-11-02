/* ---------- PID tuning toy ---------- */
(function(){
  var cv=$("#pidCv"),ctx=cv.getContext("2d"),kc=$("#pidKc"),ti=$("#pidTi");
  var TAU=20,TH=4,DT=0.1,T=160;
  function sim(Kc,Ti){
    var n=Math.round(T/DT),nd=Math.round(TH/DT),buf=[],pv=0.2,I=0.2/Kc,r={pv:[],sp:[],u:[]},sat=0,i;
    for(i=0;i<nd;i++)buf.push(0.2);
    for(var k=0;k<=n;k++){
      var t=k*DT,sp=t<10?0.2:(t<90?0.8:0.5),e=sp-pv,u=Kc*(e+I),uc=clamp(u,0,1);
      if(u===uc||(u>1&&e<0)||(u<0&&e>0))I+=e/Ti*DT;
      if(u!==uc)sat++;
      buf.push(uc);var ud=buf.shift();pv+=(ud-pv)/TAU*DT;
      r.pv.push(pv);r.sp.push(sp);r.u.push(uc);
    }
    var i0=Math.round(10/DT),i1=Math.round(90/DT),mx=0,last=-1;
    for(i=i0;i<=i1;i++){if(r.pv[i]>mx)mx=r.pv[i];if(Math.abs(r.pv[i]-0.8)>0.03)last=i}
    r.over=Math.max(0,(mx-0.8)/0.6*100);
    r.settled=last<i1;r.settle=r.settled?Math.max(0,last*DT-10):null;
    r.sat=sat/(n+1)*100;
    var s=100-1.2*r.over-0.35*(r.settled?r.settle:80)-(r.settled?0:30)-0.3*r.sat;
    r.score=Math.round(clamp(s,0,100));
    return r}
  function size(){var rc=cv.getBoundingClientRect(),d=Math.min(window.devicePixelRatio||1,2);cv.width=Math.round(rc.width*d);cv.height=Math.round(rc.height*d);ctx.setTransform(d,0,0,d,0,0);return rc}
  function draw(){
    var rc=size(),W=rc.width,H=rc.height,L=38,R=10,Tp=12,B=24,pw=W-L-R,ph=H-Tp-B,y0=-0.05,y1=1.25;
    function X(t){return L+t/T*pw}function Y(v){return Tp+ph-(v-y0)/(y1-y0)*ph}
    var r=sim(+kc.value,+ti.value);
    ctx.clearRect(0,0,W,H);ctx.font="11px 'DM Mono', monospace";ctx.fillStyle="#7C86B0";ctx.strokeStyle="#1E2750";ctx.lineWidth=1;
    for(var t=0;t<=T;t+=20){ctx.beginPath();ctx.moveTo(X(t),Tp);ctx.lineTo(X(t),Tp+ph);ctx.stroke();ctx.textAlign="center";ctx.fillText(t+"s",X(t),H-8)}
    [0,0.25,0.5,0.75,1].forEach(function(v){ctx.beginPath();ctx.moveTo(L,Y(v));ctx.lineTo(L+pw,Y(v));ctx.stroke();ctx.textAlign="right";ctx.fillText(Math.round(v*100),L-6,Y(v)+4)});
    function line(arr,col,w,dash){ctx.beginPath();ctx.strokeStyle=col;ctx.lineWidth=w;ctx.setLineDash(dash||[]);for(var k=0;k<arr.length;k+=4){var x=X(k*DT),y=Y(arr[k]);if(k===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.stroke();ctx.setLineDash([])}
    line(r.u,"#7C86B0",1.4);line(r.sp,"#FF8F52",1.8,[6,4]);line(r.pv,"#8FD3FF",2.4);
    var lab=r.score>=80?"Calm":(r.score>=50?"Lively":"Restless");
    $("#pidScore").innerHTML='<div class="label" style="color:var(--deck-muted)">Calm score</div><div class="big">'+r.score+'</div><div style="font:500 .85rem var(--font-mono); color:var(--deck-accent)">'+lab+'</div>'+
      '<div class="row"><span>Overshoot</span><b>'+r.over.toFixed(1)+'%</b></div>'+
      '<div class="row"><span>Settling (±5%)</span><b>'+(r.settled?r.settle.toFixed(0)+' s':'not settled')+'</b></div>'+
      '<div class="row"><span>Output at limit</span><b>'+r.sat.toFixed(0)+'% of time</b></div>';
    $("#pidKcV").textContent=(+kc.value).toFixed(2);$("#pidTiV").textContent=(+ti.value).toFixed(1)+" s";
  }
  function set(a,b){kc.value=a;ti.value=b;draw()}
  kc.addEventListener("input",draw);ti.addEventListener("input",draw);
  $("#pidLam").addEventListener("click",function(){set(1.43,20)});
  $("#pidZN").addEventListener("click",function(){set(4.5,13.3)});
  $("#pidRst").addEventListener("click",function(){set(1,20)});
  window.addEventListener("resize",draw);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(draw);
  draw();
})();

