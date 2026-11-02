/* ---------- deliverables ---------- */
(function(){
  var G=[
   ["Basis and philosophy",["Review client I&C specification and VDRL","Agree tag and document numbering","P&ID mark-up for instruments and valves","Instrument index","I/O list with signal types","Control philosophy and functional description","Cause and effect matrix","Alarm and trip schedule"]],
   ["Field instrumentation",["Instrument datasheets","Control valve and relief valve datasheets","Loop diagrams","Hook-up (installation) drawings","Instrument location layout","Cable schedule","Junction box and marshalling schedules","Cable routing and tray layout","Hazardous area drawing and Ex certificate pack","Material take-off"]],
   ["Safety lifecycle",["HAZOP actions closed out in the design","LOPA and SIL target register","Safety requirements specification","SIL verification report","Proof test procedures and intervals","Bypass and override philosophy"]],
   ["Control and protection systems",["Unit control panel general arrangement","Panel wiring and terminal drawings","Machinery protection configuration (API 670)","Anti-surge controller configuration","Logic and sequence diagrams","Alarm rationalisation"]],
   ["Test and handover",["FAT procedure and report","Loop check records","SAT and commissioning procedure","Calibration certificates","Spare parts lists","O&M manuals and as-built documents"]]
  ];
  var KEY="db-deliver",saved={};
  try{saved=JSON.parse(store(KEY)||"{}")||{}}catch(e){saved={}}
  var host=$("#dlGroups"),total=0,uid=0;
  host.innerHTML=G.map(function(g){return '<div class="block"><h3>'+esc(g[0])+'</h3><div class="checks" style="margin-top:10px">'+g[1].map(function(t){var id="dl"+(uid++);total++;return '<label for="'+id+'"><input type="checkbox" id="'+id+'" data-k="'+esc(t)+'"'+(saved[t]?" checked":"")+'><span>'+esc(t)+'</span></label>'}).join("")+'</div></div>'}).join("");
  function upd(){var c=$$("input[type=checkbox]",host),n=c.filter(function(x){return x.checked}).length,p=Math.round(n/total*100);
    $("#dlRing").style.setProperty("--p",p);$("#dlPct").textContent=p+"%";$("#dlCount").textContent=n+" of "+total+" done";
    var o={};c.forEach(function(x){if(x.checked)o[x.dataset.k]=1});store(KEY,JSON.stringify(o))}
  host.addEventListener("change",upd);
  $("#dlReset").addEventListener("click",function(){$$("input[type=checkbox]",host).forEach(function(x){x.checked=false});upd()});upd();
})();

