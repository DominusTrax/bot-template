let b;
let conf;
let msg;
let arg;
let gui;

export function load(discord, bot, config, message, args, guild) {
    disc = discord;
    b = bot;
    conf = config;
    msg = message;
    arg = args;
    gui = guild;
}
export function no_perms(error) {
    let embed = new disc.RichEmbed()
        .setColor('#d30000')
        .setAuthor('ERROR: Insufficient Permissions!', b.user.displayAvatarURL)
        .setThumbnail(b.user.avatarURL)
        .setDescription(error)
        .setFooter('Insufficient Permissions!');
    return embed;
}
export function cmd_fail(error, syntax) {
    let embed = new disc.RichEmbed()
        .setColor("#8e0000")
        .setAuthor('ERROR: WRONG SYNTAX', b.user.displayAvatarURL)
        .setThumbnail(b.user.avatarURL)
        .setDescription(error)
        .setFooter(syntax);
    return embed;
}