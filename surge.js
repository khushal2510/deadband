/* ---------- anti-surge ---------- */
(function(){
  var svg=$("#asMap");
  var L=62,T=18,PW=520,PH=336,QM=1.4,HM=1.4;
  function X(q){return L+q/QM*PW}function Y(h){return T+PH-h/HM*PH}
  function qs(h){return Math.sqrt(Math.max(h-0.25,0)/0.75)}
  var s="";
  for(var i=0;i<=7;i++){var v=i*0.2;
    s+='<line x1="'+X(v)+'" y1="'+T+'" x2="'+X(v)+'" y2="'+(T+PH)+'" stroke="var(--line)"/><text x="'+X(v)+'" y="'+(T+PH+16)+'" text-anchor="middle">'+Math.round(v*100)+'</text>';
    s+='<line x1="'+L+'" y1="'+Y(v)+'" x2="'+(L+PW)+'" y2="'+Y(v)+'" stroke="var(--line)"/><text x="'+(L-8)+'" y="'+(Y(v)+4)+'" text-anchor="end">'+Math.round(v*100)+'</text>'}
  s+='<text class="lbl" x="'+(L+PW/2)+'" y="'+(T+PH+36)+'" text-anchor="middle">Flow, % of design</text><text class="lbl" transform="translate(16 '+(T+PH/2)+') rotate(-90)" text-anchor="middle">Head, % of design</text>';
  [0.6,0.8,1,1.1].forEach(function(sp){var q0=Math.sqrt((1.15*sp*sp-0.25)/1.17),d="";
    for(var q=q0;q<=QM;q+=0.02){var h=1.15*sp*sp-0.42*q*q;if(h<0.06)break;d+=(d?"L":"M")+X(q).toFixed(1)+" "+Y(h).toFixed(1)}
    s+='<path d="'+d+'" fill="none" stroke="var(--muted)" stroke-width="1.4" opacity=".55"/>'});
  s+='<polygon id="asBand" fill="var(--accent)" opacity=".14"/><polyline id="asSurge" fill="none" stroke="var(--bad)" stroke-width="3"/><polyline id="asCtl" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-dasharray="7 5"/>';
  s+='<text id="asLblS" class="lbl" style="fill:var(--bad)">Surge line</text><text id="asLblC" class="lbl" style="fill:var(--accent)">Control line</text>';
  s+='<line id="asArrow" stroke="var(--sky)" stroke-width="2" stroke-dasharray="4 3"/><circle id="asDem" r="8" fill="var(--surface)" stroke="var(--ink)" stroke-width="2.5"/><circle id="asOp" r="8" fill="var(--sky)" stroke="var(--surface)" stroke-width="2"/>';
  s+='<text x="'+(L+PW-4)+'" y="'+(T+14)+'" text-anchor="end">hollow: process demand · solid: compressor</text>';
  svg.innerHTML=s;
  var el={q:$("#asQ"),h:$("#asH"),m:$("#asM"),k:$("#asStuck")},CMAX=0.55;
  function draw(){
    var Qd=el.q.value/100,H=el.h.value/100,M=el.m.value/100,stuck=el.k.checked;
    $("#asQv").textContent=el.q.value+"%";$("#asHv").textContent=el.h.value+"%";$("#asMv").textContent=el.m.value+"%";
    var sp="",cp="",hs=[];for(var h=0.25;h<=1.2001;h+=0.05)hs.push(h);
    hs.forEach(function(h){sp+=X(qs(h)).toFixed(1)+","+Y(h).toFixed(1)+" ";cp+=X(qs(h)*(1+M)).toFixed(1)+","+Y(h).toFixed(1)+" "});
    $("#asSurge").setAttribute("points",sp);$("#asCtl").setAttribute("points",cp);
    $("#asBand").setAttribute("points",sp+hs.slice().reverse().map(function(h){return X(qs(h)*(1+M)).toFixed(1)+","+Y(h).toFixed(1)}).join(" "));
    $("#asLblS").setAttribute("x",X(qs(1.17))-74);$("#asLblS").setAttribute("y",Y(1.17)-8);
    $("#asLblC").setAttribute("x",X(qs(0.45)*(1+M))+10);$("#asLblC").setAttribute("y",Y(0.45)+14);
    var Qs=qs(H),Qc=Qs*(1+M),need=Math.max(0,Qc-Qd),open=stuck?0:clamp(need/CMAX,0,1),Qcomp=Qd+open*CMAX;
    $("#asDem").setAttribute("cx",X(Qd));$("#asDem").setAttribute("cy",Y(H));$("#asOp").setAttribute("cx",X(Qcomp));$("#asOp").setAttribute("cy",Y(H));
    var ar=$("#asArrow");ar.setAttribute("x1",X(Qd));ar.setAttribute("y1",Y(H));ar.setAttribute("x2",X(Qcomp));ar.setAttribute("y2",Y(H));
    var margin=(Qcomp/Qs-1)*100,status,cls,txt;
    if(Qcomp<Qs){status="SURGE";cls="bad";txt=stuck?"The recycle valve did not move, so the compressor entered surge. In the plant this means flow reversal, violent vibration and a surge trip.":"Even a fully open recycle valve cannot hold the machine. Process demand is too low for this head."}
    else if(open>=1&&Qcomp<Qc){status="SATURATED";cls="warn";txt="The valve is wide open and the machine sits between the control and surge lines. The margin is eroding. Check recycle valve sizing."}
    else if(open>0){status="PROTECTED";cls="ok";txt="The controller is recycling to hold the machine on the control line."}
    else{status="NORMAL";cls="ok";txt="Operating to the right of the control line. The recycle valve stays closed."}
    $("#asKpi").innerHTML='<div class="kpi"><small>State</small><span class="pill '+cls+'" style="margin-top:6px">'+status+'</span></div><div class="kpi"><small>Recycle valve</small><b>'+Math.round(open*100)+'%</b></div><div class="kpi"><small>Compressor flow</small><b>'+Math.round(Qcomp*100)+'%</b></div><div class="kpi"><small>Margin to surge</small><b>'+(margin>=0?"+":"")+margin.toFixed(0)+'%</b></div>';
    $("#asMsg").textContent=txt;
  }
  [el.q,el.h,el.m,el.k].forEach(function(e){e.addEventListener("input",draw);e.addEventListener("change",draw)});
  function fromEvent(e){var r=svg.getBoundingClientRect(),k=620/r.width,x=(e.clientX-r.left)*k,y=(e.clientY-r.top)*k;
    el.q.value=clamp(Math.round((x-L)/PW*QM*100),20,140);el.h.value=clamp(Math.round((T+PH-y)/PH*HM*100),30,120);draw()}
  var drag=false;
  svg.addEventListener("pointerdown",function(e){drag=true;try{svg.setPointerCapture(e.pointerId)}catch(x){}fromEvent(e)});
  svg.addEventListener("pointermove",function(e){if(drag)fromEvent(e)});
  svg.addEventListener("pointerup",function(){drag=false});svg.addEventListener("pointercancel",function(){drag=false});
  draw();
})();

