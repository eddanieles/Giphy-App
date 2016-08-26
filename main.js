(function($){

    $(document).ready(function(){
        $('#etsy-search').bind('submit', function() {
            terms = $('#etsy-terms').val();
            etsyURL = "http://api.giphy.com/v1/gifs/search?q=" + terms + "&api_key=dc6zaTOxFJmzC&limit=1";
            $('<p></p>').text('Giphy '+terms).appendTo('#etsy-images');

            $.ajax({
                url: etsyURL,
                type: 'GET',
                success: function(data) {
                  console.log(data);
                  $.each(data.data, function(i,item) {
                      $("#etsy-images").prepend($("<img/>").attr("src", item.images.original.url));
                  });
                }
            });

            return false;
        })
    });

})(jQuery);
