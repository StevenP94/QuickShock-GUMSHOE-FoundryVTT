export function invSpend() {
    let baseDice = "";
    let rollFormula = "";
    let rollData = {};
    let messageData = {
        speaker: ChatMessage.getSpeaker()
    }

    new Roll(rollFormula, rollData).roll().toMessage(messageData);
}

export async function genSpend() {
    let spendOptions = await GetSpendOptions();
    
    let baseDice = "";
    let rollFormula = "";
    let rollData = {};
    let messageData = {
        speaker: ChatMessage.getSpeaker()
    }

    new Roll(rollFormula, rollData).roll().toMessage(messageData);
}

export async function GetSpendOptions() {
    const template = "systems/qsgs/templates/chat/spend-dialog.hbs";
    const html = await renderTemplate(template, {});

    return new Promise(resolve => {
        const data = {
            title: "spend",
            content: html,
            buttons: {
                spend: {
                    label: "Simple Spend",
                    callback: html => resolve(_processSpend(html[0].querySelector("form")))
                },
                roll: {
                    label: "Roll",
                    callback: html => resolve(_processRoll(html[0].querySelector("form")))
                }
            },
            default: "spend",
            close: () => resolve({cancelled: true})
        };

        new Dialog(data, null).render(true);
    });
}

function _processSpend(form) {
    return {
        points: parseInt(form.points.value),
        type: "spend"
    }
}

function _processRoll(form) {
    return {
        points: parseInt(form.points.value),
        type: "roll"
    }
}
