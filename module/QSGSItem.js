export default class QSGSItem extends Item {
    chatTemplate = {
        "Card": "systems/qsgs/templates/sheets/actors/partials/card-sheet.hbs",
        "InvestigativeAbility": "systems/qsgs/templates/sheets/actors/partials/card-sheet.hbs",
        "GeneralAbility": "systems/qsgs/templates/sheets/actors/partials/card-sheet.hbs"
    }

    async roll() {
        let chatData = {
            user: game.user._id,
            speaker: ChatMessage.getSpeaker()
        };

        let cardData = {
            ...this.data,
            owner: this.actor.id
        };

        chatData.roll = true;

        chatData.content = await renderTemplate(this.chatTemplate[this.type], cardData);
        return ChatMessage.create(chatData);
        
    }
}