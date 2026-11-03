/* Plant ambience: five generated layers, works from the header button on every page */
(function(){
  var LAY=[{id:"hum",name:"Machinery hum",v:70},{id:"air",name:"Control room air",v:50},{id:"rain",name:"Rain on the skid roof",v:0},{id:"flare",name:"Distant flare",v:0},{id:"wind",name:"Night wind",v:0}];
  var KEY="db-mix",saved={};
  try{saved=JSON.parse(store(KEY)||"{}")||{}}catch(e){saved={}}
  var lvl={};LAY.forEach(function(l){lvl[l.id]=saved[l.id]!=null?saved[l.id]:l.v});
  var master=saved.master!=null?saved.master:80;
  var rows=$("#mixRows"),mSl=$("#mixMaster"),mV=$("#mixMasterV"),mixBtn=$("#mixBtn"),amb=$("#ambBtn");
  if(rows){
    rows.innerHTML=LAY.map(function(l){return '<div class="ch"><label for="mx_'+l.id+'">'+l.name+'</label><span class="val" id="mxv_'+l.id+'">'+lvl[l.id]+'%</span><input type="range" id="mx_'+l.id+'" min="0" max="100" value="'+lvl[l.id]+'" data-id="'+l.id+'"></div>'}).join("");
    if(mSl){mSl.value=master;mV.textContent=master+"%"}
  }
  var an=null,ctx=null,gains={},mg=null,on=false;
  function noise(kind){
    var len=ctx.sampleRate*4,b=ctx.createBuffer(1,len,ctx.sampleRate),d=b.getChannelData(0),last=0;
    for(var i=0;i<len;i++){var w=Math.random()*2-1;if(kind==="brown"){last=(last+0.02*w)/1.02;d[i]=last*3.2}else d[i]=w*0.5}
    var s=ctx.createBufferSource();s.buffer=b;s.loop=true;s.start();return s}
  function lfo(freq,amt,target){var o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=freq;g.gain.value=amt;o.connect(g);g.connect(target);o.start()}
  function filt(type,f,q){var n=ctx.createBiquadFilter();n.type=type;n.frequency.value=f;if(q)n.Q.value=q;return n}
  function build(){
    var AC=window.AudioContext||window.webkitAudioContext;if(!AC)return false;
    ctx=new AC();mg=ctx.createGain();mg.gain.value=0;var cp=ctx.createDynamicsCompressor();var mk=ctx.createGain();mk.gain.value=1.6;an=ctx.createAnalyser();mg.connect(mk);mk.connect(cp);cp.connect(an);an.connect(ctx.destination);
    LAY.forEach(function(l){var g=ctx.createGain();g.gain.value=0;g.connect(mg);gains[l.id]=g});
    var n,f;
    n=noise("brown");f=filt("lowpass",170);n.connect(f);f.connect(gains.hum);
    var o1=ctx.createOscillator(),o2=ctx.createOscillator(),og=ctx.createGain();o1.frequency.value=50;o2.frequency.value=100.3;og.gain.value=0.06;o1.connect(og);o2.connect(og);og.connect(gains.hum);o1.start();o2.start();
    n=noise("brown");f=filt("lowpass",700);var h=filt("highpass",70);n.connect(f);f.connect(h);h.connect(gains.air);
    n=noise("white");f=filt("highpass",900);var l2=filt("lowpass",6500);n.connect(f);f.connect(l2);l2.connect(gains.rain);
    n=noise("brown");f=filt("lowpass",150);var fg=ctx.createGain();fg.gain.value=0.7;n.connect(f);f.connect(fg);fg.connect(gains.flare);lfo(0.11,0.3,fg.gain);
    n=noise("white");f=filt("bandpass",450,1.2);var wg=ctx.createGain();wg.gain.value=0.5;n.connect(f);f.connect(wg);wg.connect(gains.wind);lfo(0.07,180,f.frequency);
    return true}
  function lv(id){var v=lvl[id]/100;return id==="rain"||id==="wind"?v*v*0.8:v*v*1.1}
  function applyLevels(){if(!ctx)return;LAY.forEach(function(l){gains[l.id].gain.setTargetAtTime(lv(l.id),ctx.currentTime,0.15)});mg.gain.setTargetAtTime(on?Math.pow(master/100,1.5):0,ctx.currentTime,0.3)}
  function ui(){if(mixBtn)mixBtn.textContent=on?"Stop":"Play";if(amb)amb.setAttribute("aria-pressed",on?"true":"false")}
  function toggle(){
    try{
      if(!ctx&&!build()){if(mixBtn){mixBtn.textContent="No audio";mixBtn.disabled=true}return}
      ctx.resume();on=!on;applyLevels();ui();
    }catch(e){if(mixBtn)mixBtn.textContent="No audio"}
  }
  function save(){var o={master:master};LAY.forEach(function(l){o[l.id]=lvl[l.id]});store(KEY,JSON.stringify(o))}
  if(mixBtn)mixBtn.addEventListener("click",toggle);
  if(amb)amb.addEventListener("click",toggle);
  if(rows)rows.addEventListener("input",function(e){var id=e.target.dataset.id;if(!id)return;lvl[id]=+e.target.value;$("#mxv_"+id).textContent=e.target.value+"%";applyLevels();save()});
  if(mSl)mSl.addEventListener("input",function(){master=+mSl.value;mV.textContent=master+"%";applyLevels();save()});
  window.DBLevel=function(){if(!an)return -1;var d=new Uint8Array(an.fftSize);an.getByteTimeDomainData(d);var m=0;for(var i=0;i<d.length;i++)m=Math.max(m,Math.abs(d[i]-128));return m};
  window.DBChime=function(){try{if(!ctx&&!build())return;ctx.resume();var o=ctx.createOscillator(),g=ctx.createGain();o.type="sine";o.frequency.value=528;o.connect(g);g.connect(ctx.destination);g.gain.setValueAtTime(0,ctx.currentTime);g.gain.linearRampToValueAtTime(0.25,ctx.currentTime+0.05);g.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+2.4);o.start();o.stop(ctx.currentTime+2.5)}catch(e){}};
})();
