/* ---------- tea break lines ---------- */
(function(){
  var L=[
    "Please revise as per the latest client specification. Latest specification: Rev B. Expected issue date: soon.",
    "Comment 1 of 214: please move the logo two pixels to the left.",
    "Kindly align the datasheet with the template. The template does not align with the template.",
    "Cable schedule approved with 143 comments.",
    "Vendor to resubmit with minor changes. The minor changes: all of them.",
    "A loop check is a very formal way of asking can you hear me at 4 mA.",
    "HART is how a 4–20 mA wire learned to chat.",
    "There are two kinds of engineers: those who label their cables, and those who wish they had.",
    "Zero drift is an instrument slowly forgetting what zero means. Relatable.",
    "The P&ID is correct. The plant is a minor deviation from it.",
    "Please advise ETA for the document we needed yesterday.",
    "The vibration alarm was perfectly calibrated. The machine just felt things deeply."
  ];
  var q=$("#quote"),i=Math.floor(Math.random()*L.length);
  function show(){q.textContent=L[i]}
  $("#quoteBtn").addEventListener("click",function(){var n;do{n=Math.floor(Math.random()*L.length)}while(n===i);i=n;show()});show();
})();

