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
        data.invabilities = data.items.filter(function(item) {return item.type == "InvestigativeAbility"});
        data.genabilities = data.items.filter(function(item) {return item.type == "GeneralAbility"});
        data.injuries = data.items.filter(function(item) {return item.type == "Card"})

        return data
    }
}