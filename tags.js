/* ---------- tag decoder ---------- */
(function(){
  var FIRST={A:"Analysis",B:"Burner / combustion",C:"User choice",D:"User choice",E:"Voltage",F:"Flow rate",G:"User choice",H:"Hand (manual)",I:"Current",J:"Power",K:"Time / schedule",L:"Level",M:"User choice",N:"User choice",O:"User choice",P:"Pressure / vacuum",Q:"Quantity",R:"Radiation",S:"Speed / frequency",T:"Temperature",U:"Multivariable",V:"Vibration / machinery analysis",W:"Weight / force",X:"Unclassified",Y:"Event / state / presence",Z:"Position / dimension"};
  var MOD={D:"Differential",F:"Ratio",J:"Scan",K:"Rate of change",M:"Momentary",Q:"Totalise",S:"Safety"};
  var SUC={A:"Alarm",C:"Control",E:"Sensing element",G:"Glass / gauge / viewing",H:"High",I:"Indicate",K:"Control station",L:"Low",M:"Middle",O:"Orifice / restriction",P:"Test point",Q:"Totalise",R:"Record",S:"Switch",T:"Transmit",V:"Valve / damper",W:"Well",X:"Unclassified",Y:"Relay / compute / convert",Z:"Driver / actuator / final element"};
  var inp=$("#tagIn"),out=$("#tagOut"),sen=$("#tagSentence");
  var ex=["PDAH-1204","TSHH-3101","LSHH-1103","PSV-2105","VT-4402","ZT-4503","FIC-2001","XV-1001"];
  $("#tagEx").innerHTML=ex.map(function(t){return '<button class="chip" type="button" data-t="'+t+'">'+t+'</button>'}).join("");
  $("#tagEx").addEventListener("click",function(e){var b=e.target.closest("[data-t]");if(b){inp.value=b.dataset.t;run()}});
  function run(){
    var raw=inp.value.trim().toUpperCase(),m=raw.match(/^[A-Z]+/);
    if(!m){out.innerHTML="";sen.textContent="Start with letters, for example PT-1001.";return}
    var s=m[0],rest=raw.slice(s.length).replace(/^[-\s]+/,""),chips=[],words=[],i=1,f=s[0];
    chips.push([f,FIRST[f]||"?"]);words.push(FIRST[f]||"?");
    if(s.length>2&&MOD[s[1]]&&!(s[1]==="S"&&!(s[2]==="V"||s[2]==="E"))){chips.push([s[1],MOD[s[1]]]);words.push(MOD[s[1]]);i=2}
    while(i<s.length){var c=s[i];
      if((c==="H"||c==="L")&&s[i+1]===c){var w=c==="H"?"High-high":"Low-low";chips.push([c+c,w]);words.push(w);i+=2;continue}
      var d=SUC[c]||"?";chips.push([c,d]);words.push(d);i++}
    var h=chips.map(function(x){return '<div class="tagchip"><b>'+esc(x[0])+'</b><span>'+esc(x[1])+'</span></div>'}).join("");
    if(rest)h+='<div class="tagchip"><b>'+esc(rest)+'</b><span>Loop / serial number</span></div>';
    out.innerHTML=h;sen.textContent=words.join(" · ");
  }
  inp.addEventListener("input",run);run();
})();

