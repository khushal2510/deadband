/* ---------- LOPA ---------- */
(function(){
  var IPL=[["BPCS control loop","PFD 0.1. Only if independent of the initiating event.",0.1],["Operator response to an alarm","PFD 0.1. Needs a dedicated alarm and time to act.",0.1],["Relief valve or rupture disk","PFD 0.01 in suitable service.",0.01],["Dike or bund","PFD 0.01.",0.01]];
  var host=$("#lpIPL");
  host.innerHTML=IPL.map(function(x,i){return '<label for="lpI'+i+'"><input type="checkbox" id="lpI'+i+'"'+(i===1?" checked":"")+' data-pfd="'+x[2]+'"><span>'+x[0]+'<small>'+x[1]+'</small></span></label>'}).join("");
  var pre=[["1e-3","10⁻³"],["1e-4","10⁻⁴"],["1e-5","10⁻⁵"],["1e-6","10⁻⁶"]];
  $("#lpPresets").innerHTML=pre.map(function(p){return '<button type="button" class="chip" data-v="'+p[0]+'">'+p[1]+' (example)</button>'}).join("");
  $("#lpPresets").addEventListener("click",function(e){var b=e.target.closest("[data-v]");if(b){$("#lpTg").value=b.dataset.v;run()}});
  function pos(f){return clamp((Math.log10(Math.max(f,1e-12))+8)/8*100,2,98)}
  function run(){
    var sel=$("#lpIE").value,ie=sel==="custom"?(+$("#lpIEc").value||0):+sel,tg=Math.max(1e-12,+$("#lpTg").value||1e-5);
    var mod=(+$("#lpIgn").value)*(+$("#lpOcc").value)*(+$("#lpFat").value),ip=1;
    $$("input[type=checkbox]",host).forEach(function(c){if(c.checked)ip*=+c.dataset.pfd});
    ip*=clamp(+$("#lpCustom").value||1,1e-4,1);
    var f0=ie*mod,f=f0*ip,msg;
    if(f<=tg){msg='<span class="pill ok">Target met</span><div>No additional SIF needed for this scenario.</div>'}
    else{var rrf=f/tg,p=tg/f,sil=p>=0.1?"Needs less than SIL 1":(p>=1e-2?"SIL 1":(p>=1e-3?"SIL 2":(p>=1e-4?"SIL 3":"SIL 4")));
      msg='<span class="pill '+(p<1e-3?"bad":"warn")+'">Gap to close</span><div>Needed RRF ≈ <b>'+(rrf<10?rrf.toFixed(1):Math.round(rrf).toLocaleString())+'</b>, so the SIF PFDavg must be ≤ <b>'+sci(p)+'</b>.</div><div>Indicated target: <b>'+sil+'</b>'+(p<1e-3?". Consider added independent layers or design changes first.":".")+'</div>'}
    $("#lpOut").innerHTML='<div class="mono muted" style="font-size:.78rem">Unmitigated '+sci(f0)+' /yr · Mitigated '+sci(f)+' /yr · Target '+sci(tg)+' /yr</div>'+msg;
    $("#mkIE").style.left=pos(f0)+"%";$("#mkMit").style.left=pos(f)+"%";$("#mkTg").style.left=pos(tg)+"%";
  }
  $$("select,input",$('[data-topic="lopa"]')).forEach(function(e){e.addEventListener("input",run);e.addEventListener("change",run)});run();
})();

