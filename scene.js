/* ---------- scene: time of day ---------- */
(function(){
  var svg=$("#scene"),slider=$("#tod");
  var KF=[
    {p:0,  s1:"#3F4378",s2:"#C27A88",s3:"#F6BB8E",orb:"#FFE3B5",ox:260, oy:430,stars:.3, hillF:"#6B5A84",hillN:"#4A4266",ground:"#2C2944",plant:"#252240",lit:"#FFCB8C",lamp:.45,cloud:"#F2C6C0",steam:"#E9C7C4",flame:.5},
    {p:33, s1:"#4A8BD3",s2:"#86BDEB",s3:"#D9EEFA",orb:"#FFF7D6",ox:820, oy:120,stars:0,  hillF:"#86AEC6",hillN:"#6B98A2",ground:"#4A685F",plant:"#34495A",lit:"#BFD9EE",lamp:0,  cloud:"#FFFFFF",steam:"#FFFFFF",flame:.12},
    {p:66, s1:"#292A69",s2:"#B05079",s3:"#FFA66E",orb:"#FFD18C",ox:1340,oy:430,stars:.4, hillF:"#58406F",hillN:"#3A2C56",ground:"#231B39",plant:"#1C1632",lit:"#FFB862",lamp:.85,cloud:"#E58FA2",steam:"#D8A7B4",flame:.85},
    {p:100,s1:"#070B1F",s2:"#101A45",s3:"#26336A",orb:"#EEECFF",ox:1180,oy:130,stars:1,  hillF:"#19204E",hillN:"#111638",ground:"#0B0F26",plant:"#070A1C",lit:"#FFC66E",lamp:1,  cloud:"#2A3566",steam:"#6F7AA8",flame:1}
  ];
  function hex(c){return [parseInt(c.substr(1,2),16),parseInt(c.substr(3,2),16),parseInt(c.substr(5,2),16)]}
  function mix(a,b,t){var x=hex(a),y=hex(b),o=[0,1,2].map(function(i){return Math.round(x[i]+(y[i]-x[i])*t)});return "#"+o.map(function(v){return ("0"+v.toString(16)).slice(-2)}).join("")}
  function num(a,b,t){return a+(b-a)*t}
  var S=svg.style;
  function apply(p){
    var i=0;while(i<KF.length-2&&p>KF[i+1].p)i++;
    var a=KF[i],b=KF[i+1],t=clamp((p-a.p)/(b.p-a.p),0,1);
    S.setProperty("--s1",mix(a.s1,b.s1,t));S.setProperty("--s2",mix(a.s2,b.s2,t));S.setProperty("--s3",mix(a.s3,b.s3,t));
    S.setProperty("--orb",mix(a.orb,b.orb,t));S.setProperty("--hillF",mix(a.hillF,b.hillF,t));S.setProperty("--hillN",mix(a.hillN,b.hillN,t));
    S.setProperty("--ground",mix(a.ground,b.ground,t));S.setProperty("--plant",mix(a.plant,b.plant,t));S.setProperty("--lit",mix(a.lit,b.lit,t));
    S.setProperty("--cloud",mix(a.cloud,b.cloud,t));S.setProperty("--steam",mix(a.steam,b.steam,t));
    S.setProperty("--stars",num(a.stars,b.stars,t).toFixed(2));S.setProperty("--lamp",num(a.lamp,b.lamp,t).toFixed(2));S.setProperty("--flame",num(a.flame,b.flame,t).toFixed(2));
    var ox=num(a.ox,b.ox,t),oy=num(a.oy,b.oy,t);
    $("#orbDisc").setAttribute("cx",ox.toFixed(1));$("#orbDisc").setAttribute("cy",oy.toFixed(1));
    $("#orbGlow").setAttribute("cx",ox.toFixed(1));$("#orbGlow").setAttribute("cy",oy.toFixed(1));
  }
  var g=$("#stars"),h="",seed=7;
  function rnd(){seed=(seed*16807)%2147483647;return seed/2147483647}
  for(var i=0;i<90;i++){h+='<circle cx="'+(rnd()*1600).toFixed(0)+'" cy="'+(rnd()*330).toFixed(0)+'" r="'+(0.6+rnd()*1.2).toFixed(1)+'" fill="#fff" style="animation-delay:-'+(rnd()*4).toFixed(1)+'s"/>'}
  g.innerHTML=h;
  slider.addEventListener("input",function(){apply(+slider.value)});
  $$(".time-marks button").forEach(function(b){b.addEventListener("click",function(){slider.value=b.dataset.p;apply(+b.dataset.p)})});
  apply(+slider.value);
})();

