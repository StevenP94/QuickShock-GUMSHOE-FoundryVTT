import {qsgs} from "./module/config.js";
import QSGSItem from "./module/QSGSItem.js";
import QSGSItemSheet from "./module/sheets/QSGSItemSheet.js";
import QSGSCharSheet from "./module/sheets/QSGSCharSheet.js";
import QSGSPartySheet from "./module/sheets/QSGSPartySheet.js";

async function loadHandleBarTemplates()
{
  // register templates parts
  const templatePaths = [
    "systems/qsgs/templates/sheets/items/partials/ability-sheet.hbs",
    "systems/qsgs/templates/sheets/actors/partials/card-sheet.hbs",
    "systems/qsgs/templates/sheets/actors/partials/pc-info.hbs",
    "systems/qsgs/templates/sheets/actors/partials/pc-ability-text.hbs",
    "systems/qsgs/templates/sheets/actors/partials/pc-ability-page.hbs"
  ];
  return loadTemplates( templatePaths );
}

function registerSystemSettings() {
  game.settings.register("qsgs", "chooseGame", {
    config: true,
    scope: "world",
    name: "Game",
    hint: "Choose which QuickShock game you are playing.",
    type: String,
    choices: {
      "YKRPG - Paris": "YKRPG - Paris",
      "YKRPG - The Wars": "YKRPG - The Wars",
      "YKRPG - Aftermath": "YKRPG - Aftermath",
      "YKRPG - This Is Normal Now": "YKRPG - This Is Normal Now",
      "Trail of Cthulhu": "Trail of Cthulhu"
    },
    default: "YKRPG - Paris",
    onChange: value => {
      console.log(value);
    }

  });
}

Hooks.once("init", function() {
    console.log("quickshock-gumshoe | Initialising QuickShock GUMSHOE System");

    registerSystemSettings();

    loadHandleBarTemplates();

    CONFIG.qsgs= qsgs;
    CONFIG.Item.documentClass = QSGSItem;

    Items.unregisterSheet("core", ItemSheet)
    Items.registerSheet("quickshock-gumshoe", QSGSItemSheet, { makeDefault: true});

    Actors.unregisterSheet("core", ItemSheet)
    Actors.registerSheet("quickshock-gumshoe", QSGSCharSheet, { makeDefault: true});
    Actors.registerSheet("quickshock-gumshoe", QSGSPartySheet);

    Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });
});

Hooks.on("createActor", async function(actor) {

  let optionsSettings = game.settings.get("qsgs", "chooseGame");
  

  let packname = "qsgs.parisgenabilities"
  switch (optionsSettings) {
    case "YKRPG - The Wars": 
      packname = "qsgs.warsgenabilities";
      break;
    case "YKRPG - Aftermath":
      packname = "qsgs.aftermathgenabilities";
      break;
    case "YKRPG - This Is Normal Now":
      packname = "qsgs.normalgenabilities";
      break;
    case "Trail of Cthulhu":
      packname = "qsgs.tocgenabilities";
  }
  const pack = game.packs.get(packname);

  const content = await pack.getDocuments().then(documents => {
    return documents.map(document => document.data);
  });
  const created = await actor.createEmbeddedDocuments("Item", content);
});
