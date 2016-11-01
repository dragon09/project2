$(document).ready(function () {
  console.log('page is loaded')

  $("#start_button").click(startGame);

  function startGame() {
    console.log('start button clicked')
    $('.instructions').hide();
  }

//   var howToPlay = $(".howTo")
//
//   howToPlay.click(newHowTo)
//
//
// $(".howTo").click(function(){
//       $(".overlay").fadeIn(1000);
//   });
});
