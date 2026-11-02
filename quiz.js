/* Trip detective: general instrumentation quiz */
(function(){
  var Q=[
    {q:"A deadband is:",o:["The range an input can change through without the output responding","A faulty transmitter that reads zero","The gap between two alarm priorities","A dead spot in a fieldbus segment"],a:0,e:"Deadband is the range of input change that produces no output response. It keeps valves from hunting and alarms from chattering around a limit."},
    {q:"Why does a 4–20 mA signal start at 4 mA instead of 0 mA?",o:["Cheaper transmitters","A live zero lets you tell 0% from a broken wire or lost power","Lower cable resistance","It halves the loop power needed"],a:1,e:"With a live zero, 0% is 4 mA. A reading of 0 mA can then only mean a wire break or lost power, and the same 4 mA also powers a 2-wire transmitter."},
    {q:"An orifice plate DP transmitter reads 25% of its DP range. With no square root error, what is the flow?",o:["25% of range","50% of range","75% of range","6% of range"],a:1,e:"Flow is proportional to the square root of differential pressure. √0.25 = 0.5, so the flow is 50% of range."},
    {q:"What is the resistance of a Pt100 RTD at 0 °C?",o:["10 Ω","100 Ω","138.5 Ω","1000 Ω"],a:1,e:"Pt100 means 100 Ω at 0 °C. It rises to about 138.5 Ω at 100 °C (IEC 60751, α = 0.00385)."},
    {q:"Which API standard covers machinery protection systems for vibration, axial position and bearing temperature?",o:["API 521","API 670","API 614","API 618"],a:1,e:"API 670 defines machinery protection systems. API 614 is lube and seal oil, API 618 is reciprocating compressors and API 521 is pressure relief."},
    {q:"A fuel gas shutoff valve to a furnace burner should normally fail:",o:["Open","Closed","In last position","It does not matter"],a:1,e:"On loss of air or signal the fuel should stop, so the valve is normally fail closed. The final choice comes from the hazard analysis."},
    {q:"A SIF achieves PFDavg of 5 × 10⁻³ in low demand mode. Which SIL band is that?",o:["SIL 1","SIL 2","SIL 3","SIL 4"],a:1,e:"SIL 2 covers 10⁻³ up to below 10⁻². 5 × 10⁻³ sits inside it, a risk reduction factor of 200."},
    {q:"In LOPA, can you take credit for the BPCS as an IPL when the BPCS loop is the initiating cause?",o:["Yes, always","Yes, with PFD 0.1","No, it is not independent of the initiating event","Only for SIL 1"],a:2,e:"An independent protection layer must be independent of the initiating event and of other layers. The same control loop cannot both cause and protect."},
    {q:"Which tag is a level switch, high-high?",o:["LSHH","LAHH","LTHH","LICHH"],a:0,e:"L = level, S = switch, HH = high-high. LAHH would be a level alarm high-high, a function inside a control system."},
    {q:"What does the ia in Ex ia mean?",o:["Flameproof enclosure","Intrinsic safety that tolerates two faults, giving EPL Ga","Increased safety","Pressurised enclosure"],a:1,e:"Ex ia is intrinsic safety at the highest level. It stays safe with up to two faults, which allows use in Zone 0 with EPL Ga."},
    {q:"Why does a thermocouple measurement need cold junction compensation?",o:["The wire is too long","The output depends on the temperature difference between hot and reference junctions","To linearise the sensor","To protect from noise"],a:1,e:"A thermocouple produces a voltage from the difference between its measuring junction and the reference (cold) junction at the instrument terminals. The instrument measures that terminal temperature and adds it back."},
    {q:"Flow through a centrifugal compressor falls and the recycle valve opens fast. Which controller is acting?",o:["Anti-surge controller","Speed governor","Seal gas pressure regulator","Lube oil temperature controller"],a:0,e:"The anti-surge controller watches the operating point against the surge control line and opens the recycle valve to bring flow back to the safe side."}
  ];
  var body=$("#quizBody"),n=0,score=0,order=Q.map(function(_,i){return i});
  function shuffle(){for(var i=order.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=order[i];order[i]=order[j];order[j]=t}order=order.slice(0,8)}
  shuffle();
  function render(){
    if(n>=order.length){
      var m=score>=7?"Control room legend.":(score>=5?"Solid instincts.":"Good start. The Field guide is a short walk away.");
      body.innerHTML='<div class="label">Result</div><p style="font:400 3rem/1 var(--font-display); margin:6px 0">'+score+' / '+order.length+'</p><p class="muted">'+m+'</p><button class="btn ghost sm" id="quizAgain" type="button" style="margin-top:14px">New round</button>';
      $("#quizAgain").addEventListener("click",function(){order=Q.map(function(_,i){return i});shuffle();n=0;score=0;render()});return}
    var q=Q[order[n]];
    body.innerHTML='<div class="label">Scenario '+(n+1)+' of '+order.length+'</div><p style="font:400 1.55rem/1.25 var(--font-display); margin-top:8px">'+esc(q.q)+'</p><div class="opts">'+q.o.map(function(t,i){return '<button class="opt" type="button" data-i="'+i+'">'+esc(t)+'</button>'}).join("")+'</div><div id="qx" aria-live="polite"></div>';
    $$(".opt",body).forEach(function(b){b.addEventListener("click",function(){
      var i=+b.dataset.i,all=$$(".opt",body);all.forEach(function(x){x.disabled=true});
      all[q.a].classList.add("right");if(i!==q.a)b.classList.add("wrong");else score++;
      $("#qx").innerHTML='<p class="explain"><b>'+(i===q.a?"Correct. ":"Not quite. ")+'</b>'+esc(q.e)+'</p><button class="btn sm" id="qNext" type="button" style="margin-top:10px">'+(n===order.length-1?"See result":"Next")+'</button>';
      $("#qNext").addEventListener("click",function(){n++;render()});$("#qNext").focus()})});
  }
  render();
})();
