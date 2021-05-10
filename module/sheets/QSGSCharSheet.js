export default class QSGSCharSheet extends ActorSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 1000,
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
                const item = this.actor.getOwnedItem(element.data("item-id"));
                item.sheet.render(true);
            }
        },
        {
            name: "Delete",
            icon: '<i class="fas fa-trash"></i>',
            callback: element => {
                this.actor.deleteOwnedItem(element.data("item-id"))
            }
        }
    ]

    get template() {
        return `systems/qsgs/templates/sheets/actors/${this.actor.data.type}-sheet.hbs`;
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.qsgs;

        data.academic = data.items.filter(function(item) {return item.type == "InvestigativeAbility" && item.data.type == "academic"});
        data.technical = data.items.filter(function(item) {return item.type == "InvestigativeAbility" && item.data.type == "technical"});
        data.interpersonal = data.items.filter(function(item) {return item.type == "InvestigativeAbility" && item.data.type == "interpersonal"});

        data.presence = data.items.filter(function(item) {return item.type == "GeneralAbility" && item.data.type == "presence"});
        data.focus = data.items.filter(function(item) {return item.type == "GeneralAbility" && item.data.type == "focus"});
        data.physical = data.items.filter(function(item) {return item.type == "GeneralAbility" && item.data.type == "physical"});

        data.injuries = data.items.filter(function(item) {return item.type == "Card" && (item.data.type == "injury" || item.data.type == "combo")});
        data.shocks = data.items.filter(function(item) {return item.type == "Card" && (item.data.type == "shock" || item.data.type == "combo")});

        return data
    }

    activateListeners(html) {
        if (this.isEditable) {
            html.find(".item-create").click(this._onItemCreate.bind(this));
            html.find(".item-edit").click(this._onItemEdit.bind(this));
            //tabs: [{navSelector: ".tabs", contentSelector: ".content", initial: "abilities"}]

            new ContextMenu(html, ".ability-card", this.itemContextMenu);
        }
        
        //Owner-only listeners
        if (this.actor.owner) {
            html.find(".item-roll").click(this._onItemRoll.bind(this));
        }
        super.activateListeners(html);
    }

    _onItemRoll(event) {
        const itemID = event.currentTarget.closest(".item").dataset.itemId;
        console.log(itemID);
        const item = this.actor.getOwnedItem(itemID);

        item.roll();
    }

    _onItemCreate(event) {
        event.preventDefault();
        let element = event.currentTarget;

        let itemData = {
            name: "new item", //TODO: Localize. game.i18n.localize("")
            type: element.dataset.type
        };

        return this.actor.createOwnedItem(itemData);
    }

    _onItemEdit(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        let item = this.actor.getOwnedItem(itemId);

        item.sheet.render(true);
    }
}