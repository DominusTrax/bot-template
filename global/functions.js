const fs = require('fs');
module.exports = (bot, utils, config) => {

    fs.readdir("./commands/", (err, files) => {

        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");

        if (jsfiles.length <= 0) return console.log("There are no commands to load...");

        console.log(`Loading ${jsfiles.length} commands...`);
        jsfiles.forEach((f, i) => {
            let props = require(`../commands/${f}`);
            console.log(`${i + 1}: ${f} loaded!`);
            bot.commands.set(props.cmds.name, props);
            props.cmds.aliases.forEach(alias => {
                bot.aliases.set(alias, props.cmds.name);
            });
        });
    });

    bot.loadCommand = (commandName) => {
        try {
            let props = require(`../commands/${commandName}`);
            if (props.init) props.init(bot);
            bot.commands.set(commandName, props);
            props.cmds.aliases.forEach(alias => {
                bot.aliases.set(alias, props.cmds.name);
            });
            return false;
        } catch (err) {
            return utils.cmd_fail(`Error: ${err}\nCommand \`${commandName}\` cannot be found.`, `${config.prefix}reload <command>`);
        }
    };

    bot.unloadCommand = async (commandName) => {
        try {
            if (!commandName) return `The command \`${commandName}\` doesn"t seem to exist. Try again!`;

            if (commandName.shutdown) await commandName.shutdown(bot);
            delete require.cache[require.resolve(`../commands/${commandName}.js`)];
            return false;
        } catch (err) {
            return utils.cmd_fail(`Error: ${err}\nCommand \`${commandName}\` cannot be found.`, `${config.prefix}reload <command>`);
        }
    };
}