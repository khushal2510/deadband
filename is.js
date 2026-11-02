/* ---------- IS entity ---------- */
(function(){
  var ids=["Uo","Io","Po","Co","Lo","Ui","Ii","Pi","Ci","Li","Cc","Lc","Len"],E={};ids.forEach(function(i){E[i]=$("#is"+i)});
  function v(k){return +E[k].value||0}
  function run(){
    var len=v("Len"),cc=v("Cc")*len/1000,lc=v("Lc")*len/1000,cAll=v("Ci")+cc,lAll=v("Li")+lc;
    var rows=[
      ["Ui ≥ Uo",v("Ui")>=v("Uo"),v("Ui")+" V vs "+v("Uo")+" V"],
      ["Ii ≥ Io",v("Ii")>=v("Io"),v("Ii")+" mA vs "+v("Io")+" mA"],
      ["Pi ≥ Po",v("Pi")>=v("Po"),v("Pi")+" W vs "+v("Po")+" W"],
      ["Co ≥ Ci + Ccable",v("Co")*1000>=cAll,(v("Co")*1000).toFixed(0)+" nF vs "+cAll.toFixed(1)+" nF"],
      ["Lo ≥ Li + Lcable",v("Lo")*1000>=lAll,(v("Lo")*1000).toFixed(0)+" µH vs "+lAll.toFixed(0)+" µH"]];
    var ok=rows.every(function(r){return r[1]});
    $("#isOut").innerHTML=rows.map(function(r){return '<tr><td><b>'+r[0]+'</b></td><td>'+esc(r[2])+'</td><td><span class="pill '+(r[1]?"ok":"bad")+'">'+(r[1]?"PASS":"FAIL")+'</span></td></tr>'}).join("")+
      '<tr><td colspan="3"><b>'+(ok?"Entity parameters are compatible.":"Not compatible. Shorten the cable, change the barrier or choose another device.")+'</b></td></tr>';
  }
  ids.forEach(function(i){E[i].addEventListener("input",run)});run();
})();

