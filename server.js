import express from 'express';
var app = express()
import { json } from 'body-parser';
import discord, { Client, Collection } from "discord.js";
import { ready as _ready } from "./handlers/ready.js";
import { message as _message } from "./handlers/message.js";
import config from "./config.json";
import utils from "./global/utils.js";
import { Database } from "sqlite3";
const bot = new Client();
app.use(json())
require("./global/functions.js")(bot, utils, config);

// Makes the database
var db = new Database("./database.db");

// Gets Everything Ready
bot.commands = new Collection();
bot.aliases = new Collection();
_ready(bot);
_message(bot, utils, config, discord);

// Port Listening
var listener = app.listen(`3000`, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});