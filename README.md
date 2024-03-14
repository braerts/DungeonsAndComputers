# DungeonsAndComputers
A dungeons and dragons game you can play with your very own chatbot dungeon master, you do need your own ChatGPT 3.5 Turbo Token to play.

This is dungeons and computers.
In the above html, css and javascript files you'll find the functionality of the web application.
Open whichever version you want to try and double tap the Index.html file to open it. You might be prompted to select an application to open it or it might open a text editor, if this is the case make sure your default html opening software is the browser of your choise by rightclicking and selecting open with.

The Dice.js file is a tiny javascript file that allows you to open and close the dice menu overlay.
The Music.js file allows you to toggle the music on and off on the site.
Scripts.js is the main javascript file of the web application and handles most of the logical opperation aswell as communicate with the API and up- and download save files.

If you download a file using the download button you will be given a file called logs.json. The file might have an extension for instance logs(3).json. This is not a problem and does not need to be changed. If you close out of the browser and want to continue playing another time you can just upload the latest logs.json file that the website gave you and it will load all the information you need to continue playing where you left off. Please note that the formatting and optimalisations I used make it so that reading back all the dialogue from a previous time playing can be a bit harder, this however would also not be possible in a real dungeons and dragons game and instead you would have to rely on the notes you took and asking the dungeons master anyways so I felt it was worth the trade off making the application use slightly less tokens and be smaller in file size.

Furthermore you have the Styles.css and Index.html files. These both show you how the formatting of the website is going to look. The Styles.css file contains a mediaquerry that checks if the resolution of the screen this is being played on is larger then 1200 pixels in width to show the desktop version and smaller then 1200 pixels in width to show the mobile version. Keep this in mind when you play on lower resolution screens or in windowed mode.

The Index.html doesnt contain much that is interesting so I wont be covering that in here. It should be self explanitory and thus also does not include any comments.

Good luck on your quest adventurer.

One final note, The Beta 0.5 release of the webapp was the final version of the game but without the css overhaul, This was, however, made after all the old css code got removed to make space for the overhaul. It is thus that this version is not recommended to be played since containers will be all over the place and it will be a nightmare to play. In 99% of usecases beta 0.4 and release 1.0.0 are the best versions and will stay that way.
