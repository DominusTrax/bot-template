import { readdir } from "fs";
export default (bot, utils, config) => {

    // Reading Directory
    readdir("./commands/", (err, files) => {

        // Printing Errors
        if (err) console.error(err);

        // Gets JS Files
        let jsfiles = files.filter(f => f.split(".").pop() === "js");

        // If there are no JS files then it wont load
        if (jsfiles.length <= 0) return console.log("There are no commands to load");

        // Loads JS Files
        console.log(`Loading ${jsfiles.length} commands...`);
        jsfiles.forEach((f, i) => {
            // Props = Commands
            let props = require(`../commands/${f}`);
            // Prints loaded commands
            console.log(`${i + 1}: ${f} loaded!`);
            // Sets Commands
            bot.commands.set(props.cmds.name, props);
            props.cmds.aliases.forEach(alias => {
                bot.aliases.set(alias, props.cmds.name);
            });
        });
    });

    // Loads Commands
    bot.loadCommand = (commandName) => {
        try{
            // Props = Commands
            let props = require(`../commands/${commandName}`);
            if (props.init) props.init(bot);

            // Sets Commands
            bot.commands.set(commandName, props);

            // Runs through Cmds
            props.cmds.aliases.forEach(alias => {
                bot.aliases.set(alias, props.cmds.name);
            });
            return false;
        } catch (err) {
            // Errors
            return utils.cmd_fail(`Error: ${err}\nCommand \`${commandName}\` cannot be found.`, `${config.prefix}reload <command>`);
        }
    };

    // Unloads Commands
    bot.unloadCommand = async (commandName) => {
        try {
            // Command doesnt exist
            if (!commandName) return `The command \`${commandName}\` doesn"t seem to exist. Try again!`;

            // Shuts the bot down
            if (commandName.shutdown) await commandName.shutdown(bot);

            // Helps clear cache :)
            delete require.cache[require.resolve(`../commands/${commandName}.js`)];

            return false;

        } catch (err) {
            // Errors
            return utils.cmd_fail(`Error: ${err}\nCommand \`${commandName}\` cannot be found.`, `${config.prefix}reload <command>`);
        }
    };


}