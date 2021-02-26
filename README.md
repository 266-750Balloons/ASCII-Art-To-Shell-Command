```
                               ______      ______       ______     ______     ______        ______              ______       __     __        _____
  ______   _  _       _       /%%%%%%|    /%%%%%%|     /%%%%%%|   /%%%%%%|   /%%%%%%|      /%%%%%%\            /%%%%%%|     /%%|   /%%|      /%%%%%%\
 / _____| |_| \ \    \ \     /%     %|   /%/          /%/           |%%|       |%%|        |%/  /%/           /%/          /%/%|  /%/%|     /%    \%%%\
| |            \ \    \ \   /%%%%%% %|  /%%%%%%%%|   /%/            |%%|       |%%|            /%/           /%/          /%/|%| /%/|%|    /%      |%%%|
| |_____   _    \ \   / /  /%/     |%|  _______/%|  /%/          ___|%%|_   ___|%%|_         /%%/___        /%/          /%/ |%|/%/ |%|   /%      /%%%/
|_______| |_|    \ \ /_/  /%/      |%| |%%%%%&%%%| /%%%%%%%%%%| /%%%%%%%%| /%%%%%%%%|      /%%%%%%%%|      /%%%%%%%%%%| /%/  |%%%/  |%|  /%%%%%%%%%/
```
# ASCII-Art-To-Shell-Command
A web app written in HTML5 and vanilla JS to turn ASCII art into an easy to paste shell command.

## Instructions
To use, paste the art into the "Paste Art in Here" box. Then, select your shell type and whether you want a newline at the beginning of the command and press "Convert." You can then click "Copy" to copy the resulting command.

## How it was made
In a few words, a whole ton of experimenting with escaping.

The longer story:
 It started out with me fiddling with an Arduino keyboard prank where it would launch Powershell and type in some commands to make the computer do funny things. I wanted to put ASCII art in it, but I found out there was a tedious process of escaping all the characters into a command. I decided that I could automate this with a little JS.
I used the .replaceAll function to escape characters that meant things to each command environment. I learned the escaping for each command interface. The hardest to write for was the Windows Command Prompt due to there being so many characters that needed to be escaped. Also, I had to chain echo commands with && to get multiple lines. Linux support was just a little annoying because I had to do some command chaining whenever there was an exclamation point in the art so that the shell didn't think it was referring to an event (Some shells support escaping the exclamation point, but in Ubuntu, that causes issues, mainly the back slash showing).

## In action
![ASCII to Shell Command Output Command Being Ran in WSL Ubuntu Linux](/readmeIMG/linux.png)
Running the output command in Linux in WSL. (Note: I am not still running Windows 7. I am just using openshell with a taskbar skin to alleviate my pain from its passing.)

![ASCII to Shell Command Output Command Being Ran in the Windows Command Prompt](/readmeIMG/cmd.png)
Running the output command in the Windows Command Prompt (with my retro Windows Terminal Theme).

![ASCII to Shell Command Output Command Being Ran in Powershell](/readmeIMG/powershell.png)
Running the output command in Windows Powershell.

## Limitations
* It seems that iOS devices are unable to have js change their favicon.
* MacOS compatibility is unknown, as I neither own a Mac or know a friend who has one and is tech savy enough to test it on their Mac.
  * To fix, make a pull request or confirm that the Bash mode works in Mac shell (make sure to list Mac OS version and what shell you are using.).
* Some styling does not work outsideb Webkit browsers (E.G custom scrollbars, dropdown option styling).

## Credits
* Alec Lownes: [Using CSS To Create a CRT](http://aleclownes.com/2017/02/01/crt-display.html)
* SS64.com: [How-to: Escape Characters, Delimiters and Quotes at the Windows command line.](https://ss64.com/nt/syntax-esc.html)
* MDN: [Mozilla Developer Documentation](https://developer.mozilla.org/en-US/)
* [W3 Schools Documentation](https://www.w3schools.com/)
* snaptortise: [konami-js](https://github.com/snaptortoise/konami-js), Copyright (c) 2017 Snaptortoise [(See MIT License)](https://github.com/snaptortoise/konami-js/blob/master/LICENSE.md)
* [ASCII Art Archive](https://www.asciiart.eu/computers/computers): Provided a whole ton of ASCII art to test.
