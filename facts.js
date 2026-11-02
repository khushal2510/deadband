/* Fact of the day: verified, timeless instrumentation and engineering facts */
(function(){
  var F=[
    "A 4–20 mA loop uses a live zero. Zero percent is 4 mA, so a reading of 0 mA can only mean a broken wire or lost power.",
    "A Pt100 sensor reads 100 Ω at 0 °C and about 138.5 Ω at 100 °C.",
    "For an orifice plate, flow follows the square root of differential pressure. Half the flow gives a quarter of the DP.",
    "HART sends digital data over the same wires as 4–20 mA using frequency shift keying, at 1200 baud, with 1200 Hz for a one and 2200 Hz for a zero.",
    "The Bourdon tube pressure gauge goes back to Eugène Bourdon, who patented it in 1849. It is still the most common pressure gauge in the world.",
    "The Seebeck effect, the basis of every thermocouple, was reported by Thomas Johann Seebeck in 1821.",
    "A type K thermocouple produces roughly 41 microvolts per degree Celsius near room temperature.",
    "The first theoretical analysis of PID control came from Nicolas Minorsky in 1922, while studying automatic ship steering.",
    "Ziegler and Nichols published their well-known tuning rules in 1942. Many controllers are still tuned from their ideas.",
    "Piezoelectricity was discovered by Pierre and Jacques Curie in 1880.",
    "One standard atmosphere is 101.325 kPa, which is 1.01325 bar or about 14.696 psi.",
    "Light takes about 8 minutes and 20 seconds to travel from the Sun to the Earth.",
    "A signal to Mars takes between about 3 and 22 minutes one way, depending on where the planets are in their orbits. That is a lot of dead time for a control loop.",
    "Voyager 1, launched in 1977, is still sending data from interstellar space.",
    "Intrinsic safety works by limiting electrical energy so that a spark or hot surface cannot ignite the surrounding atmosphere.",
    "A Coriolis meter measures mass flow directly, and density as a bonus, from how a vibrating tube twists.",
    "An electromagnetic flowmeter works from Faraday's law, so it needs a liquid with at least a little electrical conductivity.",
    "A control valve with an equal percentage characteristic gives the same percentage change in flow for each equal step in travel.",
    "In SIL terms, a risk reduction factor of 1,000 corresponds to a PFDavg of 0.001, which is the boundary between SIL 2 and SIL 3.",
    "Thermowells are designed against vortex shedding. Wake frequency calculations (ASME PTC 19.3 TW) are there to keep the well from resonating.",
    "The pascal is named after Blaise Pascal. One pascal is a very small pressure: one newton per square metre.",
    "Alarm floods are commonly defined as more than 10 alarms in 10 minutes for one operator.",
    "A radar level transmitter measures the time for a microwave pulse to return from the surface, so density and temperature barely matter."
  ];
  var el=$("#factText"),btn=$("#factBtn");if(!el)return;
  var d=new Date(),seed=d.getFullYear()*372+d.getMonth()*31+d.getDate(),i=seed%F.length;
  function show(){el.textContent=F[i]}
  btn.addEventListener("click",function(){var n;do{n=Math.floor(Math.random()*F.length)}while(n===i);i=n;show()});
  show();
})();
