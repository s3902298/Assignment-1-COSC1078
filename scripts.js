/*
10 minutes into making the website and I'm already writing fancy scripts...
I utterly hate HTML, but, what else can I do?
*/

// Resizes the main section to `window.innerHeight - header.clientHeight`
//   so that a scrollbar actually appears.
var headerElement = document.getElementById("scriptHeader");
var mainElement = document.getElementById("scriptMain");
var footerElement = document.getElementById("scriptFooter");
var buttonArea = document.getElementById("buttonArea");
var refsElement = document.getElementById("refs");
var annoyingButtonElement = document.getElementById("annoyingButton");
var greybackElements = document.getElementsByClassName("main");
var navElement = document.getElementsByClassName("nav")[0];
var desktopLayout = null;

var buttonPos = null;
var buttonGeometry = null;
var buttonVel = {"x": 0, "y": 0};
var buttonVals = {"drag": 0.95, "bump": 10};

function pyth (a, b) {
    return Math.sqrt(a * a + b * b);
}

function resizeMain () {
    mainElement.style.height = (window.innerHeight - headerElement.clientHeight) + "px";
    
    var newDesktopLayout = Math.pow(window.innerWidth / 50, 2) > window.innerHeight;
    if (newDesktopLayout != desktopLayout) {
        desktopLayout = newDesktopLayout;
        for (var e = 0; e < 2; e++) {
            greybackElements[e].style.display = (desktopLayout ? "flex" : "block");
            greybackElements[e].style.width = (desktopLayout ? "65%" : "90%");
            greybackElements[e].style.padding = (desktopLayout ? "0px 10px" : "0px");
            greybackElements[e].style.backgroundColor = (desktopLayout ? "rgba(24, 24, 24, 1)" : "rgba(24, 24, 24, 0)");
        }
        navElement.style.width = (desktopLayout ? "85%" : "100%");
        footerElement.style.width = (desktopLayout ? "65%" : "100%");
        footerElement.style.padding = (desktopLayout ? "10px" : "0px");
        buttonArea.style.display = (desktopLayout ? "flex" : "none");
    }
}

// Scrolls the background slowly with the mainElement scrollbar.
function parallaxBack () {
    // Could be too trippy, may change values later
    var xpos = Math.sin(mainElement.scrollTop / 800) * 10;
    var ypos = -mainElement.scrollTop / 4;
    mainElement.style.backgroundPosition = xpos + "px " + ypos + "px";
}

function toggleRefs (mode) {
    refsElement.style.display = ((refsElement.style.display != "block" || mode == 1) && mode != 2 ? "block" : "none");
}

function bumpAnnoyingButton () {
    if (buttonPos == null) {
        buttonGeometry = annoyingButtonElement.getBoundingClientRect();
        buttonPos = {"x": buttonGeometry.x, "y": buttonGeometry.y};
        annoyingButtonElement.style.position = "absolute";
        annoyingButtonElement.style.left = buttonPos.x + "px";
        annoyingButtonElement.style.top = buttonPos.y + "px";
        setInterval(doAnnoyingButton, 10);
    }
    
    var xMid = buttonPos.x + buttonGeometry.width / 2;  // Get middle positions
    var yMid = buttonPos.y + buttonGeometry.height / 2;
    var xDiff = (xMid - event.clientX);  // Get push vector
    var yDiff = (yMid - event.clientY);
    buttonPos = {"x": buttonPos.x + xDiff * 0.5, "y": buttonPos.y + yDiff * 0.5};  // Push button to get out of mouse
    
    xDiff /= buttonGeometry.width * 2;  // Normalize relative to button size
    yDiff /= buttonGeometry.height * 2;
    var mDiff = pyth(xDiff, yDiff);
    xDiff /= mDiff; yDiff /= mDiff;
    buttonVel = {"x": buttonVel.x + xDiff * buttonVals.bump, "y": buttonVel.y + yDiff * buttonVals.bump};  // Apply velocities
    
}

function doAnnoyingButton () {
    buttonPos = {"x": buttonPos.x + buttonVel.x, "y": buttonPos.y + buttonVel.y};
    annoyingButtonElement.style.left = buttonPos.x + "px";
    annoyingButtonElement.style.top = buttonPos.y + "px";
    
    buttonVel = {"x": buttonVel.x * buttonVals.drag, "y": buttonVel.y * buttonVals.drag};
}

function pressAnnoyingButton () {
    document.getElementById("audio").play();
    alert("Ya know the rules,\n   And so do I~");
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
