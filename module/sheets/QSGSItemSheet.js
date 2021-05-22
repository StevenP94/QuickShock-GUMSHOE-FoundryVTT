export default class QSGSItemSheet extends ItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 530,
            height: 340,
            classes: ["qsgs", "sheet", "item"]
        })
    }
    
    get template() {
        return `systems/qsgs/templates/sheets/items/${this.item.data.type}-sheet.hbs`;
    }

    getData() {
        const data = super.getData();

        if(this.item.data.type == "Card"){
            console.log(data);
        }
        data.config = CONFIG.qsgs;

        return data;
    }
}