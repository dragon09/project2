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

      //$(document).ready(function(){
        console.log('starting carousel')

        $('.carousel.full-width-carousel').carousel({
           full_width: true
       });
       $('.carousel:not(.full-width-carousel)').carousel();
        $('.slider').slider({
           full_width: true
       });
      //});


});
