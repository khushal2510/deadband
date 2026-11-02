/* Desk: project workflow, standards, glossary */
(function(){
  var PH=[
   {n:"Concept and FEED",s:"Front end",d:"Define scope and philosophy before drawings multiply.",out:["Control and safety philosophies","Preliminary instrument index and I/O estimate","P&ID development and review","HAZID, early HAZOP and SIL target setting","Selection of control system, SIS and fieldbus strategy","Cost estimate and long-lead items (analysers, large valves, packages)"],tip:"Decisions made here, such as the number of I/O or the bus architecture, are cheap to change now and very expensive later."},
   {n:"Detail design",s:"Engineering",d:"Turn the philosophy into the document set that builds the plant.",out:["Instrument index and datasheets","I/O list and hook-up drawings","Loop diagrams and cable schedules","Cause and effect matrices","Logic diagrams and alarm and trip schedules","Junction box and marshalling design","Hazardous area compliance and SIL verification"],tip:"Keep one master instrument index. Every other document should pull from it so tags never disagree."},
   {n:"Procurement",s:"Buying",d:"Specify, enquire, evaluate and place orders.",out:["Requisitions with datasheets","Technical bid evaluation","Vendor document review against the VDRL","Inspection and expediting plan","Packages: compressors, skids, analyser houses"],tip:"Vendor drawings are late more often than not. Track them weekly against the VDRL."},
   {n:"Fabrication and FAT",s:"Factory",d:"Build and test panels and packages before they ship.",out:["Panel and cabinet FAT procedure","Software FAT with simulated I/O","SIS FAT against the SRS","Skid and package FAT witnessed by the client"],tip:"Find mistakes at the factory, where a fix takes an hour, not at site, where it takes a week."},
   {n:"Construction",s:"Site",d:"Install instruments, cables and panels.",out:["Installation inspection of instruments and impulse lines","Cable pulling, glanding and termination","Ex inspection records","Pre-commissioning: loop and continuity checks"],tip:"Walk the plant with the hook-up drawings. Many orientation and impulse line problems are obvious on site."},
   {n:"Commissioning",s:"Start-up",d:"Prove every loop, interlock and shutdown.",out:["Loop checks from the field to the screen","Valve stroke tests and positioner calibration","Function tests of C&E and interlocks","SIS validation and proof test baseline","Loop tuning and alarm tuning","Punch list close-out"],tip:"Test the failure modes (loss of air, loss of signal, power failure), not just the normal operation."},
   {n:"Handover",s:"Close-out",d:"Hand a plant that can be maintained.",out:["As-built drawings and documents","Calibration certificates and datasheet updates","Spare parts lists and manuals","Training for operators and maintainers","MOC process and document control handover"],tip:"As-builts are only useful if they match the plant. Reserve time for the final redline update."}
  ];
  var host=$("#phBtns"),out=$("#phOut");if(!host)return;
  host.innerHTML=PH.map(function(p,i){return '<button class="phase-btn" type="button" data-i="'+i+'" aria-pressed="'+(i===1)+'">'+esc(p.n)+'<small>'+esc(p.s)+'</small></button>'}).join("");
  function show(i){var p=PH[i];$$(".phase-btn",host).forEach(function(b){b.setAttribute("aria-pressed",b.dataset.i==i?"true":"false")});
    out.innerHTML='<h3 style="font:400 1.8rem/1.1 var(--font-display)">'+esc(p.n)+'</h3><p class="muted" style="margin:4px 0 14px">'+esc(p.d)+'</p><div class="two"><div><h4 style="margin-bottom:8px">I&amp;C outputs</h4><ul class="dots">'+p.out.map(function(o){return '<li>'+esc(o)+'</li>'}).join("")+'</ul></div><div class="out"><h4>Practical tip</h4><p>'+esc(p.tip)+'</p></div></div>'}
  host.addEventListener("click",function(e){var b=e.target.closest(".phase-btn");if(b)show(+b.dataset.i)});show(1);
})();

(function(){
  var S=[
   ["API 617","Machinery","Axial and centrifugal compressors and expander-compressors for petroleum, chemical and gas industry services."],
   ["API 618","Machinery","Reciprocating compressors for petroleum, chemical and gas industry services."],
   ["API 619","Machinery","Rotary-type positive displacement compressors, including screw machines. Check the edition for dry and oil-flooded scope."],
   ["API 610 / ISO 13709","Machinery","Centrifugal pumps for petroleum, petrochemical and natural gas industries."],
   ["API 682 / ISO 21049","Machinery","Shaft sealing systems for centrifugal and rotary pumps, including seal flush plans."],
   ["API 612 / API 611","Machinery","Special-purpose and general-purpose steam turbines."],
   ["API 616","Machinery","Gas turbines for petroleum, chemical and gas industry services."],
   ["API 541 / API 546","Machinery","Large induction motors and brushless synchronous machines."],
   ["API 670","Machinery","Machinery protection systems: vibration, axial position, bearing temperature, speed monitoring."],
   ["API 614 / ISO 10438","Machinery","Lubrication, shaft-sealing and control-oil systems and auxiliaries."],
   ["API 692","Machinery","Dry gas sealing systems for axial, centrifugal and rotary screw compressors."],
   ["ISO 20816 series","Machinery","Measurement and evaluation of machine vibration."],
   ["IEC 61508","Safety","Functional safety of electrical, electronic and programmable electronic safety-related systems."],
   ["IEC 61511 / ISA-84","Safety","Functional safety: safety instrumented systems for the process industry sector."],
   ["IEC 61882","Safety","HAZOP studies: application guide."],
   ["CCPS LOPA","Safety","Layer of Protection Analysis: simplified process risk assessment, from the Center for Chemical Process Safety."],
   ["ISA-TR84.00.02","Safety","Safety Instrumented Functions (SIF): safety integrity level evaluation techniques."],
   ["API 520 / 521 / 526","Safety","Sizing and selection of pressure-relieving devices, relief and depressuring systems, flanged relief valves."],
   ["API RP 14C","Safety","Analysis, design, installation and testing of basic surface safety systems for offshore production platforms."],
   ["API 2350","Safety","Overfill protection for storage tanks in petroleum facilities."],
   ["NFPA 85 / NFPA 86 / EN 746-2","Safety","Boiler and combustion system hazards, ovens and furnaces, and safety requirements for combustion in thermoprocessing equipment."],
   ["IEC 60079 series","Hazardous area","Explosive atmospheres: general requirements (-0), flameproof (-1), increased safety (-7), intrinsic safety (-11), classification (-10-1), installation (-14), inspection (-17)."],
   ["ATEX 2014/34/EU","Hazardous area","EU directive for equipment and protective systems in explosive atmospheres. Directive 1999/92/EC covers the workplace."],
   ["IECEx","Hazardous area","International certification scheme for Ex equipment, services and personnel."],
   ["NEC 500 / 505 (NFPA 70)","Hazardous area","North American hazardous location rules: Class and Division, and the Zone system."],
   ["ISA-5.1","Instruments","Instrumentation symbols and identification: tag letters and P&ID symbols."],
   ["ISA-5.2 / ISA-5.4","Instruments","Binary logic diagrams for process operations, and instrument loop diagrams."],
   ["ISO 5167","Instruments","Measurement of fluid flow by pressure differential devices in full conduits: orifice, nozzle and Venturi."],
   ["AGA 3 / 9 / 11, API MPMS","Instruments","Gas and oil measurement: orifice metering, multipath ultrasonic meters, Coriolis meters and the Manual of Petroleum Measurement Standards."],
   ["IEC 60751 / IEC 60584","Instruments","Industrial platinum resistance thermometers, and thermocouple tolerances and EMF."],
   ["ASME PTC 19.3 TW","Instruments","Thermowells: performance test code, including wake frequency and stress checks."],
   ["IEC 60534 / ISA-75.01","Instruments","Industrial-process control valves: terminology, flow capacity sizing equations, noise."],
   ["API 551 / API 554","Instruments","Process measurement, and process instrumentation and control, for refineries and similar plants."],
   ["IEC 60529 / NEMA 250","Instruments","Degrees of protection of enclosures: IP code and NEMA types."],
   ["ISO 15156 / NACE MR0175","Instruments","Materials for use in H₂S-containing environments in oil and gas production."],
   ["NAMUR NE 43 / NE 107","Systems","Signal levels for failure information of transmitters, and self-monitoring and diagnosis of field devices."],
   ["IEC 61131-3","Systems","Programming languages for programmable controllers."],
   ["IEC 61158 / IEC 61784","Systems","Industrial communication networks: fieldbus specifications and profiles."],
   ["IEC 62591","Systems","WirelessHART: wireless communication network for industrial process automation."],
   ["IEC 62541","Systems","OPC Unified Architecture for industrial interoperability."],
   ["ISA-18.2 / IEC 62682","Alarms and cyber","Management of alarm systems for the process industries."],
   ["EEMUA 191","Alarms and cyber","Alarm systems: a guide to design, management and procurement."],
   ["ISA-101","Alarms and cyber","Human-machine interfaces for process automation systems."],
   ["IEC 62443","Alarms and cyber","Security for industrial automation and control systems."]
  ];
  var cats=["All"].concat(S.map(function(x){return x[1]}).filter(function(v,i,a){return a.indexOf(v)===i}));
  var tl=$("#stdTabs");if(!tl)return;
  tl.innerHTML=cats.map(function(c,i){return '<button class="tab" role="tab" data-key="'+esc(c)+'" aria-selected="'+(i===0)+'">'+esc(c)+'</button>'}).join("");
  var list=$("#stdList");
  function render(k){list.innerHTML=S.filter(function(x){return k==="All"||x[1]===k}).map(function(x){return '<div><div class="cat">'+esc(x[1])+'</div><b>'+esc(x[0])+'</b><p>'+esc(x[2])+'</p></div>'}).join("")}
  makeTabs(tl,render);render("All");

  var GL=[
   ["Accuracy","How close a measurement is to the true value, often given as % of span or % of reading."],
   ["AIT","Auto-ignition temperature: the temperature at which a gas ignites without a spark."],
   ["ALARP","As low as reasonably practicable."],
   ["API","American Petroleum Institute, publisher of many oil and gas equipment standards."],
   ["ATEX","EU directives for equipment and workplaces with explosive atmospheres."],
   ["BMS","Burner management system: safety logic for starting, running and shutting down burners."],
   ["BPCS","Basic process control system: the normal control layer, for example a DCS or PLC."],
   ["C&E","Cause and effect matrix: which input trips which output."],
   ["Cavitation","Vapour bubbles forming and collapsing in a liquid where pressure falls below vapour pressure, damaging valves and pumps."],
   ["CJC","Cold junction compensation for thermocouples."],
   ["CRS","Comment resolution sheet: tracks client comments and your replies."],
   ["Cv / Kv","Valve flow coefficients. Cv in US gpm at 1 psi drop for water, Kv in m³/h at 1 bar drop. Cv ≈ 1.156 × Kv."],
   ["DCS","Distributed control system."],
   ["Deadband","Range through which an input can change without the output responding."],
   ["Dead time","Delay between a change at the input and the first response at the output. A major limit on loop tuning."],
   ["DGS","Dry gas seal on a compressor shaft."],
   ["Drift","Slow change of an instrument reading over time with no change in the input."],
   ["EPL","Equipment protection level (Ga, Gb, Gc for gas) matching zones 0, 1 and 2."],
   ["ESD / ESDV","Emergency shutdown, and the emergency shutdown valve."],
   ["FAT / SAT","Factory acceptance test and site acceptance test."],
   ["F&G","Fire and gas detection and protection system."],
   ["Feedforward","Control that acts on a measured disturbance before it affects the process variable."],
   ["FIT","Failures in time: one failure per 10⁹ hours."],
   ["Flashing","Liquid turning into vapour downstream of a valve because pressure stays below vapour pressure. Causes erosion and choked flow."],
   ["HART","Highway Addressable Remote Transducer: digital communication over 4–20 mA wiring."],
   ["HAZID","Hazard identification study, usually early in design."],
   ["HAZOP","Hazard and operability study using guide words on process nodes."],
   ["HFT","Hardware fault tolerance: faults a subsystem can survive and still perform its function."],
   ["HIPPS","High integrity pressure protection system."],
   ["HMI","Human-machine interface: the operator screens."],
   ["Hysteresis","Difference in output for the same input when approached from above versus from below."],
   ["I/P converter","Converts a 4–20 mA signal to a pneumatic pressure signal, usually 0.2 to 1 bar (3 to 15 psi)."],
   ["IFA / IFC / IFR","Issued for approval, for construction, for review."],
   ["IP code","Ingress protection rating, for example IP65."],
   ["IPL","Independent protection layer used in LOPA."],
   ["IS","Intrinsic safety: protection by limiting electrical energy."],
   ["JB","Junction box."],
   ["KO drum","Knock-out drum: a scrubber that removes liquids ahead of a compressor or flare."],
   ["LEL","Lower explosive limit: the lowest concentration of a flammable gas in air that can burn."],
   ["LOPA","Layer of protection analysis: a semi-quantitative risk method."],
   ["LRV / URV","Lower and upper range value: the process values that correspond to 4 and 20 mA."],
   ["MCS","Maximum continuous speed."],
   ["MDMT","Minimum design metal temperature."],
   ["MOC","Management of change."],
   ["MW","Molecular weight of the gas. It shifts the compressor map."],
   ["NPSH","Net positive suction head: the pressure margin at a pump inlet above the vapour pressure."],
   ["OPC UA","Open Platform Communications Unified Architecture: a vendor-neutral industrial data standard."],
   ["P&ID","Piping and instrumentation diagram."],
   ["PFDavg","Average probability of failure on demand over the proof test interval."],
   ["PFH","Probability of dangerous failure per hour, for high demand and continuous mode."],
   ["PLC","Programmable logic controller."],
   ["Proof test","A periodic test that reveals dangerous undetected failures in a safety function."],
   ["PSV","Pressure safety valve, the relief valve."],
   ["Rangeability / turndown","Ratio of maximum to minimum value that can be measured or controlled accurately."],
   ["Repeatability","The closeness of agreement between repeated measurements of the same input under the same conditions."],
   ["RRF","Risk reduction factor: 1 / PFDavg."],
   ["RTD","Resistance temperature detector, such as Pt100."],
   ["RTU","Remote terminal unit, often used in SCADA for remote sites."],
   ["SCADA","Supervisory control and data acquisition."],
   ["SFF","Safe failure fraction: share of failures that are safe or detected."],
   ["SIF","Safety instrumented function: one specific protective function with a SIL."],
   ["SIL","Safety integrity level 1 to 4, a band of risk reduction."],
   ["SIS","Safety instrumented system: the set of SIFs and their hardware."],
   ["SOE","Sequence of events: time-stamped record of what happened and in which order."],
   ["Span","Difference between the upper and lower range values."],
   ["SRS","Safety requirements specification."],
   ["Stiction","Static friction in a valve that makes it stick, then jump, which causes limit cycles in a loop."],
   ["Surge","Flow reversal in a centrifugal compressor at low flow, causing violent pulsations."],
   ["Stonewall","Choke: the maximum flow limit on the right of the compressor map."],
   ["TQ","Technical query raised to the client or vendor."],
   ["UCP","Unit control panel on a package such as a compressor skid."],
   ["VDRL","Vendor document requirement list."],
   ["VFD","Variable frequency drive."],
   ["Vi","Built-in volume ratio of a screw compressor."],
   ["Wet leg / dry leg","Impulse line filled with liquid (wet) or gas (dry) in a closed-vessel DP level measurement."],
   ["Windup","Integral action continuing to build while the output is saturated, causing large overshoot afterwards. Prevented by anti-windup."],
   ["1oo2 / 2oo3","Voting: how many channels must agree. 2oo3 needs two out of three."]
  ];
  var gl=$("#glList"),cnt=$("#glCount"),q=$("#glSearch");
  function rg(){var s=q.value.trim().toLowerCase(),f=GL.filter(function(x){return !s||x[0].toLowerCase().indexOf(s)>-1||x[1].toLowerCase().indexOf(s)>-1});
    gl.innerHTML=f.map(function(x){return '<div><b>'+esc(x[0])+'</b><p>'+esc(x[1])+'</p></div>'}).join("");
    cnt.textContent=f.length?f.length+" of "+GL.length+" terms":"No match. Try a shorter word or the acronym."}
  q.addEventListener("input",rg);rg();
})();
