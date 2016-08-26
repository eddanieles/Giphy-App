(function($){

    $(document).ready(function(){

        $('#gif_search').bind('submit', function() {
            $(".jumbotron").hide();
            terms = $('#search_terms').val();
            apiURL = "http://api.giphy.com/v1/gifs/search?q=" + terms + "&api_key=dc6zaTOxFJmzC&limit=100";
            $.ajax({
                url: apiURL,
                type: 'GET',
                success: function(data) {
                  //console.log(data);
                  var random = Math.ceil(Math.random() * 100);
                  var randomGifURL = data.data[random].images.original.url;
                  var gifSection = `<p class="terms">Giphy <em>"${terms}"</em> <i class="fa fa-heart" aria-hidden="true"></i></p>
                  <p class="gif"><img src="${randomGifURL}" alt="" /></p>`;
                  $("#gif_container").prepend(gifSection);
                }
            });
            return false;
        })

        var favoritesArray = [];
        $('#gif_container').on('click', '.fa', function(e){
          var self = $(this);
          var gifFavorite = self.closest("div").find("img").attr("src");
          localStorage.setItem('favorite', gifFavorite);
          favoritesArray.push(gifFavorite);
          console.log(localStorage);
          console.log(favoritesArray);
          $(this).toggle();
        })



        $('#favorites_button').click(function(){
          $(".jumbotron").hide();
          $("#gif_container").hide();
          favoritesArray.forEach(function(gif){
            $("#favorites_page").prepend(`<p><img src=${gif} alt="" /></p>`);
          })
          $("#favorites_page").show();
        })

        $(window).on("hashchange", function(event){
          showPage(location.hash);
        })

        location.hash = "#Home";


    });

})(jQuery);
