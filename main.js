$(document).ready(function(){

  $.ajax({
      url: "http://api.giphy.com/v1/gifs/search?q=gif&api_key=dc6zaTOxFJmzC&limit=100",
      type: 'GET',
      success: function(data) {
        //console.log(data);
        var random = Math.ceil(Math.random() * 100);
        var randomGifURL = data.data[random].images.original.url;
        var gifSection = `<p><img src="${randomGifURL}" alt="" /></p>`;
        $("#home_container").append(gifSection);
      }
  });

  $('#gif_search').bind('submit', function() {
      location.hash = "#Gifs"
      $(".jumbotron").hide();
      $("#favorites_page").hide();
      $("#home_container").hide();
      $("#gif_container").show();
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

  if (localStorage.favorite) {
    var favoritesArray = localStorage.favorite.split(',');
  } else {
    var favoritesArray = []
    localStorage.setItem('favorite', "");
  }

  $('#gif_container').on('click', '.fa', function(e){
    var self = $(this);
    var gifFavorite = self.closest("div").find("img").attr("src");
    favoritesArray.push(gifFavorite);
    localStorage.setItem('favorite', favoritesArray);
    console.log(favoritesArray);
    $(this).toggle();
  })



  $('#favorites_button').click(function(){
    $("#favorites_page").html("");
    $(".jumbotron").hide();
    $("#gif_container").hide();
    $("#home_container").hide();
    favoritesArray.forEach(function(gif){
      $("#favorites_page").prepend(`<p><img src=${gif} alt="" /></p>`);
    })
    $("#favorites_page").show();
  })

  $(".navbar-brand").click(function(){
    $(".jumbotron").hide();
    $("#home_container").hide();
    $("#favorites_page").hide();
    $("#gif_container").show();
  })

  function showPage(pageID) {
    $(".page").hide();
    $(pageID).show();
  }

  $(window).on('hashchange', function(event){
    showPage(location.hash);
  })

  location.hash = "#Home";


});
