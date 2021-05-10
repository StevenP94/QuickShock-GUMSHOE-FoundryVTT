export default class QSGSItem extends Item {
    chatTemplate = {
        "Card": "systems/qsgs/templates/sheets/actors/partials/card-sheet.hbs"
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

        chatData.content = await renderTemplate(this.chatTemplate["Card"], cardData)

        chatData.roll = true;

        return ChatMessage.create(chatData);
    }
}