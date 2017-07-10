$(document).ready(function () {
  // run ajax now
  // 2 methods = GET and POST
$('form').on('submit', function (event) {
  // console.log('submitted')
  event.preventDefault()
  var searchTextArr = $(this).serializeArray()    // "this" is the node that triggered the function, in this case the form. In vanilla JS this is aka event.target. Wrapping the node up in $() allows you to run jQuery-specific methods on the node
  // console.log(searchTextArr)
  var searchText = searchTextArr[0].value
  // console.log(searchText)
  runSearch(searchText)
})

function runSearch (text) {
  var search_url = 'https://api.themoviedb.org/3/search/movie?api_key=83ebcfbe2592e4358658da3522dad3ff&query=' + text
  var $ul = $('ul')

  $.get(search_url)
    .done(function (data) {
      var movie_arr = data.results
      $ul.empty()
      movie_arr.forEach(function (movie) {
        var $createdList = createList(movie)
        $ul.append($createdList)
      })
    })
}

  // input: obj
  // output (return): jquery object
  // jquery object => <li> <img src=""> </li>
function createList (obj) {
  var $newLi = $('<li>')
  var $newImg = $('<img>')
  var image_url = 'https://image.tmdb.org/t/p/w300/'

  $newImg.attr({
    src: image_url + obj.poster_path,
    alt: obj.original_title
  })
  $newLi.append($newImg)
  return $newLi
  }
})
