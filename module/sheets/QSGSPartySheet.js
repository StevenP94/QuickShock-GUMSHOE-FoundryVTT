export default class QSGSPartySheet extends ActorSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 1400,
            height: 1000,
            classes: ["qsgs", "sheet", "party"]
        });
    }

    get template() {
        return `systems/qsgs/templates/sheets/actors/party-sheet.hbs`;
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.qsgs;

        console.log(data.actors);
        return data;
    }
}