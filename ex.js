/* ---------- Ex checker ---------- */
(function(){
  var G={1:"IIA",2:"IIB",3:"IIC"},EPL={da:"Ga",db:"Gb",eb:"Gb",ec:"Gc",ia:"Ga",ib:"Gb",ic:"Gc",ma:"Ga",mb:"Gb",pxb:"Gb",pzc:"Gc"};
  var SUBDIV={da:1,db:1,ia:1,ib:1,ic:1},EPLZ={Ga:[0,1,2],Gb:[1,2],Gc:[2]};
  var NOTE={da:"Flameproof",db:"Flameproof",eb:"Increased safety",ec:"Non-sparking",ia:"Intrinsic safety, two faults",ib:"Intrinsic safety, one fault",ic:"Intrinsic safety, normal operation",ma:"Encapsulation",mb:"Encapsulation",pxb:"Pressurised",pzc:"Pressurised"};
  var tcl={450:"T1",300:"T2",200:"T3",135:"T4",100:"T5",85:"T6"};
  var ids=["exProt","exGrp","exT","exZone","exGas"],E={};ids.forEach(function(i){E[i]=$("#"+i)});
  function run(){
    var prot=E.exProt.value,grp=+E.exGrp.value,t=+E.exT.value,zone=+E.exZone.value,g=E.exGas.value.split("|"),ag=+g[0],ait=+g[1],epl=EPL[prot],sub=!!SUBDIV[prot];
    E.exGrp.disabled=!sub;
    var mark="Ex "+prot+" "+(sub?G[grp]:"II")+" "+tcl[t]+" "+epl;
    var ok1=EPLZ[epl].indexOf(zone)>-1,ok2=sub?grp>=ag:true,ok3=t<ait;
    function row(ok,txt){return '<div><span class="pill '+(ok?"ok":"bad")+'">'+(ok?"PASS":"FAIL")+'</span> '+txt+'</div>'}
    $("#exOut").innerHTML='<div class="mono" style="font-size:1.35rem">'+mark+'</div><div class="muted" style="font-size:.9rem">'+NOTE[prot]+'</div>'+
      row(ok1,"EPL "+epl+(ok1?" is suitable for":" is not suitable for")+" Zone "+zone)+
      row(ok2,sub?("Group "+G[grp]+(ok2?" covers ":" does not cover ")+G[ag]):"Group II needs no gas subdivision for this concept")+
      row(ok3,"Max surface "+t+" °C "+(ok3?"is below":"is not below")+" the auto-ignition temperature of "+ait+" °C");
  }
  ids.forEach(function(i){E[i].addEventListener("change",run)});run();
})();

