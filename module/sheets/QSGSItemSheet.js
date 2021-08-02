export default class QSGSItemSheet extends ItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 530,
            height: 340,
            classes: ["qsgs", "sheet", "item"]
        })
    }
    
    get template() {
        return `systems/qsgs/templates/sheets/items/${this.item.data.type}-sheet.hbs`.toLowerCase();
    }

    getData() {
        let sheetData = super.getData();
        sheetData.data = sheetData.data.data;
        
        sheetData.config = CONFIG.qsgs;

        return sheetData;
    }

}