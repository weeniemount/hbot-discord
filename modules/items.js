const emojiids = require("./emojiids.js")
const items = [
    {itemid: "swaglies", "name": "swaglies", "description": "random candy brand.", "price": "10", "emoji": `${emojiids["swaglies"]}`, "isanimated": false},
    {itemid: "h", "name": "h", "description": "the letter h.", "price": "50", "emoji": `${emojiids["h"]}`, "isanimated": true},
    {itemid: "weenie", "name": "weenie", "description": "delicious sausage", "price": "25", "emoji": `${emojiids["weenie"]}`, "isanimated": true},
    {itemid: "bill_nachos", "name": "BILL NACHOS™", "description": "totally not bill cipher turned into nachos, haha!", "price": "60", "emoji": `${emojiids["bill_nachos"]}`, "isanimated": false},
]

module.exports = items;