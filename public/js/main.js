var bgs = ["https://res.bandori.ga/assets-jp/characters/resourceset/res006017_rip/card_after_training.png",
"https://res.bandori.ga/assets-jp/characters/resourceset/res006022_rip/card_after_training.png",
"https://res.bandori.ga/assets-jp/characters/resourceset/res006012_rip/card_after_training.png",
"https://res.bandori.ga/assets-jp/characters/resourceset/res006029_rip/card_after_training.png",
"https://res.bandori.ga/assets-jp/characters/resourceset/res006024_rip/card_after_training.png",
"https://res.bandori.ga/assets-jp/characters/resourceset/res006033_rip/card_after_training.png",
"https://res.bandori.ga/assets-jp/characters/resourceset/res006014_rip/card_after_training.png",
"https://res.bandori.ga/assets-jp/characters/resourceset/res006008_rip/card_after_training.png"];
function bg() {
  var r = Math.floor(Math.random()*bgs.length);
  $(".headimg").css("background-image", "url(" + bgs[r] + ")");
}
