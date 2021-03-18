/*
10 minutes into making the website and I'm already writing fancy scripts...
I utterly hate HTML, but, what else can I do?
*/

// Resizes the main section to `window.innerHeight - header.clientHeight`
//   so that a scrollbar actually appears.
var headerElement = document.getElementById("scriptHeader");
var mainElement = document.getElementById("scriptMain");
var greybackElements = document.getElementsByClassName("main");
var desktopLayout = null;

function resizeMain () {
    mainElement.style.height = (window.innerHeight - headerElement.clientHeight) + "px";
    
    var newDesktopLayout = Math.pow(window.innerWidth / 50, 2) > window.innerHeight;
    if (newDesktopLayout != desktopLayout) {
        desktopLayout = newDesktopLayout;
        for (var e = 0; e < 2; e++) {
            greybackElements[e].style.display = (desktopLayout ? "flex" : "block");
            greybackElements[e].style.width = (desktopLayout ? "60%" : "90%");
            greybackElements[e].style.backgroundColor = (desktopLayout ? "rgba(24, 24, 24, 1)" : "rgba(24, 24, 24, 0)");
        }
    }
}

// Scrolls the background slowly with the mainElement scrollbar.
function parallaxBack () {
    // Could be too trippy, may change values later
    var xpos = Math.sin(mainElement.scrollTop / 400) * 100;
    var ypos = -mainElement.scrollTop / 4;
    mainElement.style.backgroundPosition = xpos + "px " + ypos + "px";
}


// Binding events to functions
mainElement.onscroll = function () {
    parallaxBack();
}

window.onresize = function () {
    resizeMain();
};

window.onload = function () {
    resizeMain();
};