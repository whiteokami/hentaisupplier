$(() => {
  var team = document.getElementById("team");
  var html = "";
  for(var i=0;i<Object.keys(teamf).length;i++){
    html += `<div class="member"><a id="${teamf[i+1]["name"]}" onclick="showpopup(this)"><img src="${teamf[i+1]["img"]}" class="memberimg"></a><a id="${teamf[i+1]["name"]}" onclick="showpopup(this)"><p class="link">${teamf[i+1]["name"]}</p></a></div>`;
  }
  team.innerHTML = html;
});

function closepopup() {
  $("#teampopup").fadeOut("fast", () => {
    $("#teampopup").html("");
  });
}

function showpopup(member) {
  req = $.ajax({
    url: "/api/team/" + member.id,
    type: "POST"
  });

  req.done((data)=>{
    $("#teampopup").fadeIn("fast");
    $("#teampopup").html(data);
  });
}
