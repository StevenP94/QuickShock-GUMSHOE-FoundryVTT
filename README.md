Foundry VTT System to run QuickShock GUMSHOE using the rules from [The GUMSHOE System Reference Document](https://site.pelgranepress.com/index.php/the-gumshoe-system-reference-document/).

Video Walkthrough [Here](https://www.youtube.com/watch?v=hcl94LStQ8o).

Supports all YKRPG books, and my own Trail of Cthulhu QuickShock Hack (can be found [here](https://github.com/ananjiani/Trail-of-Cthulhu-QuickShock-Hack)).

This repo comes as is. I haven't played this game or touched this repo in a long time. It was built for Foundry v9. It *might* work on newer versions but I can't promise anything.

## Features
* Character sheet which tracks ratings and pools for all abilities. 
* Spend points and roll from character sheet.
* Refresh pools, individually or for all general abilities, by right clicking.
* Track Injuries and Shocks on the character sheet.
* Compendia for general and investigative abilities, as well as all of the QuickShock cards from the SRD.

## Known Issues
* Having multiple roll/spend dialog boxes will make it so the number buttons stop working. Make sure you only have one open at a time.
* Duplicating a character will add all of the general abilities for your chosen system again.

## Installation

In Foundry VTT, on the Configuration and Setup's **Game Systems** sheet, click the **Install System** button at the bottom.

Paste the following **Manifest URL** to install the game system and click **Install**:

>https://raw.githubusercontent.com/ananjiani/QuickShock-GUMSHOE-FoundryVTT/master/system.json

## Using Systems

The system is preconfigured for YKRPG - Paris. If you go to "System Settings", under "Game Settings" in the sidebar, there is a dropdown to choose your game.

The general layout of the character sheet will remain the same, however certain headings will be named according to the game you chose.

## Creating PCs

PCs are created from the **Actors** tab. It will autopopulate with the General Abilities for the game you've selected. 

Drag and drop the investigative abilities for your PC from the relevant compendium manually.

## Using Abilities

Click on the ability you want to use. If it is rollable and has points, a dialog box will appear asking how much you would like to spend/roll. If it currently has no points, it will automatically roll 1d6.

Right clicking an ability opens a context menu where you can edit, refresh, whew, or delete the ability.

## Adding Cards to PCs

Cards can be added to PCs by simply dragging and dropping them from the Items directory or a compendium. They can be removed by right clicking on them, and selecting **delete** on the context menu.

## Creating Custom Abilities and Cards

General Abilities, Investigative Abilities, and Cards are all **items**. When you create an item, you can choose the type, and fill out the data accordingly.


## Credits

This work is based on the GUMSHOE SRD (found athttps://www.pelgranepress.com/index.php/the-gumshoe-system-reference-document/), a product of Pelgrane Press, developed, written, and edited by Robin D. Laws with additional material by Kenneth Hite, and licensed for our use under the Creative Commons Attribution 3.0 Unported license (http://creativecommons.org/licenses/by/3.0/).
