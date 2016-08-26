(function($){

    $(document).ready(function(){

        $('#gif_search').bind('submit', function() {
            terms = $('#search_terms').val();
            apiURL = "http://api.giphy.com/v1/gifs/search?q=" + terms + "&api_key=dc6zaTOxFJmzC&limit=100";
            $.ajax({
                url: apiURL,
                type: 'GET',
                success: function(data) {
                  console.log(data);
                  var random = Math.ceil(Math.random() * 100);
                  var randomGifURL = data.data[random].images.original.url;
                  var gif = `<p class="gif"><img src="${randomGifURL}" alt="" /></p>`;
                  $("#gif_container").prepend(gif);
                  var searchText = `<p>Giphy <em>"${terms}"</em></p>`;
                  $("#gif_container").prepend(searchText);
                }
            });
            return false;
        })
    });

})(jQuery);
