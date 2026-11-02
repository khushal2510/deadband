/* ---------- SIL tabs + calculator ---------- */
(function(){
  var box=$('[data-topic="sil"]');
  makeTabs($("#silTabs"),function(k){$$("[data-sp]",box).forEach(function(p){p.hidden=p.dataset.sp!==k})});
  var rows=[["Sensor","1oo2",100,10],["Logic solver","1oo1",20,10],["Final element","1oo1",400,10]];
  $("#silRows").innerHTML=rows.map(function(r,i){return '<div style="border:1px solid var(--line); border-radius:12px; padding:12px; display:grid; gap:10px"><b>'+r[0]+'</b><div class="row">'+
    '<label class="f" for="silL'+i+'">λDU (FIT)<input type="number" id="silL'+i+'" min="0" step="any" value="'+r[2]+'"></label>'+
    '<label class="f" for="silA'+i+'">Architecture<select id="silA'+i+'">'+["1oo1","1oo2","2oo2","2oo3"].map(function(a){return '<option'+(a===r[1]?" selected":"")+'>'+a+'</option>'}).join("")+'</select></label>'+
    '<label class="f" for="silB'+i+'">β (%)<input type="number" id="silB'+i+'" min="0" max="50" step="1" value="'+r[3]+'"></label></div></div>'}).join("");
  function pfd(l,a,b,ti){var x=l*1e-9*ti*8760,B=b/100;
    if(a==="1oo1")return x/2;if(a==="1oo2")return Math.pow((1-B)*x,2)/3+B*x/2;if(a==="2oo2")return x;return Math.pow((1-B)*x,2)+B*x/2}
  function run(){
    var ti=Math.max(0.01,+$("#silTI").value||1),ps=[],tot=0;
    for(var i=0;i<3;i++){var v=pfd(Math.max(0,+$("#silL"+i).value||0),$("#silA"+i).value,clamp(+$("#silB"+i).value||0,0,50),ti);ps.push(v);tot+=v}
    var band,cls;
    if(tot>=0.1){band="Below SIL 1";cls="bad"}else if(tot>=1e-2){band="SIL 1 band";cls="warn"}else if(tot>=1e-3){band="SIL 2 band";cls="ok"}else if(tot>=1e-4){band="SIL 3 band";cls="ok"}else{band="SIL 4 band";cls="ok"}
    $("#silOut").innerHTML='<div class="label">Total PFDavg</div><div class="big">'+sci(tot)+'</div><div>RRF ≈ '+(tot>0?Math.round(1/tot).toLocaleString():"∞")+'</div><div><span class="pill '+cls+'">'+band+'</span></div>';
    var names=["Sensor","Logic solver","Final element"];
    $("#silShare").innerHTML='<h4>Contribution to the total</h4>'+ps.map(function(v,i){var pc=tot>0?v/tot*100:0;return '<div><div style="display:flex; justify-content:space-between; font-size:.88rem"><span>'+names[i]+'</span><span class="mono">'+sci(v)+' · '+pc.toFixed(0)+'%</span></div><div class="meter"><i style="width:'+pc.toFixed(1)+'%"></i></div></div>'}).join("")+
      '<p class="muted" style="font-size:.9rem">The final element often dominates. Common improvements are a shorter proof test interval, partial stroke testing or redundant valves.</p>';
  }
  $$("input,select",$('[data-sp="calc"]')).forEach(function(e){e.addEventListener("input",run);e.addEventListener("change",run)});run();
})();

