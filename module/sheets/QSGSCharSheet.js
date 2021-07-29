import * as Dice from "../dice.js";

export default class QSGSCharSheet extends ActorSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 1400,
            height: 1000,
            classes: ["qsgs", "sheet", "pc"],
            tabs: [{navSelector: ".tabs", contentSelector: ".content", initial: "abilities"}]
        });
    }

    itemContextMenu = [
        {
            name: "Edit",
            icon: '<i class="fas fa-edit"></i>',
            callback: element => {
                const item = this.actor.items.get(element.data("item-id"));
                item.sheet.render(true);
            }
        },
        {
            name: "Delete",
            icon: '<i class="fas fa-trash"></i>',
            callback: element => {
                this.actor.items.get(element.data("item-id")).delete()
            }
        },
        {
            name: "Refresh",
            icon: '<i class="fas fa-redo"></i>',
            condition: element => {
                const item = this.actor.items.get(element.data("item-id"));
                return item.type != "Card" && item.data.data.pool < item.data.data.rating;
            },
            callback: element => {
                const item = this.actor.items.get(element.data("item-id"));
                console.log(item);
                let updateObject = { data: {pool: item.data.data.rating}};
                item.update(updateObject);
            }
        },
        {
            name: "Whew",
            icon: '<i class="fas fa-wind"></i>',
            condition: element => {
                const item = this.actor.items.get(element.data("item-id"));
                return item.type != "Card" && item.data.data.pool < item.data.data.rating;
            },
            callback: element => {
                const item = this.actor.items.get(element.data("item-id"));
                console.log(item);
                let newPool = Math.min(item.data.data.pool + 2, item.data.data.rating);

                item.update({ data: {pool: newPool}});
            }
        }
    ]

    catRefreshMenu = [
        {
            name: "Refresh",
            icon: '<i class="fas fa-redo"></i>',
            callback: element => {
                const catType = element.data("category");
                console.log(catType);
                let abilitiesToRefresh = []
                if(catType == "investigative")
                    abilitiesToRefresh = this.object.items.filter(function(item) {return item.type == "InvestigativeAbility" && item.data.data.type && item.data.data.rating > 0 && item.data.data.rating > item.data.data.pool});
                else if(catType == "general")
                    abilitiesToRefresh = this.object.items.filter(function(item) {return item.type == "GeneralAbility" && item.data.data.type && item.data.data.rating > 0 && item.data.data.rating > item.data.data.pool});
                else if(catType)
                    abilitiesToRefresh = this.object.items.filter(function(item) {return item.data.data.type == catType && item.data.data.rating > 0 && item.data.data.rating > item.data.data.pool});
                
                abilitiesToRefresh.forEach(a => {
                    let updateObject = { data: {pool: a.data.data.rating}};
                    a.update(updateObject);
                });
            }
        }
    ]

    get template() {
        return `systems/qsgs/templates/sheets/actors/pc-sheet.hbs`;
    }

    getData() {
        let sheetData = super.getData();
        let gameCreated = game.settings.get("qsgs", "chooseGame");

        sheetData.data = sheetData.data.data;
        sheetData.gameCreated = gameCreated;
        sheetData.config = CONFIG.qsgs;

        sheetData.academic = sheetData.items.filter(function(item) {return item.type == "InvestigativeAbility" && item.data.type == "academic"}).sort((a, b) => a.name > b.name && 1 || -1);
        sheetData.technical = sheetData.items.filter(function(item) {return item.type == "InvestigativeAbility" && item.data.type == "technical"}).sort((a, b) => a.name > b.name && 1 || -1);
        sheetData.interpersonal = sheetData.items.filter(function(item) {return item.type == "InvestigativeAbility" && item.data.type == "interpersonal"}).sort((a, b) => a.name > b.name && 1 || -1);

        sheetData.presence = sheetData.items.filter(function(item) {return item.type == "GeneralAbility" && item.data.type == "presence"}).sort((a, b) => a.name > b.name && 1 || -1);
        sheetData.focus = sheetData.items.filter(function(item) {return item.type == "GeneralAbility" && item.data.type == "focus"}).sort((a, b) => a.name > b.name && 1 || -1);
        sheetData.physical = sheetData.items.filter(function(item) {return item.type == "GeneralAbility" && item.data.type == "physical"}).sort((a, b) => a.name > b.name && 1 || -1);
        
        if(sheetData.data.hideZeroRated == true) {
            sheetData.presence = sheetData.presence.filter(function(item) {return item.data.rating > 0});
            sheetData.focus = sheetData.focus.filter(function(item) {return item.data.rating > 0});
            sheetData.physical = sheetData.physical.filter(function(item) {return item.data.rating > 0});
        }

        sheetData.generalPoints = 0;
        sheetData.items.filter(function(item) {return item.type == "GeneralAbility" && item.data.rating > 0 }).forEach(item => {
            sheetData.generalPoints += parseInt(item.data.rating);
        });
        sheetData.injuries = sheetData.items.filter(function(item) {return item.type == "Card" && (item.data.type == "injury" || item.data.type == "combo")});
        sheetData.shocks = sheetData.items.filter(function(item) {return item.type == "Card" && (item.data.type == "shock" || item.data.type == "combo")});
        console.log(sheetData);
        return sheetData
    }


    activateListeners(html) {
        if (this.isEditable) {
            // html.find(".item-create").click(this._onItemCreate.bind(this));
            html.find(".item-edit").click(this._onItemEdit.bind(this));
            //tabs: [{navSelector: ".tabs", contentSelector: ".content", initial: "abilities"}]

            new ContextMenu(html, ".item-context", this.itemContextMenu);
            new ContextMenu(html, ".category-refresh", this.catRefreshMenu);
        }
        
        //Owner-only listeners
        if (this.actor.isOwner) {
            html.find(".item-roll").click(this._onItemRoll.bind(this));
            html.find(".spend").click(this._onSpend.bind(this));
        }
        super.activateListeners(html);
    }

    _onItemRoll(event) {
        const itemID = event.currentTarget.closest(".item").dataset.itemId;
        console.log(itemID);
        const item = this.actor.items.get(itemID);

        item.roll();
    }

    async _onSpend(event) {
        const itemID = event.currentTarget.closest(".item").dataset.itemId;
        const item = this.actor.items.get(itemID);
        const abilityPool = item.data.data.pool;

        let messageData = {
            speaker: ChatMessage.getSpeaker({actor: this}),
            flavor: item.name
        }

        if(item.type == "InvestigativeAbility" && abilityPool > 0) {
            let updateObject = { data: {pool: abilityPool - 1}};
            item.update(updateObject);

            new Roll("1").roll().toMessage(messageData);
        }
        else if(item.type == "GeneralAbility") {
            if(item.data.data.rating == 0 || item.data.data.rating == null) {
                let r = new Roll("1d6");
                r.evaluate({async: false}).toMessage(messageData);
            }    
            else
            {
                let spendOptions = await Dice.GetSpendOptions();
                let rollFormula = ""
                const points = spendOptions.points
                if(abilityPool - points >= 0)
                {
                    if(spendOptions.type == "roll")
                        rollFormula = "1d6 + @points";
                    else if(spendOptions.type == "spend")
                        rollFormula = "@points"

                    let updateObject = {data: {pool: item.data.data.pool - points}};
                    item.update(updateObject);
                    
                    new Roll(rollFormula, {points: points}).toMessage(messageData);
                }
            }

        }

    }

    // _onItemCreate(event) {
    //     event.preventDefault();
    //     let element = event.currentTarget;

    //     let itemData = {
    //         name: "new item", //TODO: Localize. game.i18n.localize("")
    //         type: element.dataset.type
    //     };

    //     return this.actor.createOwnedItem(itemData);
    // }

    _onItemEdit(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        let item = this.actor.getOwnedItem(itemId);

        item.sheet.render(true);
    }
}