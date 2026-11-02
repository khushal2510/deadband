/* ---------- compressor shelf ---------- */
(function(){
  var D={
   recip:{
    std:["API 618: reciprocating compressors for petroleum, chemical and gas industry services","ISO 13631 / API 11P: packaged reciprocating gas compressors","API 670: machinery protection systems","API 521: pressure-relieving and depressuring systems","IEC 61511: safety instrumented systems"],
    ctrl:["Capacity control by speed, suction valve unloaders in steps, clearance pockets, recycle with a cooler, or stepless valve unloading.","Start unloaded: lube oil pressure proven, unloaders or bypass open, cooling available, driver permissives healthy.","Protection is per stage: suction scrubber high-high level, discharge pressure and temperature, and relief valves.","Cylinder lubricator no-flow timers, post-lube after stop, starts-per-hour limits for the driver."],
    rows:[
     ["PT","Suction and discharge pressure per stage","Overpressure, stage ratio drift, valve leakage","Alarm + Trip"],
     ["TT / TE","Cylinder discharge gas temperature","Early sign of leaking valves or a high ratio","Alarm + Trip"],
     ["TE","Rod packing case temperature","Packing wear and rod scoring","Alarm"],
     ["ZT (proximity)","Rod drop, piston rod position","Rider band wear before the piston contacts the liner","Alarm + Trip"],
     ["VT / accelerometer","Frame vibration, crosshead acceleration","Loose parts, liquid knock, bearing problems","Alarm + Trip"],
     ["PT / PSLL","Lube oil pressure","Starved bearings. Also a start permissive","Trip + Permissive"],
     ["PDT","Lube oil filter differential pressure","Plugged filter","Alarm"],
     ["TE","Main bearing and lube oil temperature","Bearing distress, cooler performance","Alarm + Trip"],
     ["FSL / cycle switch","Cylinder lubricator divider block flow","No flow means dry rings and scuffed liners","Alarm + Trip"],
     ["LSHH","Inter-stage scrubber level","Liquid slug causes hydraulic lock and bent rods","Trip"],
     ["KT / ST","Keyphasor and speed","Crank angle reference for diagnostics","Log"],
     ["PT (dynamic)","Cylinder pressure data","Valve condition and rod load check","Log"]],
    watch:["Pulsation shakes impulse lines. Keep sensing lines short, braced and supported, and consider remote-mount instruments where vibration is high.","Skid junction boxes vibrate. Check terminal type, gland clamping and cable support.","Rod load and rod reversal results from the API 618 calculations shape the monitoring philosophy. Ask the vendor for them.","Each stage needs its own overpressure path. A relief valve on the discharge cannot be isolated from the compressor.","Cold sites: heat trace impulse lines and drains to avoid hydrates and freezing.","Sensors near hot cylinders: check the Ex temperature class against the gas auto-ignition temperature."]},
   screw:{
    std:["API 619: rotary-type positive displacement compressors (check the edition and scope for dry or oil-flooded units)","API 670: machinery protection systems","API 614 / ISO 10438: lubrication, shaft sealing and control oil systems","ISO 15156 / NACE MR0175: materials for sour service","IEC 60079 series: equipment for explosive atmospheres"],
    ctrl:["Capacity control commonly by slide valve, sometimes with speed control. Slide valve position is a key loop.","Start unloaded: slide valve at minimum, oil pressure and oil temperature proven before loading.","Oil system: oil supply pressure and differential, oil cooler outlet temperature control, separator level.","Stop sequence: unload, run on if specified, then depressurise the separator so oil does not flood back."],
    rows:[
     ["PT / PDT","Oil supply pressure and differential","Rotor and bearing lubrication","Alarm + Trip"],
     ["TT / TSHH","Discharge temperature","Cooling loss, oil degradation","Alarm + Trip"],
     ["TIC / TV","Oil cooler outlet temperature","Oil viscosity and gas dew point margin","Control"],
     ["PDT","Oil separator element differential pressure","Plugging and oil carry-over","Alarm"],
     ["PDT","Oil filter differential pressure","Plugged filter","Alarm"],
     ["LT / LSL / LSH","Oil separator level","Low level starves the rotors, high level carries oil over","Alarm + Trip"],
     ["ZT","Slide valve position","Capacity feedback, unloaded start permissive","Control + Permissive"],
     ["VT / proximity","Rotor vibration, axial position","Rotor contact, bearing wear","Alarm + Trip"],
     ["TE","Bearing temperature","Bearing distress","Alarm + Trip"],
     ["JT / II","Motor power and current","Load, overload, unloaded start check","Alarm + Trip"],
     ["PT / PSLL","Suction pressure","Vacuum and air ingress risk, pressure ratio","Alarm + Trip"],
     ["PT / PSHH","Discharge pressure","Overpressure","Trip"]],
    watch:["Oil-flooded units: keep the discharge temperature sufficiently above the gas dew point to avoid oil dilution, and within the oil limits.","Separator differential pressure that climbs slowly is a maintenance signal. Trend it as well as alarming it.","Shaft sealing: check seal oil or buffer gas instrumentation against the vendor P&ID.","Wet or dirty gas: wetted instruments need compatible materials and a purge or heat trace plan.","Motor start limits live in the starter, but the compressor logic must respect the motor maker's limits.","Hydraulically actuated slide valve: confirm the position it takes on loss of hydraulic pressure."]},
   centri:{
    std:["API 617: axial and centrifugal compressors and expander-compressors","API 670: machinery protection systems","API 614 / ISO 10438: lubrication, shaft sealing and control oil systems","API 692: dry gas sealing systems","IEC 61511: safety instrumented systems"],
    ctrl:["Performance control of suction or discharge pressure by speed or inlet guide vanes, with load sharing across parallel or series trains.","Anti-surge control: dedicated controller, surge control line with margin, fast recycle valve, PI loop plus open-loop responses.","Surge detection based on the rate of change of flow and pressure, with counted surge events that raise the margin and finally trip the machine.","Seal gas and lube oil: pre-start pressures, auxiliary pump start on low header pressure, rundown tank for coast-down.","Overspeed protection independent of the speed controller, with the trip setting taken from the driver standard and vendor data."],
    rows:[
     ["FT / PT","Suction flow (dp) for anti-surge","Fast, redundant measurement tuned for response","Control + Trip"],
     ["PT / TT","Suction and discharge pressure and temperature","Map inputs and performance monitoring","Control + Alarm"],
     ["XT / VT (X-Y)","Radial shaft vibration at each bearing","Instability, rub and surge effects","Alarm + Trip"],
     ["ZT","Axial position (thrust)","Thrust bearing wear and rubs","Alarm + Trip"],
     ["KT / ST","Keyphasor and speed","Phase reference and overspeed protection","Trip"],
     ["TE (dual)","Bearing metal temperatures","Journal and thrust pad temperatures","Alarm + Trip"],
     ["PT / PSLL","Lube oil header pressure","Starved bearings, auxiliary pump start","Alarm + Trip"],
     ["PDT / FT","Dry gas seal primary vent differential pressure or flow","Primary seal wear and health trend","Alarm + Trip"],
     ["PT / FT","Seal gas supply and separation gas","Contamination of seal faces","Alarm + Trip"],
     ["LSHH","Suction KO drum level","Liquid ingestion damages impellers","Trip"],
     ["ZT / ZS","Recycle valve position","Valve health, stroke test evidence","Control + Alarm"],
     ["AT","Gas molecular weight (optional)","Keeps the surge line representative as composition changes","Control"]],
    watch:["The surge line moves with molecular weight, suction temperature and speed. Use corrected (reduced) coordinates, or a margin that covers the range.","Anti-surge is a speed contest: fast transmitters, fast positioners with boosters, quick scan, short valve stroke.","Keep the fast loop off slow buses. Hard-wired I/O for flow, valve position and the quick-open command is common.","After a surge event the controller usually raises the margin and logs the count for the operator.","Dry gas seal health shows up as a trend in primary vent flow. Alarm on the change as well as a fixed value.","Coast-down: the lube oil rundown tank and any stored energy for valves must cover the full coast-down time."]}
  };
  var body=$("#compBody");
  function badges(a){return a.split("+").map(function(x){x=x.trim();var c=/trip/i.test(x)?"trip":(/alarm/i.test(x)?"alarm":(/control|permissive/i.test(x)?"ctl":""));return '<span class="badge '+c+'">'+esc(x)+'</span>'}).join("")}
  function render(k){
    var d=D[k];
    body.innerHTML=
     '<div class="two"><div class="block"><h3>Standards to have open</h3><ul class="dots" style="margin-top:10px">'+d.std.map(function(s){return "<li>"+esc(s)+"</li>"}).join("")+'</ul></div>'+
     '<div class="block"><h3>Control and start-up approach</h3><ul class="dots" style="margin-top:10px">'+d.ctrl.map(function(s){return "<li>"+esc(s)+"</li>"}).join("")+'</ul></div></div>'+
     '<div class="block"><h3>Instruments you will tag</h3><p class="muted" style="font-size:.9rem; margin:4px 0 12px">Typical scope and actions. The vendor P&amp;ID, API datasheets and the client specification decide the real list and setpoints.</p>'+
       '<div class="tablewrap"><table><thead><tr><th>Tag type</th><th>Measures</th><th>Why it matters</th><th>Typical action</th></tr></thead><tbody>'+
       d.rows.map(function(r){return '<tr><td class="tagc">'+esc(r[0])+'</td><td>'+esc(r[1])+'</td><td>'+esc(r[2])+'</td><td>'+badges(r[3])+'</td></tr>'}).join("")+
     '</tbody></table></div></div>'+
     '<div class="block"><h3>Design watch-points</h3><ul class="dots" style="margin-top:10px">'+d.watch.map(function(s){return "<li>"+esc(s)+"</li>"}).join("")+'</ul></div>';
  }
  makeTabs($("#compTabs"),render);render("recip");
})();

