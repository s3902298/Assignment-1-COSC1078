/*
10 minutes into making the website and I'm already writing fancy scripts...
I utterly hate HTML, but, what else can I do?
*/

// Resizes the main section to `window.innerHeight - header.clientHeight`
//   so that a scrollbar actually appears.
var headerElement = document.getElementById("scriptHeader");
var mainElement = document.getElementById("scriptMain");

function resizeMain () {
    mainElement.style.height = (window.innerHeight - headerElement.clientHeight) + "px";
}

// Scrolls the background slowly with the mainElement scrollbar.
function parallaxBack () {
    mainElement.style.backgroundPosition = "0px " + (-mainElement.scrollTop / 4 ) + "px";
}

mainElement.onscroll = function () {
    parallaxBack();
}

window.onresize = function () {
    resizeMain();
};

window.onload = function () {
    resizeMain();
};