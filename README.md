# hbot-discord
https://discord.gg/bNeQwCBb

h

![dancing h](images/dancingletters/h.gif)

<!-- install nodejs, clone the repo and run ```npm install discord.js better-sqlite3 lyntr.js``` -->
install nodejs, clone the repo and run ```npm install discord.js better-sqlite3```

edit the configEXAMPLE.json file.
token is your bot's token.
guildId is the id of your bot's testing server.
clientId is the application id of your bot.
once you are done with editing the file, rename it to config.json
<!-- shelved feature for now. will come back soon
# lyntr.js functionallity

if you want to use lyntr.js with your server, here's what to do
-->

# emojis
if you want the emojis of the bot to work, follow my steps

1. go to your bot's application.
2. go to the "emojis tab"
![emoji tab](images/github/emojitab.png)

3. you will see this page
![emoji page](images/github/emojipage.png)

4. you want to upload all the images from the "images/dancingletters" and the "images/emojis" folder into this page. do NOT rename the emojis!
5. go to the modules/emojiids.js file and find the emojiids table. replace every id from the table with the id from the emoji tab. so, for example you wanted to replace the letter h's emoji id. you would go into the emoji tab of your application, find the letter h emoji and then copy the emoji id. then in the table, find the letter h and replace the id with the id from your application's emoji tab.
6. once you did all of that, once you try the dancingwords command, it should work!

i know this is tedious, but im not the best coder in the world. sorry :/