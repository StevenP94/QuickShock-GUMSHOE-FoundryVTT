export default class QSGSCharSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["qsgs", "sheet", "actor"]
        });
    }

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
}