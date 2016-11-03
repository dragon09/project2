$(document).ready(function () {
  console.log('page is loaded')


  $('select').each(function () {
    var $this = $(this);
    var defaultOpt = $this.data("selected")
    if (defaultOpt !== undefined) {
      $this.val(defaultOpt);
    }
    $this.material_select();
  })

      $("#upload").on("change", function () {
          if (!$(this).val() || !this.files || !this.files[0]) { return; }
          var reader = new FileReader();

          // image loaded
          reader.onload = function(event) {
              var dataUri = event.target.result;
              $("img.user-image").attr("src", dataUri);
         };

          // error
         reader.onerror = function(event) {
             alert("Failed to load the image: " + event.target.error.code);
         };

         reader.readAsDataURL(this.files[0]);
      });

//pop-up window
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
