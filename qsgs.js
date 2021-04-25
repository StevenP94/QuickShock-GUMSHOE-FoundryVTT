import {qsgs} from "./module/config.js";
import QSGSItemSheet from "./module/sheets/QSGSItemSheet.js";
import QSGSCharSheet from "./module/sheets/QSGSCharSheet.js";

async function loadHandleBarTemplates()
{
  // register templates parts
  const templatePaths = [
    "systems/qsgs/templates/sheets/items/partials/ability-sheet.hbs"
  ];
  return loadTemplates( templatePaths );
}

Hooks.once("init", function() {
    console.log("quickshock-gumshoe | Initialising QuickShock GUMSHOE System");

    loadHandleBarTemplates();

    CONFIG.qsgs= qsgs;

    Items.unregisterSheet("core", ItemSheet)
    Items.registerSheet("quickshock-gumshoe", QSGSItemSheet, { makeDefault: true});

    Actors.unregisterSheet("core", ItemSheet)
    Actors.registerSheet("quickshock-gumshoe", QSGSCharSheet, { makeDefault: true});
});