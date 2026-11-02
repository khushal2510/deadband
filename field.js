/* Field guide: measurement tables, calculators, valves, signals, loops */

/* ---------- measurement tables ---------- */
(function(){
  var M={
   pressure:{
    t:"Pressure",
    rows:[
     ["Bourdon tube gauge","A curved tube straightens as pressure rises and moves a pointer.","Local indication on almost every line and vessel.","Pulsation and vibration (use a liquid-filled case or snubber). Do not exceed about 75% of range in steady use."],
     ["Diaphragm or capsule","A thin diaphragm deflects with pressure.","Low pressures. With a remote seal, viscous, corrosive or hot media.","Fill fluid and capillary length affect temperature response and accuracy."],
     ["Piezoresistive or strain gauge cell","Strain changes the resistance of a bridge on the diaphragm.","General-purpose process transmitters.","Overpressure, temperature effects and static pressure effect."],
     ["Capacitive cell","Diaphragm movement changes capacitance between plates.","Differential pressure (flow, level), good turndown.","Overrange limits and mounting orientation shift the zero."],
     ["Resonant sensor","A vibrating silicon element changes frequency with stress.","High accuracy and long-term stability.","Higher cost. Same installation care as other transmitters."],
     ["Piezoelectric","Quartz or ceramic produces charge when stressed.","Fast dynamic pressure and pulsation measurement.","Cannot measure static pressure."]
    ],
    notes:["Slope impulse lines continuously toward the process for liquids (down) or from the process for gases (up) to avoid trapped gas or liquid.","Use a block-and-bleed or 3-valve or 5-valve manifold so the instrument can be isolated and calibrated in place.","Use a siphon (pigtail) or a seal pot on steam so hot steam does not reach the sensor.","Check overrange and static pressure ratings for DP transmitters in high line pressure."]},
   temperature:{
    t:"Temperature",
    rows:[
     ["Thermocouple","Two dissimilar metals produce a small voltage that depends on the junction temperature difference (Seebeck effect).","Wide range, up to very high temperatures, fast response, rugged.","Needs cold junction compensation, correct extension cable and polarity. Drift with age."],
     ["RTD (Pt100)","The resistance of platinum rises predictably with temperature.","Accurate and stable from about −200 °C to 600 °C.","Use 3-wire or 4-wire to cancel lead resistance. Self-heating and vibration."],
     ["Thermistor","A semiconductor with a large resistance change (usually NTC).","Narrow ranges and high sensitivity, such as motor windings.","Strongly nonlinear. Limited range."],
     ["Infrared pyrometer","Measures thermal radiation from the surface.","Non-contact, moving or very hot targets.","Emissivity setting, dust or steam in the path, window contamination."],
     ["Bimetallic gauge","Two metals bend differently as temperature changes.","Local indication.","Moderate accuracy, mechanical wear."],
     ["Filled system","A fluid expands in a bulb and capillary.","Local or remote indication or switching without power.","Capillary damage and ambient temperature error."]
    ],
    notes:["Thermowells protect the sensor and let you swap it under pressure. Check wake frequency and stress for your process (ASME PTC 19.3 TW).","Insertion depth matters: aim for the sensor tip to sit in the flow. A short well reads the pipe wall temperature.","A thermowell slows the response. Use tapered or stepped wells and spring-loaded sensors for fast loops.","Match thermocouple type to the range and atmosphere, and use extension cable of the same type."]},
   flow:{
    t:"Flow",
    rows:[
     ["Orifice plate (DP)","Flow causes a pressure drop across a restriction. Flow is proportional to √ΔP (ISO 5167).","Clean liquids, gases and steam. Well understood and widely accepted.","Permanent pressure loss, straight run needs, limited turndown (about 3 to 4 to 1), plate wear."],
     ["Venturi or nozzle","Same principle with a smooth shape that recovers pressure.","Large lines where pressure loss matters.","Cost and size."],
     ["Averaging Pitot","Measures stagnation and static pressure across the pipe.","Large pipes, low pressure loss, retrofit.","Clean fluids only. Lower accuracy."],
     ["Vortex","A bluff body sheds vortices at a frequency proportional to velocity.","Steam, gas and liquid, no moving parts.","Minimum Reynolds number, vibration, low flow cutoff."],
     ["Turbine","A rotor spins at a speed proportional to velocity.","Clean, low-viscosity liquids, custody transfer.","Bearing wear, needs filtration."],
     ["Electromagnetic","Faraday's law: a conductive liquid moving through a magnetic field induces voltage.","Conductive liquids and slurries, full bore, no obstruction.","Not for gas or non-conductive liquids. Needs minimum conductivity (check the vendor) and good grounding."],
     ["Coriolis","Flow tubes vibrate and twist in proportion to mass flow.","Mass flow, density, custody transfer, viscous fluids.","Cost, pressure drop on small lines, installation stress."],
     ["Ultrasonic","Transit time (or Doppler) difference gives velocity.","Clean liquids (clamp-on available), multi-path gas custody meters.","Acoustic conditions, entrained gas, wall condition for clamp-on."],
     ["Thermal mass","Heat carried away from a heated sensor depends on mass flow.","Gas flow, such as compressed air, flare, biogas.","Changing gas composition and moisture."],
     ["Variable area (rotameter)","A float rises in a tapered tube until forces balance.","Local indication, small flows, purge.","Orientation, limited accuracy."]
    ],
    notes:["Gas flow needs pressure and temperature compensation to convert to mass or standard volume.","Respect the straight pipe lengths upstream and downstream. Use flow conditioners when space is limited.","Gas and liquid hammer can overrange DP cells. Specify the correct static and overrange ratings.","Selecting the flow meter is an exercise in fluid properties first: phase, viscosity, conductivity, cleanliness, temperature and pressure."]},
   level:{
    t:"Level",
    rows:[
     ["Hydrostatic or DP","Pressure at the bottom equals ρ × g × h.","Tanks and vessels, closed vessels with a DP transmitter.","Density changes shift the reading. Wet legs need care (fill, condensate, freezing)."],
     ["Guided wave radar","A pulse travels down a probe and reflects from the surface.","Level and interface, independent of density.","Build-up on the probe, dielectric of the product, probe selection."],
     ["Non-contact radar","Microwave pulses or FMCW from above.","Storage tanks, corrosive or sticky media.","Foam, obstructions and nozzle effects. Use still pipes where needed."],
     ["Ultrasonic","Time for a sound pulse to return from the surface.","Open tanks, sumps, wastewater.","Vapour, foam, dust, temperature gradients."],
     ["Displacer","The buoyant force on a displacer equals the weight of displaced liquid (Archimedes).","Level, interface and density in cages or tanks.","Density changes, cage connections and fouling."],
     ["Float and magnetic gauge","A float with magnets in a chamber moves an external indicator.","Reliable local indication, with switches or transmitters.","Clean fluid, density limits, magnetite build-up."],
     ["Capacitance","The probe capacitance depends on how much liquid or solid covers it.","Continuous or point level, clean fluids and solids.","Coating and changing dielectric."],
     ["Vibrating fork","A fork's vibration changes when it is covered.","Point level switches (high and low alarms).","Heavy build-up of sticky product."],
     ["Nuclear gauge","Gamma radiation attenuates as it passes through material.","Extreme or non-invasive applications.","Licensing and regulation."]
    ],
    notes:["For a trip or SIF, use an independent sensor and process connection, not the one used by the control loop.","Level switches test a physical point and are simple to proof test. Transmitters give trend and diagnostics.","Check the density at operating temperature, not at ambient, when converting DP to level.","Foam, agitation and turbulence affect almost every principle."]},
   analysis:{
    t:"Analysis",
    rows:[
     ["pH and ORP","A glass electrode develops a voltage related to hydrogen ion activity.","Water treatment, chemical processes.","Fouling, reference drift, regular calibration with buffers."],
     ["Conductivity","Measures how well the liquid carries current.","Water quality, concentration, interface detection.","Temperature compensation, cell fouling."],
     ["Oxygen (zirconia)","A heated zirconia cell produces voltage from the oxygen difference.","Flue gas O₂ for combustion control.","Heated cell, sample conditioning, poisoning."],
     ["Gas chromatograph","Separates and measures components of a gas sample.","Composition, heating value, custody transfer.","Sample conditioning, carrier gas supply, cycle time."],
     ["Combustible gas detector","Catalytic bead or infrared sensing of hydrocarbons as % LEL.","Fire and gas systems around hydrocarbon equipment.","Catalytic beads can be poisoned (silicones, H₂S). Infrared needs gases that absorb in the band."],
     ["Toxic gas (electrochemical)","A chemical cell produces a current proportional to gas concentration.","H₂S, CO, Cl₂ in ppm.","Cell life, cross-sensitivity, regular calibration."],
     ["Moisture or dew point","Capacitive or chilled-mirror sensing of water content.","Gas dehydration, instrument air.","Sample lines can add or remove moisture."]
    ],
    notes:["Analysers live or die by the sample system: tapping point, filtering, pressure reduction, transport lag and drain.","Check the response time of the whole chain including sample lag, not only the sensor.","Calibration gas and maintenance access are part of the design, not an afterthought.","Fire and gas detection layout should follow a documented mapping study."]},
   position:{
    t:"Vibration and position",
    rows:[
     ["Eddy current probe","Measures gap to a conductive target without contact.","Shaft vibration and axial position on rotating machines (API 670).","Target material and surface finish, runout, probe cable length matched to the driver."],
     ["Velocity sensor","A coil moves in a magnetic field to give velocity.","Casing vibration on pumps, fans and motors.","Frequency range and mounting."],
     ["Accelerometer","A piezoelectric crystal gives acceleration.","Bearings, gearboxes, high frequencies.","Mounting and cable noise."],
     ["LVDT","A moving core changes coupling between coils.","Linear displacement and valve position.","Core alignment and supply."],
     ["Encoder or resolver","Digital or analog angular position.","Rotary position, speed.","Resolution and environment."],
     ["Inductive proximity (NAMUR)","A coil detects a metal target.","Position confirmation on valves and doors.","Sensing distance, correct target, wiring to NE 8.2 V barrier."]
    ],
    notes:["Overall vibration trends often tell you more than any single value. Compare against ISO 20816 zones and the OEM limits.","A keyphasor reference lets you get phase and orders from a vibration signal.","Valve position feedback is usually the only check that a command was actually executed. Treat it as part of the loop."]}
  };
  var host=$("#measBody"),tabs=$$("#measTabs [role=tab]");
  function render(k){var d=M[k];
    host.innerHTML='<div class="block"><h3>'+d.t+' measurement</h3><div class="tablewrap" style="margin-top:12px"><table><thead><tr><th>Technology</th><th>How it works</th><th>Good for</th><th>Watch for</th></tr></thead><tbody>'+
      d.rows.map(function(r){return '<tr><td><b>'+esc(r[0])+'</b></td><td>'+esc(r[1])+'</td><td>'+esc(r[2])+'</td><td>'+esc(r[3])+'</td></tr>'}).join("")+'</tbody></table></div></div>'+
      '<div class="block"><h3>Field notes</h3><ul class="dots" style="margin-top:10px">'+d.notes.map(function(n){return '<li>'+esc(n)+'</li>'}).join("")+'</ul></div>'}
  makeTabs($("#measTabs"),render);render("pressure");
})();

/* ---------- 4-20 mA scaler ---------- */
(function(){
  var lrv=$("#scLrv"),urv=$("#scUrv"),ma=$("#scMa"),pc=$("#scPct"),en=$("#scEng"),zones=$("#scZones"),out=$("#scNote");
  function zone(i){var z=i<3.6?1:(i<3.8?2:(i<=20.5?3:(i<=21?4:5)));$$("div",zones).forEach(function(d,k){d.classList.toggle("on",k+1===z)});
    out.textContent=["Below 3.6 mA: failure signal (low) per NAMUR NE 43. Treat as a bad transmitter or broken wire.","Between 3.6 and 3.8 mA: under-range, measurement below 0%.","Measuring range: 3.8 to 20.5 mA.","Between 20.5 and 21 mA: over-range, measurement above 100%.","Above 21 mA: failure signal (high) per NAMUR NE 43."][z-1]}
  function fromMa(){var i=+ma.value||0,p=(i-4)/16*100,L=+lrv.value||0,U=+urv.value||0;pc.value=+p.toFixed(3);en.value=+(L+p/100*(U-L)).toFixed(4);zone(i)}
  function fromPct(){var p=+pc.value||0,L=+lrv.value||0,U=+urv.value||0;ma.value=+(4+p/100*16).toFixed(4);en.value=+(L+p/100*(U-L)).toFixed(4);zone(4+p/100*16)}
  function fromEng(){var L=+lrv.value||0,U=+urv.value||0,v=+en.value||0,p=U===L?0:(v-L)/(U-L)*100;pc.value=+p.toFixed(3);ma.value=+(4+p/100*16).toFixed(4);zone(4+p/100*16)}
  ma.addEventListener("input",fromMa);pc.addEventListener("input",fromPct);en.addEventListener("input",fromEng);lrv.addEventListener("input",fromMa);urv.addEventListener("input",fromMa);
  fromMa();
})();

/* ---------- DP level ---------- */
(function(){
  var ids=["dlRho","dlMin","dlMax","dlElev"],E={};ids.forEach(function(i){E[i]=$("#"+i)});
  function run(){
    var rho=+E.dlRho.value||0,hm=+E.dlMin.value||0,hx=+E.dlMax.value||0,e=+E.dlElev.value||0,g=9.80665;
    var lo=rho*g*(hm+e)/100,hi=rho*g*(hx+e)/100;
    $("#dlOut").innerHTML='<div class="kv"><span>Lower range value (0%)</span><b>'+fmt(lo,2)+' mbar</b><span>Upper range value (100%)</span><b>'+fmt(hi,2)+' mbar</b><span>Span</span><b>'+fmt(hi-lo,2)+' mbar</b><span>In kPa</span><b>'+fmt(lo/10,3)+' to '+fmt(hi/10,3)+'</b><span>In inH₂O (approx.)</span><b>'+fmt(lo/2.49089,1)+' to '+fmt(hi/2.49089,1)+'</b></div>';
  }
  ids.forEach(function(i){E[i].addEventListener("input",run)});run();
})();

/* ---------- orifice flow ---------- */
(function(){
  var q=$("#orQmax"),d=$("#orDpmax"),x=$("#orDp");
  function run(){var Q=+q.value||0,D=+d.value||1,dp=+x.value||0,pct=Math.sqrt(Math.max(dp,0)/D)*100;
    $("#orOut").innerHTML='<div class="kv"><span>Differential pressure</span><b>'+fmt(dp/D*100,1)+'% of range</b><span>Flow</span><b>'+fmt(pct,1)+'% of range</b><span>Flow rate</span><b>'+fmt(Q*pct/100,2)+'</b></div>'+
      '<p class="note" style="margin-top:10px">At 10% flow the DP is only 1% of range. Many systems apply a low-flow cutoff (for example below 1 to 2% of DP) so that noise at zero flow does not show as flow.</p>'}
  [q,d,x].forEach(function(e){e.addEventListener("input",run)});run();
})();

/* ---------- Cv ---------- */
(function(){
  var q=$("#cvQ"),s=$("#cvSg"),p=$("#cvDp");
  function run(){var Q=+q.value||0,SG=+s.value||1,dp=+p.value||0,kv=dp>0?Q*Math.sqrt(SG/dp):NaN,cv=kv*1.156;
    $("#cvOut").innerHTML='<div class="kv"><span>Required Kv</span><b>'+fmt(kv,2)+'</b><span>Required Cv (US)</span><b>'+fmt(cv,2)+'</b></div><p class="note" style="margin-top:10px">Simple turbulent, non-choked liquid formula. Real sizing (IEC 60534-2-1, ISA 75.01.01) adds pipe reducer, viscosity, cavitation, flashing and noise checks. Pick the valve so the required Cv falls well inside its travel at minimum and maximum flow.</p>'}
  [q,s,p].forEach(function(e){e.addEventListener("input",run)});run();
})();

/* ---------- RTD ---------- */
(function(){
  var A=3.9083e-3,B=-5.775e-7,Cc=-4.183e-12,t=$("#rtT"),r=$("#rtR");
  function rOf(T){return T>=0?100*(1+A*T+B*T*T):100*(1+A*T+B*T*T+Cc*(T-100)*T*T*T)}
  function tOf(R){if(R>=100){var q=A*A-4*B*(1-R/100);return (-A+Math.sqrt(q))/(2*B)}var T=-50;for(var i=0;i<60;i++){var f=rOf(T)-R,d=(rOf(T+0.001)-rOf(T-0.001))/0.002;T-=f/d}return T}
  t.addEventListener("input",function(){r.value=+rOf(+t.value||0).toFixed(3)});
  r.addEventListener("input",function(){var R=+r.value;if(R>=18&&R<=400)t.value=+tOf(R).toFixed(2)});
  r.value=+rOf(+t.value).toFixed(3);
})();

/* ---------- converters ---------- */
(function(){
  var U=[["bar",1e5],["kPa",1e3],["MPa",1e6],["psi",6894.757],["kg/cm²",98066.5],["atm",101325],["mmHg (torr)",133.322],["mmH₂O",9.80665],["inH₂O",249.089]];
  var v=$("#pcVal"),f=$("#pcFrom");
  f.innerHTML=U.map(function(u,i){return '<option value="'+i+'">'+u[0]+'</option>'}).join("");
  function run(){var pa=(+v.value||0)*U[+f.value][1];$("#pcOut").innerHTML='<div class="kv">'+U.map(function(u){return '<span>'+u[0]+'</span><b>'+fmt(pa/u[1],4)+'</b>'}).join("")+'</div>'}
  v.addEventListener("input",run);f.addEventListener("change",run);run();
  var c=$("#tcC"),fa=$("#tcF"),k=$("#tcK");
  c.addEventListener("input",function(){var C=+c.value||0;fa.value=+(C*9/5+32).toFixed(2);k.value=+(C+273.15).toFixed(2)});
  fa.addEventListener("input",function(){var F=+fa.value||0,C=(F-32)*5/9;c.value=+C.toFixed(2);k.value=+(C+273.15).toFixed(2)});
  k.addEventListener("input",function(){var K=+k.value||0,C=K-273.15;c.value=+C.toFixed(2);fa.value=+(C*9/5+32).toFixed(2)});
})();

/* ---------- loop power ---------- */
(function(){
  var ids=["lpVs","lpVmin","lpRx","lpRc","lpVd"],E={};ids.forEach(function(i){E[i]=$("#"+i)});
  function run(){
    var vs=+E.lpVs.value||0,vm=+E.lpVmin.value||0,rx=+E.lpRx.value||0,rc=+E.lpRc.value||0,vd=+E.lpVd.value||0,I=0.022;
    var req=vm+I*(rx+rc)+vd,mar=vs-req,rmax=(vs-vm-vd)/I,ok=mar>=0;
    $("#lpOutP").innerHTML='<div class="kv"><span>Required supply at 22 mA</span><b>'+fmt(req,2)+' V</b><span>Available supply</span><b>'+fmt(vs,2)+' V</b><span>Margin</span><b>'+fmt(mar,2)+' V</b><span>Maximum external resistance</span><b>'+fmt(rmax,0)+' Ω</b></div><p style="margin-top:10px"><span class="pill '+(ok?"ok":"bad")+'">'+(ok?"LOOP POWER OK":"NOT ENOUGH VOLTAGE")+'</span></p>';
  }
  ids.forEach(function(i){E[i].addEventListener("input",run)});run();
})();

/* ---------- valve characteristics ---------- */
(function(){
  var svg=$("#vcSvg"),sel="eq",L=50,Tp=14,PW=520,PH=250,R=50;
  var CH={lin:{n:"Linear",f:function(x){return x},col:"var(--sky)",d:"Flow changes in proportion to travel. Fits loops where the pressure drop stays roughly constant across the valve."},
          eq:{n:"Equal percentage",f:function(x){return Math.pow(R,x-1)},col:"var(--accent)",d:"Each equal step in travel gives the same percentage change in flow. Common when valve pressure drop falls as flow rises, because the installed curve ends up close to linear."},
          qo:{n:"Quick opening",f:function(x){return Math.sqrt(x)},col:"var(--ok)",d:"Most of the flow comes with the first part of the travel. Used for on/off and relief service rather than precise control."}};
  function X(x){return L+x*PW}function Y(q){return Tp+PH-q*PH}
  function draw(){
    var s="";
    for(var i=0;i<=10;i++){var v=i/10;s+='<line x1="'+X(v)+'" y1="'+Tp+'" x2="'+X(v)+'" y2="'+(Tp+PH)+'" stroke="var(--line)"/><text x="'+X(v)+'" y="'+(Tp+PH+16)+'" text-anchor="middle">'+i*10+'</text><line x1="'+L+'" y1="'+Y(v)+'" x2="'+(L+PW)+'" y2="'+Y(v)+'" stroke="var(--line)"/><text x="'+(L-8)+'" y="'+(Y(v)+4)+'" text-anchor="end">'+i*10+'</text>'}
    s+='<text x="'+(L+PW/2)+'" y="'+(Tp+PH+34)+'" text-anchor="middle" style="fill:var(--ink)">Valve travel, %</text><text transform="translate(12 '+(Tp+PH/2)+') rotate(-90)" text-anchor="middle" style="fill:var(--ink)">Flow, % of maximum</text>';
    Object.keys(CH).forEach(function(k){var c=CH[k],d="";for(var j=0;j<=100;j++){var x=j/100;d+=(j?"L":"M")+X(x).toFixed(1)+" "+Y(c.f(x)).toFixed(1)}
      s+='<path d="'+d+'" fill="none" stroke="'+c.col+'" stroke-width="'+(k===sel?4:1.6)+'" opacity="'+(k===sel?1:.45)+'"/>'});
    var tr=+$("#vcTravel").value/100,q=CH[sel].f(tr);
    s+='<line x1="'+X(tr)+'" y1="'+Tp+'" x2="'+X(tr)+'" y2="'+(Tp+PH)+'" stroke="var(--ink)" stroke-dasharray="4 3"/><circle cx="'+X(tr)+'" cy="'+Y(q)+'" r="6" fill="'+CH[sel].col+'" stroke="var(--surface)" stroke-width="2"/>';
    svg.innerHTML=s;
    $("#vcDesc").innerHTML='<b>'+CH[sel].n+'.</b> '+esc(CH[sel].d)+' At '+Math.round(tr*100)+'% travel the inherent flow is <b>'+(q*100).toFixed(1)+'%</b>.';
  }
  $$("#vcSeg button").forEach(function(b){b.addEventListener("click",function(){sel=b.dataset.k;$$("#vcSeg button").forEach(function(x){x.setAttribute("aria-pressed",x===b?"true":"false")});draw()})});
  $("#vcTravel").addEventListener("input",draw);draw();
})();

/* ---------- loop anatomy ---------- */
(function(){
  var N={
   proc:{t:"Process",d:"The thing you want to control: a tank level, a line pressure, a furnace temperature. Its dynamics (gain, time constant, dead time) decide how hard the loop is to tune."},
   sens:{t:"Sensor and transmitter",d:"Measures the process variable and sends it as a 4–20 mA, HART, fieldbus or wireless signal. Accuracy, damping, range and location all affect the loop. A noisy or slow measurement limits what the controller can do."},
   ctrl:{t:"Controller",d:"Compares the measurement with the setpoint and calculates an output. Most often PID in a DCS or PLC. Add features such as anti-windup, output limits, setpoint ramping, bumpless transfer and alarms."},
   valve:{t:"Final element",d:"Usually a control valve with positioner, or a variable speed drive. Stiction, backlash, sizing and characteristic matter as much as the tuning. Check fail position and stroke time."}};
  $$("#nodeRow .node").forEach(function(b){b.addEventListener("click",function(){$$("#nodeRow .node").forEach(function(x){x.setAttribute("aria-pressed",x===b?"true":"false")});var n=N[b.dataset.k];$("#nodeDesc").innerHTML='<b>'+n.t+'.</b> '+esc(n.d)})});
  $("#nodeDesc").innerHTML='<b>'+N.sens.t+'.</b> '+esc(N.sens.d);
})();

/* ---------- deadband demo ---------- */
(function(){
  var cv=$("#dbCv"),ctx=cv.getContext("2d"),sl=$("#dbWidth"),W=0,H=0,t0=0,last=performance.now(),vis=true,running=false;
  var LIM=80,SPAN=40;
  function nz(t){return 0.55*Math.sin(t*7.3)+0.45*Math.sin(t*13.1+1)+0.35*Math.sin(t*23.7+2)}
  function sig(t){return 80+3.2*Math.sin(t*0.45)+1.6*nz(t)}
  function size(){var r=cv.getBoundingClientRect(),d=Math.min(window.devicePixelRatio||1,2);W=r.width;H=r.height;cv.width=Math.round(W*d);cv.height=Math.round(H*d);ctx.setTransform(d,0,0,d,0,0)}
  function draw(){
    var db=+sl.value,L=40,R=10,T=10,B=22,pw=W-L-R,ph=H-T-B,y0=72,y1=88;
    function X(i,n){return L+i/n*pw}function Y(v){return T+ph-(v-y0)/(y1-y0)*ph}
    ctx.clearRect(0,0,W,H);ctx.font="11px 'DM Mono', monospace";
    var cs=getComputedStyle(document.documentElement),line=cs.getPropertyValue("--line").trim()||"#ccc",ink=cs.getPropertyValue("--ink").trim()||"#000",mut=cs.getPropertyValue("--muted").trim()||"#666",acc=cs.getPropertyValue("--accent").trim()||"#c40",sky=cs.getPropertyValue("--sky").trim()||"#36c",bad=cs.getPropertyValue("--bad").trim()||"#c33";
    ctx.strokeStyle=line;ctx.fillStyle=mut;ctx.lineWidth=1;
    [72,76,80,84,88].forEach(function(v){ctx.beginPath();ctx.moveTo(L,Y(v));ctx.lineTo(L+pw,Y(v));ctx.stroke();ctx.textAlign="right";ctx.fillText(v,L-6,Y(v)+4)});
    ctx.fillStyle="rgba(179,62,15,.12)";ctx.fillRect(L,Y(LIM),pw,Y(LIM-db)-Y(LIM));
    ctx.strokeStyle=acc;ctx.setLineDash([6,4]);ctx.beginPath();ctx.moveTo(L,Y(LIM));ctx.lineTo(L+pw,Y(LIM));ctx.stroke();ctx.beginPath();ctx.moveTo(L,Y(LIM-db));ctx.lineTo(L+pw,Y(LIM-db));ctx.stroke();ctx.setLineDash([]);
    var n=400,st=false,trans=0,pts=[],al=[];
    for(var i=0;i<=n;i++){var tt=t0+i/n*SPAN,v=sig(tt);if(!st&&v>LIM){st=true;trans++}else if(st&&v<LIM-db){st=false;trans++}pts.push(v);al.push(st)}
    ctx.lineWidth=2;ctx.strokeStyle=sky;ctx.beginPath();pts.forEach(function(v,i){var x=X(i,n),y=Y(clamp(v,y0,y1));if(i)ctx.lineTo(x,y);else ctx.moveTo(x,y)});ctx.stroke();
    ctx.fillStyle=bad;al.forEach(function(a,i){if(a)ctx.fillRect(X(i,n),T+ph+6,pw/n+0.6,6)});
    ctx.fillStyle=mut;ctx.textAlign="left";ctx.fillText("alarm active",L,H-1);
    $("#dbCount").textContent=trans;$("#dbWV").textContent=db.toFixed(1);
    $("#dbMsg").textContent=trans>12?"Chattering. An operator would silence this and ignore it next time.":(trans>4?"Better, but still more state changes than a human can use.":"Calm. The alarm sets once and clears once.")
  }
  function frame(now){var dt=Math.min(0.1,(now-last)/1000);last=now;if(!reduce)t0+=dt;draw();if(vis&&!document.hidden)requestAnimationFrame(frame);else running=false}
  function go(){if(!running){running=true;last=performance.now();requestAnimationFrame(frame)}}
  sl.addEventListener("input",function(){if(reduce)draw()});
  if("IntersectionObserver" in window){new IntersectionObserver(function(e){vis=e[0].isIntersecting;if(vis)go()}).observe(cv)}
  document.addEventListener("viewshown",function(e){if(e.detail==="loops"){size();go()}});
  window.addEventListener("resize",function(){size();draw()});
  size();draw();go();
})();
