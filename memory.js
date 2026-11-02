/* Tag match: pair ISA-5.1 tags with their meanings */
(function(){
  var POOL=[["PT","Pressure transmitter"],["FIC","Flow indicating controller"],["LSHH","Level switch high-high"],["TE","Temperature element"],["PSV","Pressure safety valve"],["AT","Analyser transmitter"],["PDT","Differential pressure transmitter"],["XV","On/off valve (unclassified variable)"],["VT","Vibration transmitter"],["ZT","Position transmitter"],["TIC","Temperature indicating controller"],["FE","Flow element"],["LG","Level gauge (glass)"],["PAL","Pressure alarm low"],["SIC","Speed indicating controller"],["FQ","Flow totaliser (quantity)"]];
  var host=$("#memGrid"),mv=$("#memMoves"),msg=$("#memMsg"),first=null,lock=false,moves=0,found=0,PAIRS=6;
  function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
  function deal(){
    var pick=shuffle(POOL.slice()).slice(0,PAIRS),cards=[];
    pick.forEach(function(p,i){cards.push({id:i,k:"tag",t:p[0]});cards.push({id:i,k:"mean",t:p[1],tag:p[0]})});
    shuffle(cards);moves=0;found=0;first=null;lock=false;mv.textContent="0";msg.textContent="Find each tag and its meaning.";
    host.innerHTML=cards.map(function(c,i){
      var back=c.k==="tag"?'<span><b>'+esc(c.t)+'</b></span>':'<span>'+esc(c.t)+'</span>';
      return '<div class="card3d" data-id="'+c.id+'"><button type="button" aria-label="Card '+(i+1)+', face down"><span class="face front">?</span><span class="face back">'+back+'</span></button></div>'}).join("");
  }
  host.addEventListener("click",function(e){
    var card=e.target.closest(".card3d");if(!card||lock||card.classList.contains("flip")||card.classList.contains("done"))return;
    card.classList.add("flip");
    if(!first){first=card;return}
    moves++;mv.textContent=moves;lock=true;
    var a=first,b=card;first=null;
    if(a.dataset.id===b.dataset.id){
      setTimeout(function(){a.classList.remove("flip");b.classList.remove("flip");a.classList.add("done");b.classList.add("done");lock=false;found++;
        if(found===PAIRS){msg.textContent="All matched in "+moves+" moves. Nicely done."}else{msg.textContent="Match. "+(PAIRS-found)+" to go."}},450);
    }else{
      setTimeout(function(){a.classList.remove("flip");b.classList.remove("flip");lock=false},900);
    }
  });
  $("#memNew").addEventListener("click",deal);deal();
})();
