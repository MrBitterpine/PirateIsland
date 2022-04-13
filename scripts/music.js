const table = document.getElementById("result");
const input = document.getElementById("search");
var videoid = '';
if (localStorage.recentsongs) {
    songlist = localStorage.recentsongs;
    object = JSON.parse(songlist);
    table.innerHTML = '<tr><th colspan="3" style="text-align:center;"><h2>Recent Songs</h2></th></tr><tr><th>Cover</th><th>Title</th><th>Download</th></tr>'
    object.slice().reverse().forEach(music => {
        table.innerHTML += '<tr><td><img src="' + music.thumb + '"></td><td>' + music.title + '</td><td><button onclick="Play(\'' + music.id + '\',\'' + music.thumb + '\',\'' + music.title + '\')">Play</button><a href="youtube.html?id=' + music.id + '">Download</a><a target="_blank" href="https://www.youtube.com/watch?v=' + music.id + '">Watch In Youtube</a></td></tr>'
    });
    document.getElementById("tablediv").style.display = "block";
}
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        Search()
    }
});

document.getElementById("audio").addEventListener("error", function(e) {
    if (e.currentTarget.error.code = 2 && document.getElementById("audio").getAttribute("src") != "") {
        playvid(videoid);
    }
});

function Search() {
    let data = input.value;
    document.getElementById("loader").style.display = "flex";
    const URL = "https://vid.puffyan.us/api/v1/search?type=video&q=" + encodeURIComponent(data);
    fetch(URL).then(data => {
        return data.json();
    }).then(posts => {
        document.getElementById("loader").style.display = "none";
        table.innerHTML = '<tr><th>Cover</th><th>Title</th><th>Download</th></tr>';
        posts.forEach(post => {
            var title = post.title;
            var thumbnail = post.videoThumbnails[4].url;
            var id = post.videoId;

            var tr = '<tr><td><img src="' + thumbnail + '"></td><td>' + title + '</td><td><button onclick="Play(\'' + id + '\',\'' + thumbnail + '\',\'' + title + '\')">Play</button><a href="youtube.html?id=' + id + '">Download</a><a target="_blank" href="https://www.youtube.com/watch?v=' + id + '">Watch In Youtube</a></td></tr>';
            table.innerHTML += tr;
        });
        document.getElementById("recommended").innerHTML = "";
        document.getElementById("tablediv").style.display = "block";
    });
}

function Play(id, thumb, title) {
    document.getElementById("thumb").src = thumb;
    document.getElementById("heading").innerHTML = title;
    videoid = id;
    const URL = "https://vid.puffyan.us/api/v1/videos/" + id + "?fields=adaptiveFormats,recommendedVideos";
    fetch(URL).then(data => {
        return data.json();
    }).then(posts => {
        var audiourl = posts.adaptiveFormats[1].url;
        document.getElementById("audio").src = audiourl;
        document.getElementById("playerdiv").style.display = "flex";
        const recommend = document.getElementById("recommended");
        recommend.innerHTML = '<tr><th colspan="3" style="text-align:center;"><h2>Suggested Songs</h2></th></tr><tr><th>Cover</th><th>Title</th><th>Download</th></tr>'
        posts.recommendedVideos.forEach(post => {
            var title = post.title;
            var thumbnail = post.videoThumbnails[4].url;
            var id = post.videoId;

            var tr = '<tr><td><img src="' + thumbnail + '"></td><td>' + title + '</td><td><button onclick="Play(\'' + id + '\',\'' + thumbnail + '\',\'' + title + '\')">Play</button><a href="youtube.html?id=' + id + '">Download</a><a target="_blank" href="https://www.youtube.com/watch?v=' + id + '">Watch In Youtube</a></td></tr>';
            recommend.innerHTML += tr;
        })
    });
    if (localStorage.recentsongs) {
        const lastsong = {
            id: id,
            title: title,
            thumb: thumb
        };
        songlist = JSON.parse(localStorage.recentsongs);
        songlist = songlist.filter(function(x) {
            return x.id != lastsong.id;
        });
        songlist.push(lastsong);
        localStorage.recentsongs = JSON.stringify(songlist);

    } else {
        const newsong = [{
            id: id,
            title: title,
            thumb: thumb
        }];
        localStorage.recentsongs = JSON.stringify(newsong);
    }
}
var videoPlayer = document.getElementById("videopadding");

function stop() {
    document.getElementById("videoPlayer").innerHTML = '';

    videoPlayer.style.display = "none";
}

function playvid(file) {
    document.getElementById("videoPlayer").innerHTML = '<iframe src="https://yewtu.be/embed/' + file + '" frameborder="0" id="player"></iframe>';
    //document.getElementsByTagName("video")[0].play();
    videoPlayer.style.display = "flex";

}