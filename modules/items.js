const emojiids = require("./emojiids.js")
const items = [
    {itemid: "swaglies", "name": "swaglies", "description": "random candy brand.", "price": "10", "emoji": `${emojiids["swaglies"]}`, "isanimated": false},
    {itemid: "h", "name": "h", "description": "the letter h.", "price": "50", "emoji": `${emojiids["h"]}`, "isanimated": true},
    {itemid: "weenie", "name": "weenie", "description": "delicious sausage", "price": "25", "emoji": `${emojiids["weenie"]}`, "isanimated": true},
    {itemid: "bill_nachos", "name": "BILL NACHOS™", "description": "totally not bill cipher turned into nachos, haha!", "price": "60", "emoji": `${emojiids["bill_nachos"]}`, "isanimated": false},
    {itemid: "bar_of_soap", "name": "bar of soap", "description": "literally 1 bar of soap", "price": "1", "emoji": `${emojiids["bar_of_soap"]}`, "isanimated": false},
    {itemid: "golden_bar_of_soap", "name": "golden bar of soap", "description": "if you can afford this, i think you might need to use this item to take a shower.", "price": "5000000", "emoji": `${emojiids["golden_bar_of_soap"]}`, "isanimated": false},
    {itemid: "grad_man_plush", "name": "grad man plush", "description": "official grad man merch!! buy one until they expire in... never. thank god they dont expire!", "price": "23", "emoji": `${emojiids["gradmanplush"]}`, "isanimated": false},
]

module.exports = items;