//If you find a problem or a potential improvement, please create a pull rquest or an issue. I'm always trying to improve.

var body = document.documentElement;
/*Getting the DOM element for the art input.*/var input = document.getElementById("asciiInput");
/*Getting the DOM element for the command output.*/var out = document.getElementById("out");
var convert = document.getElementById("convert");
var shellType = document.getElementById("shell");
var copy = document.getElementById("copy");
var copyalert = document.getElementById("copyalert");
var hiddenCredit = document.getElementById("hiddenCredit");
var nlCheck = document.getElementById("nlCheck");

//Regexes for the creation of commands for the Windows Command Prompt
const regex1 = /echo * &/ig;
const regex2 = /echo *$/ig;

//Function to convert the inputted ASCII art to a shell command and put it in the output textbox.
var convertArt = function () {
    //Each function uses the js replace function to replace command environment identifiers with escaped characters.
    if (shellType.value == "powershell") {
        console.log(shell.value);
        var art = input.value;
        art = art.replaceAll("\"", "`\"");
        art = art.replaceAll("`", "``");
        art = art.replaceAll("``\"", "```\"");
        art = art.replaceAll("$", "`$");
        art = art.replaceAll("```", "`");
        //Splits the art into an array of the lines of the art.
        var split = art.split("\n");
        //Checks if the newline checkbox is checked and decides whether to add a newline or not (I just check the style property of my js custom checkbox to save code.)
        if (nlCheck.style.textShadow === "none" || nlCheck.style.textShadow === "") {
            var result = "echo \"" + split.join("\" \"") + "\"";
        } else {
            var result = "echo \"\" \"" + split.join("\" \"") + "\"";
        }
    } else if (shellType.value == "cmd") {
        console.log(shell.value);
        var art = input.value;
        art = art.replaceAll("^", "^^");
        art = art.replaceAll("|", "^|");
        art = art.replaceAll("%", "^%");
        art = art.replaceAll("_", "^_");
        art = art.replaceAll("\"", "^\"");
        art = art.replaceAll(".", "^.");
        art = art.replaceAll("<", "^<");
        art = art.replaceAll(">", "^>");
        art = art.replaceAll("&", "^&");
        var split = art.split("\n");
        //I use the && to join commands so that the command can be pasted into batch files.
        if (nlCheck.style.textShadow === "none" || nlCheck.style.textShadow === "") {
            var result = "echo " + split.join(" && echo ");
        } else {
            var result = "echo. && echo " + split.join(" && echo ");
        }
        result = result.replaceAll(regex1, "echo. &");
        result = result.replaceAll(regex2, "echo.");
    } else if (shellType.value == "bash") {
        console.log(shell.value);
        var art = input.value;
        art = art.replaceAll("\\", "\\\\\\\\");
        art = art.replaceAll("\\n", "\\\\\\n");
        art = art.replaceAll("`", "\\`");
        art = art.replaceAll("\"", "\\\"");
        //In some Linux distros (including, sadly, Ubuntu), you are unable to escape the ! identifier, so I have to put exclamation points in their own command.
        art = art.replaceAll("!", "\"; echo -ne \"!\"; echo -ne \"");
        var split = art.split("\n");
        if (nlCheck.style.textShadow === "none" || nlCheck.style.textShadow === "") {
            var result = "echo -ne \"" + split.join("\\n") + "\\n\"";
        } else {
            var result = "echo -ne \"\\n" + split.join("\\n") + "\\n\"";
        }
    }
    //Sets the text content of the output box to the result shell command.
    out.textContent = result;
};

//Function to copy the command at the click of the copy button.
var copyArt = function () {
    out.focus()
    out.select();
    //So I never miss a character, I just set the selection range based on the length of the text in that element.
    out.setSelectionRange(0, out.textContent.length + 1);
    document.execCommand("copy");
    //Shows an alert that the command has been copied, then hides the alert again.
    copyalert.style.display = "block";
    window.setTimeout(function () {
        copyalert.style.display = "none";
    }, 800);
};

//A simple regex function that outputs if the client is running on a Unix-like OS or not.
var unixCheck = function () {
    var unix = /Android|Linux|iPhone|iPod|iPad|Mac/.test(navigator.userAgent);
    return unix;
};

//If the client is on a Unix-like OS, the favicon is changed to a unix shell prompt icon and sets the shell dropdown value to bash. Favicon changing with js does not work on iOS/iPadOS.
if (unixCheck() == true) {
    document.getElementsByTagName("link")[0].href = "favicon_unix.png";
    shellType.value = "bash";
}
/*Code from konami-js below. Copyright (c) 2017 Snaptortoise
MIT License

Copyright (c) 2017 Snaptortoise

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/
var Konami = function (callback) {
    var konami = {
        addEvent: function (obj, type, fn, ref_obj) {
            if (obj.addEventListener)
                obj.addEventListener(type, fn, false);
            else if (obj.attachEvent) {
                // IE
                obj["e" + type + fn] = fn;
                obj[type + fn] = function () {
                    obj["e" + type + fn](window.event, ref_obj);
                }
                obj.attachEvent("on" + type, obj[type + fn]);
            }
        },
        removeEvent: function (obj, eventName, eventCallback) {
            if (obj.removeEventListener) {
                obj.removeEventListener(eventName, eventCallback);
            } else if (obj.attachEvent) {
                obj.detachEvent(eventName);
            }
        },
        input: "",
        pattern: "38384040373937396665",
        keydownHandler: function (e, ref_obj) {
            if (ref_obj) {
                konami = ref_obj;
            } // IE
            konami.input += e ? e.keyCode : event.keyCode;
            if (konami.input.length > konami.pattern.length) {
                konami.input = konami.input.substr((konami.input.length - konami.pattern.length));
            }
            if (konami.input === konami.pattern) {
                konami.code(konami._currentLink);
                konami.input = '';
                e.preventDefault();
                return false;
            }
        },
        load: function (link) {
            this._currentLink = link;
            this.addEvent(document, "keydown", this.keydownHandler, this);
            this.iphone.load(link);
        },
        unload: function () {
            this.removeEvent(document, 'keydown', this.keydownHandler);
            this.iphone.unload();
        },
        code: function (link) {
            window.location = link
        },
        iphone: {
            start_x: 0,
            start_y: 0,
            stop_x: 0,
            stop_y: 0,
            tap: false,
            capture: false,
            orig_keys: "",
            keys: ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "TAP", "TAP"],
            input: [],
            code: function (link) {
                konami.code(link);
            },
            touchmoveHandler: function (e) {
                if (e.touches.length === 1 && konami.iphone.capture === true) {
                    var touch = e.touches[0];
                    konami.iphone.stop_x = touch.pageX;
                    konami.iphone.stop_y = touch.pageY;
                    konami.iphone.tap = false;
                    konami.iphone.capture = false;
                    konami.iphone.check_direction();
                }
            },
            touchendHandler: function () {
                konami.iphone.input.push(konami.iphone.check_direction());

                if (konami.iphone.input.length > konami.iphone.keys.length) konami.iphone.input.shift();

                if (konami.iphone.input.length === konami.iphone.keys.length) {
                    var match = true;
                    for (var i = 0; i < konami.iphone.keys.length; i++) {
                        if (konami.iphone.input[i] !== konami.iphone.keys[i]) {
                            match = false;
                        }
                    }
                    if (match) {
                        konami.iphone.code(konami._currentLink);
                    }
                }
            },
            touchstartHandler: function (e) {
                konami.iphone.start_x = e.changedTouches[0].pageX;
                konami.iphone.start_y = e.changedTouches[0].pageY;
                konami.iphone.tap = true;
                konami.iphone.capture = true;
            },
            load: function (link) {
                this.orig_keys = this.keys;
                konami.addEvent(document, "touchmove", this.touchmoveHandler);
                konami.addEvent(document, "touchend", this.touchendHandler, false);
                konami.addEvent(document, "touchstart", this.touchstartHandler);
            },
            unload: function () {
                konami.removeEvent(document, 'touchmove', this.touchmoveHandler);
                konami.removeEvent(document, 'touchend', this.touchendHandler);
                konami.removeEvent(document, 'touchstart', this.touchstartHandler);
            },
            check_direction: function () {
                x_magnitude = Math.abs(this.start_x - this.stop_x);
                y_magnitude = Math.abs(this.start_y - this.stop_y);
                x = ((this.start_x - this.stop_x) < 0) ? "RIGHT" : "LEFT";
                y = ((this.start_y - this.stop_y) < 0) ? "DOWN" : "UP";
                result = (x_magnitude > y_magnitude) ? x : y;
                result = (this.tap === true) ? "TAP" : result;
                return result;
            }
        }
    }

    typeof callback === "string" && konami.load(callback);
    if (typeof callback === "function") {
        konami.code = callback;
        konami.load();
    }

    return konami;
};


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Konami;
} else {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return Konami;
        });
    } else {
        window.Konami = Konami;
    }
};

//Rickrolls you for trying to cheat and unhides the secret credit for Rick Astley.
var rickroll = new Konami(function () { window.open("https://www.youtube.com/watch?v=4yPr-7q8FwI"); hiddenCredit.style.display = "Block"; });

//The event listener for the convert button to convert the art to shell command and output it.
convert.addEventListener("click", convertArt);

//The event listener to copy to art shell command.
copy.addEventListener("click", copyArt);

//I have a custom checkbox ran by js because it was easier than some crazy CSS and HTML. To check if the checkbox is checked, I just check its textshadow style property, which is off when the box is unchecked and vice versa.
nlCheck.addEventListener("click", function () {
    if (nlCheck.style.textShadow === "none" || nlCheck.style.textShadow === "") {
        nlCheck.style.color = "black";
        nlCheck.style.backgroundColor = "lightgreen";
        nlCheck.style.textShadow = "inherit";
    } else {
        nlCheck.style.color = "rgba(0,0,0,0)";
        nlCheck.style.backgroundColor = "black";
        nlCheck.style.textShadow = "none";
    }
});
