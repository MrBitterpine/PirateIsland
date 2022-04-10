function newpost() {
    document.getElementById("newpostpadding").style.display = "flex";
}

function closenewpost() {
    document.getElementById("newpostpadding").style.display = "none";
}
var videoPlayer = document.getElementById("videopadding");

function stop() {
    document.getElementById("player").pause();
    videoPlayer.style.display = "none";
}

function matchYoutubeUrl(url) {
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (url.match(p)) ? RegExp.$1 : false;
}

function play(file) {
    var youtube = matchYoutubeUrl(file);
    if (youtube) {
        const URL = "https://vid.puffyan.us/api/v1/videos/" + youtube + "?fields=formatStreams";
        fetch(URL).then(data => {
            return data.json();
        }).then(posts => {
            var vidurl = posts.formatStreams[1].url;
            document.getElementById("videoPlayer").innerHTML = '<video src="' + vidurl + '" controls autoplay id="player"></video>';
            document.getElementById("player").play();
            videoPlayer.style.display = "flex";
        });
    } else {
        document.getElementById("videoPlayer").innerHTML = '<video src="' + file + '" controls autoplay id="player"></video>';
        document.getElementById("player").play();
        videoPlayer.style.display = "flex";
    }
}
document.getElementById("loader").style.display = "flex";
const videoList = document.getElementById("vidlist");
fetch(fURL, fOPTIONS).then(data => {
    return data.json();
}).then(posts => {
    document.getElementById("loader").style.display = "none";
    posts.slice().reverse().forEach(post => {
        let postObject = {
            vidlink: post.link,
            vidtitle: post.title
        };
        var video = '<li onclick="play(\'' + postObject.vidlink + '\')"><p>' + postObject.vidtitle + '</p></li>';
        videoList.innerHTML += video;
    });
});

function submit() {
    var title = document.getElementById("topic").value;
    var link = document.getElementById("subject").value;

    if (!topic || !subject) {
        alert("Fuck Fill all stuff nigge")
    } else {
        const postData = {
            title: title,
            link: link
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json',
                'collection': 'videos'
            }
        }
        fetch("https://desertisland.herokuapp.com/", options)
            .then(res => res.json())
            .then(res => console.log(res));
        closenewpost();
        alert("Done submittin! Your vid will appear here later");
    }
}