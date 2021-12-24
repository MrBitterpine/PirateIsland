var fetched = false;
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('myInput').addEventListener('click', function () {
    if (!fetched) {
      goFetch();
    }

  });
  document.getElementById('myInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      sorter()     
    }

  });
});

var namelist = [];
var urllist = [];
function goFetch() {
  loader = document.getElementById("loader");
  defaultStuff = document.getElementById("premade");
  loader.style.display = "block";
  const request_URL = "http://emoji.gg/api/";
  //const imageList = document.getElementById("new");
  //Start the fetching request with request_URL
  fetch(request_URL)
    .then(data => {
      return data.json(); //Returning the data blob to the fetch request so we can extract the JSON from it.
    })
    .then(posts => {
      posts.forEach(post => {
        //Defining 'PostObject'
        let postObject = {
          imgname: post.title,
          imgurl: post.image
        };
        //var image = '<li style="display: none;" id="' + postObject.imgname + '"><img src="' + postObject.imgurl + '"></li>';
        //imageList.innerHTML += image;
        namelist.push(postObject.imgname);
        urllist.push(postObject.imgurl);
      });
    });
    defaultStuff.style.display = "none";
    fetched = true;
};

function sorter() {
  var input, filter, ul, i, txtValue;
  input = document.getElementById("myInput");
  message = document.getElementById("message");
  message.style.display = "block";
  filter = input.value.toUpperCase().replace(" ", "_");
  ul = document.getElementById("new");
  ul.innerHTML = '';
  for (i = 0; i < namelist.length; i++) {
    txtValue = namelist[i];
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      var image = '<li><a href="'+ urllist[i] +'"><img src="' + urllist[i] + '"></a></li>';
      ul.innerHTML += image;
    } else {
    }
  }
  loader = document.getElementById("loader");
  loader.style.display = "none";
}
