const config = require("../config.json")

// Login and Set Status
// Config from config.json
module.exports = {
    ready: bot => {
      bot.login(config.token);
      bot.on("ready", () => {
      bot.user.setActivity(config.activity, {
          type: "LISTENING"
      });
        console.log(config.activity);
      });
    }
  };