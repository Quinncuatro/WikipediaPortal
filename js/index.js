var wikiSearchTerm;

$(".search").click(function() {
  $(".beginAll").addClass('animated zoomOut');
  $(".beginAll").html("<form onSubmit='return false' name='searchForm' class='form-inline text-center' role='form'><div class='form-group'><label for='searchWiki'></label><input type='text' class='form-control' id='searchBar' name='searchWiki' placeholder='Search Wikipedia'></div>  <button id='searchBarButton' type='button' class='btn btn-default searchWiki'><i class='fa fa-search img-center whiteSearch'></i></button></form>");
  document.searchForm.searchWiki.focus();
  $(".beginAll").removeClass('zoomOut').addClass('zoomIn');

  $("#searchBarButton").click(function(){
    $("#eraseThis").remove();
    wikiSearchTerm = document.getElementById('searchBar').value;
    console.log(wikiSearchTerm);
    var url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&continue=&srsearch=' + wikiSearchTerm + '&srwhat=text&srprop=snippet';
    console.log(url);

    $.ajax({
      type: 'GET',
      url: url,
      async: false,
      contentType: "application/json",
      dataType: 'jsonp',
      success: function(json) {
        console.log(json.query.search);
        var template = $("#wikiHandlebars").html();
        var templateScript = Handlebars.compile(template);
        var context = json;
        var html = templateScript(context);
        $(document.body).append(html);
      },
      error: function(e) {
        console.log(e.message);
      }
    });
  });

  $('#searchBar').keypress(function(e) {
    var key = e.which;
    if (key == 13) // the enter key code
    {
      $('#searchBarButton').click();
      return false;
    }
  });
});
