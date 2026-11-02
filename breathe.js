/* ---------- breathing ---------- */
(function(){
  var cx=160,cy=160,R=122,A0=-125,A1=125,span=A1-A0;
  function pt(a,r){var t=(a-90)*Math.PI/180;return [cx+r*Math.cos(t),cy+r*Math.sin(t)]}
  function arc(a,b,r){var p=pt(a,r),q=pt(b,r);return "M"+p[0].toFixed(2)+" "+p[1].toFixed(2)+"A"+r+" "+r+" 0 "+((b-a)>180?1:0)+" 1 "+q[0].toFixed(2)+" "+q[1].toFixed(2)}
  $("#gArc1").setAttribute("d",arc(A0,A0+span*0.72,R));$("#gArc2").setAttribute("d",arc(A0+span*0.76,A1,R));
  var h="";for(var i=0;i<=20;i++){var a=A0+span*i/20,m=i%2===0,p1=pt(a,R-12),p2=pt(a,R-(m?26:19));h+='<line x1="'+p1[0].toFixed(1)+'" y1="'+p1[1].toFixed(1)+'" x2="'+p2[0].toFixed(1)+'" y2="'+p2[1].toFixed(1)+'" stroke="var(--muted)" stroke-width="'+(m?2:1)+'" opacity=".7"/>'}
  $("#gTicks").innerHTML=h;
  var L=.12,Hh=.78,PAT={
    calm:[{n:"Breathe in",s:"pressure building",d:4,a:L,b:Hh},{n:"Hold",s:"at setpoint",d:2,a:Hh,b:Hh},{n:"Breathe out",s:"relief valve lifting",d:6,a:Hh,b:L}],
    box:[{n:"Breathe in",s:"pressure building",d:4,a:L,b:Hh},{n:"Hold",s:"at setpoint",d:4,a:Hh,b:Hh},{n:"Breathe out",s:"relief valve lifting",d:4,a:Hh,b:L},{n:"Hold",s:"vented",d:4,a:L,b:L}],
    s478:[{n:"Breathe in",s:"pressure building",d:4,a:L,b:Hh},{n:"Hold",s:"at setpoint",d:7,a:Hh,b:Hh},{n:"Breathe out",s:"relief valve lifting",d:8,a:Hh,b:L}]};
  var cur=PAT.calm,idx=0,el=0,run=!reduce,last=performance.now(),key="";
  var needle=$("#needle"),halo=$("#halo"),val=$("#gVal"),ph=$("#phase"),sub=$("#phaseSub"),btn=$("#breathBtn");
  function draw(p){needle.setAttribute("transform","rotate("+(A0+span*p).toFixed(2)+" 160 160)");halo.setAttribute("r",(60+62*p).toFixed(1));val.textContent=(1+7*p).toFixed(1)+" barg"}
  function label(){var k=idx+"|"+Math.ceil(cur[idx].d-el);if(k===key)return;key=k;ph.textContent=cur[idx].n;sub.textContent=cur[idx].s+" · "+Math.max(1,Math.ceil(cur[idx].d-el))+" s"}
  function frame(now){
    var dt=Math.min(0.1,(now-last)/1000);last=now;
    if(run){el+=dt;if(el>=cur[idx].d){el-=cur[idx].d;idx=(idx+1)%cur.length}var P=cur[idx],x=clamp(el/P.d,0,1),e=0.5-0.5*Math.cos(Math.PI*x);draw(P.a+(P.b-P.a)*e);label()}
    requestAnimationFrame(frame)}
  if(reduce){draw(0.45);ph.textContent="Paused";sub.textContent="press start when you are ready";btn.textContent="Start"}
  btn.addEventListener("click",function(){run=!run;btn.textContent=run?"Pause":"Start";if(!run){ph.textContent="Paused";sub.textContent="take your time";key=""}else{last=performance.now()}});
  $$("#patSeg button").forEach(function(b){b.addEventListener("click",function(){$$("#patSeg button").forEach(function(x){x.setAttribute("aria-pressed",x===b?"true":"false")});cur=PAT[b.dataset.k];idx=0;el=0;key="";if(!run){run=true;btn.textContent="Pause"}last=performance.now()})});
  draw(L);label();requestAnimationFrame(frame);
})();

