const input = document.getElementById("search");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        Search()
    }
});
var id = location.toString().split('?s=');
if (typeof id[1] !== 'undefined') {
    input.value = decodeURIComponent(id[1]);
    Search();
}

function LoadMovies(page) {

    fetchUrl = "https://api.themoviedb.org/3/discover/movie?api_key=05159cb3f7a10f4e876ea3579592cd55&include_video=true&language=en-US&sort_by=popularity.desc&page=" + page

    const imageList = document.getElementById("memeul");
    var memelist = [];
    fetch(fetchUrl).then(data => {
        return data.json();
    }).then(posts => {
        posts.results.forEach(post => {
            imageList.innerHTML += '<li class="movie"><div class="movie" onclick="searchMovie(this)"><img src="https://image.tmdb.org/t/p/w300' + post.poster_path + '"><div class="movie_title">' + post.original_title + '</div><div class="movie_year">' + post.release_date + '</div></div></li>';

        });
    });
}
var page = 1;
LoadMovies(page)
window.onscroll = function() {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight && document.getElementById("moviecollection").style.display != "none") {
        page++
        LoadMovies(page)
    }
}

function searchMovie(element) {
    var searchTag = element.getElementsByClassName("movie_title")[0].innerHTML;
    input.value = searchTag;
    Search();
}

function Search() {
    document.getElementById("loader").style.display = "flex";
    let data = input.value;
    /* window.history.pushState({
         id: "100"
     }, data, "/movies.html?s=" + encodeURIComponent(data));*/
    document.getElementById("moviecollection").style.display = "none";
    const kota_URL = "https://torrents-api-py3.herokuapp.com/api/v1/search?site=1337x&query=" + encodeURIComponent(data);
    const table = document.getElementById("result");
    fetch(kota_URL).then(data => {
        return data.json();
    }).then(posts => {
        document.getElementById("loader").style.display = "none";
        posts.data.forEach(post => {
            let postObject = {
                name: post.name,
                magnet: post.magnet,
                size: post.size,
                seeders: post.seeders
            };
            var tr = '<tr><td>' + postObject.name + '</td><td>' + postObject.seeders + '</td><td>' + postObject.size + '</td><td><a class="button" href="play.html?torrent=' + encodeURIComponent(postObject.magnet) + '">Play</a></td></tr>';
            table.innerHTML += tr;
        });
        document.getElementById("tablediv").style.display = "block";
    });
}
