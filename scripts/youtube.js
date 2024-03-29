const table = document.getElementById("result");
var id = location.toString().split('?id=');
if (typeof id[1] !== 'undefined') {
    const URL = "https://vid.puffyan.us/api/v1/videos/" + id[1] + "?fields=formatStreams,title,videoThumbnails";
    fetch(URL).then(data => {
        return data.json();
    }).then(posts => {
        document.getElementById("title").innerHTML = posts.title;
        document.getElementById("thumbnail").src = posts.videoThumbnails[4].url;
        document.getElementById("loader").style.display = "none";
        posts.formatStreams.forEach(post => {
            let postObject = {
                res: post.size,
                container: post.container,
                quality: post.qualityLabel,
                link: post.url
            };
            var tr = '<tr><td>' + postObject.res + '</td><td>' + postObject.container + '</td><td>' + postObject.quality + '</td><td><a class="button" href=' + postObject.link + '>Play</a></td></tr>';
            table.innerHTML += tr;
        });
        document.getElementById("tablediv").style.display = "block";
    });
}

function matchYoutubeUrl(url) {
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (url.match(p)) ? RegExp.$1 : false;
}
const input = document.getElementById("search");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        Search()
    }
});

function Search() {
    let data = input.value;
    if (matchYoutubeUrl(data) != false) {
        document.getElementById("loader").style.display = "flex";
        const URL = "https://vid.puffyan.us/api/v1/videos/" + matchYoutubeUrl(data) + "?fields=formatStreams,title,videoThumbnails";
        fetch(URL).then(data => {
            return data.json();
        }).then(posts => {
            document.getElementById("title").innerHTML = posts.title;
            document.getElementById("thumbnail").src = posts.videoThumbnails[4].url;
            document.getElementById("loader").style.display = "none";
            posts.formatStreams.forEach(post => {
                let postObject = {
                    res: post.size,
                    container: post.container,
                    quality: post.qualityLabel,
                    link: post.url
                };
                var tr = '<tr><td>' + postObject.res + '</td><td>' + postObject.container + '</td><td>' + postObject.quality + '</td><td><a class="button" href=' + postObject.link + '>Play</a></td></tr>';
                table.innerHTML += tr;
            });
            document.getElementById("tablediv").style.display = "block";
        });
    } else {
        let data = input.value;
        document.getElementById("loader").style.display = "flex";
        const URL = "https://vid.puffyan.us/api/v1/search?type=video&q=" + encodeURIComponent(data);
        fetch(URL).then(data => {
            return data.json();
        }).then(posts => {
            document.getElementById("loader").style.display = "none";
            table.innerHTML = '<tr><th>Thumbnail</th><th>Title</th><th>Download</th></tr>';
            posts.forEach(post => {
                var title = post.title;
                var thumbnail = post.videoThumbnails[4].url;
                var id = post.videoId;
                var tr = '<tr><td><img src="' + thumbnail + '"></td><td>' + title + '</td><td><a class="button" href="youtube.html?id=' + id + '">Download</a></td></tr>';
                table.innerHTML += tr;
            });
            document.getElementById("tablediv").style.display = "block";
        });
    }
}
