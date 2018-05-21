const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs")
let money = require("./money.json");
let profile = require("./profile.json");
let cdseconds = 3600000;
let coldown = new Set();
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.")
        return;
    }

   jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
   });

});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("say *help for help");
});

var acceptingAnswers = false;

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  

  if(cmd === `${prefix}hello`){
      return message.channel.send("Hello!");
  }

  if(cmd === `${prefix}goSuckABigOne`){
      return message.channel.send("No u");
  }

  if(cmd === `${prefix}help`){

      let bicon = bot.user.displayAvatarURL;
      let botembed = new Discord.RichEmbed()
      .setThumbnail(bicon)
      .setTitle("~BOT HELP COMMANDS~")
      .setColor("#42f445")
      .addField("*iHelp", "For informations help.", true)
      .addField("*fHelp", "For fun help.", true)
      .addField("*aHelp", "For administrator help.", true)
      .addField("*sHelp", "For social help.", true);

      return message.channel.send(botembed);
  }

  if(cmd === `${prefix}iHelp`){

    let infoEmbed = new Discord.RichEmbed()
    .setTitle("~INFORMATIONS HELP~")
    .setColor("#1c00ff")
    .addField("*serverInfo", "To get server informations.", true)
    .addField("*botInfo", "For bot informations.", true);
  
    message.channel.send(infoEmbed);
    return;
  }

  if(cmd === `${prefix}fHelp`){

    let funEmbed = new Discord.RichEmbed()
    .setTitle("~FUN STUFF HELP~")
    .setColor("#1c00ff")
    .addField("*joke", "For a joke.", true)
    .addField("*8ball 'question' ?","To get your bigest mysteries anwsered.", true)
    .addField("*hello", "For a nice greating", true)
    .addField("*noU", "For a endles loop.", true)
    .addField("*flipCoin", "To flip a coin.", true)
    .addField("*flipCoin", "You can flip a coin with this command.", true)

    message.channel.send(funEmbed);
    return;
  }

  if(cmd === `${prefix}aHelp`){

    let aEmbed = new Discord.RichEmbed()
    .setTitle("~ADMIN HELP~")
    .setColor("#1c00ff")
    .addField("*report 'name' 'reason'", "This command is used to report players, for this command a reports channel is needed.", true)
    .addField("*kick 'name' 'reason'", "This is the kick command it can only be accased by administratos, for this command a incidents channel is needed.", true)
    .addField("*ban 'name' 'reason'", "This is the ban command and is only accaseble by administrators, for this command a incidents channel is needed.", true)

    message.channel.send(aEmbed);
    return;
  }

  if(cmd === `${prefix}botInfo`){

     let bicon = bot.user.displayAvatarURL;
     let botembed = new Discord.RichEmbed()
     .setThumbnail(bicon)
     .setTitle("~BOT INFORMATIONS~")
     .setColor("#f44242")
     .addField("Bot name:", bot.user.username)
     .addField("Bot creation date:", bot.user.createdAt)
     .addField("Bot description:", "This bot was created for testing porpuses only.");

      return message.channel.send(botembed);
  };

  if(cmd === `${prefix}sHelp`){
    let eiEmbed = new Discord.RichEmbed()
    .setTitle("~EMOJIE, MONEY & PROFILE INFORMATIONS~")
    .setColor("#1c00ff")
    .addField("*catalog", "This command is used to show you the emoji catalog.", true)
    .addField("*profile", "This command is used to show you your profile.", true)
    .addField("*daily", "Will gibe you your daily money, it is on a 1 day coolof.", true)
    .addField("*fish", "With this command you will fish and maybe get some money off of your catch.", true)
    .addField("*resetEmojis", "This command will reset your emojis, it will cost you 200 :money_with_wings:.", true)
    .addField("*gambleFlip", "You can gamble 50 :money_with_wings: you can lose or win 2x the bet.", true)
    .addField("*transfer 'name'", "With this command you can transfer money to your friends you can only transfer 100 :money_with_wings: at once!", true)

    message.channel.send(eiEmbed);
    return;
  }

  if(cmd === `${prefix}serverInfo`){

     let sicon = message.guild.displayAvatarURL;
     let serverembed = new Discord.RichEmbed()
     .setThumbnail(sicon)
     .setTitle("~SERVER INFORMATIONS~")
     .setColor("#4292f4")
     .addField("Server name:", message.guild.name)
     .addField("server created:", message.guild.createdAt)
     .addField("Joined server:", message.member.joinedAt)
     .addField("Total members:", message.guild.memberCount);

      return message.channel.send(serverembed)
  }

  if(cmd === `${prefix}noU`){
      return message.channel.send("No U.");
  } 

  if(cmd === `${prefix}joke`){
      let jReplies = ["You.", "What is a alcoholic bevrage for males? -A cocktail.", "What concert costs 45 cents? -50 Cent featuring Nickelback.", "What are the strongest days of the week? -Saturday and Sunday. All the rest are weak-days.", "Why do seagulls live by the sea? -Cause if they lived by the bay, they'd be bagels.", "Did you hear about the new striper? -Shes making head lines.", "My Grandpa had the heart of a lion... And a life time ban from the Zoo.", "Never trust an atom... They make up everything!", "What is Beethoven's favorite fruit? -Ba-na-na-nas.", "What do vegetarian zombies say? -Grrrrrainnnnnssss.", "A backwards poet writes inverse.", "I was wondering why the baseball was getting bigger. Then it hit me.", "What's brown and sticky? A stick."];

      let jResault = Math.floor((Math.random() *jReplies.length));

      message.channel.send(jReplies[jResault]);
      return;
  }

  if(cmd === `${prefix}flipCoin`){
    let reps = ["heads", "tails"];
    let chan = Math.floor((Math.random() * reps.length) + 0);
    let chanR = reps[chan];
    message.channel.send(":regional_indicator_r: | You fliped " + chanR + "!");
    return;
  }

  if(cmd === `${prefix}report`){

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let reason = args.join(" ").slice(22);
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You need to be a adminsistrator.");
    if(rUser.hasPermission("ADMINISTRATOR")) return message.channel.send("That peron has the same or higher permissions.");
    
    let reportEmbed = new Discord.RichEmbed()
    .setDescription("~REPORT~")
    .setColor("#f2ff00")
    .addField("Reported user:", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported by:", `${message.author}`)
    .addField("Channel", message.channel)
    .addField("Time of report:", message.createdAt)
    .addField("Reason:", reason);

    let reportsChannel = message.guild.channels.find(`name`, "reports")
    if(!reportsChannel) return message.channel.send("Couldn't find reports channel.");

    message.delete().catch(O_o=>{});
    reportsChannel.send(reportEmbed);

    return;
  }

  if(cmd === `${prefix}kick`){
    
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find person");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You need to be a adminsistrator.");
    if(kUser.hasPermission("ADMINISTRATOR")) return message.channel.send("That peron has the same or higher permissions.");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~KICK~")
    .setColor("#ff9400")
    .addField("Kicked user:", `${kUser} with ID: ${kUser.id}`)
    .addField("kicked By:", `${message.author}`)
    .addField("Reason:", kReason)
    .addField("Time:", message.createdAt);

    let kickChannel = message.guild.channels.find(`name`, "incidents");
    if(!kickChannel) return message.channel.send("There is not an existend incidents channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find person");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You need to be a adminsistrator.");
    if(bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("That peron has the same or higher permissions.");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~BAN~")
    .setColor("#ff0000")
    .addField("Baned user:", `${bUser} with ID: ${bUser.id}`)
    .addField("Baned By:", `${message.author}`)
    .addField("Reason:", bReason)
    .addField("Time:", message.createdAt);

    let banChannel = message.guild.channels.find(`name`, "incidents");
    if(!banChannel) return message.channel.send("There is not an existend incidents channel.");

    message.guild.member(bUser).ban(bReason);
    banChannel.send(banEmbed);

    return;
  }
  
  if(cmd === `${prefix}8ball`){
  if(!args[1]) return message.reply("Please ask a full question.")
  let replies = ["Yes.", "No.", "Never.", "Maybe.", "I don't know.", "Ask me again later."];

  let resault = Math.floor((Math.random() * replies.length));
  let question = args.slice(1) .join(" ");

  message.channel.send(replies[resault]);
  return;
  }

  let xp = require("./xp.json");

  let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  if(!xp[message.author.id]){
      xp[message.author.id] = {
        xp: 0,
        level: 0
      };
  }
  
  
  let curXp = xp[message.author.id].xp;
  let curLvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 900;
  xp[message.author.id].xp = curXp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
      xp[message.author.id].level = curLvl + 1;
      let lvlUp = new Discord.RichEmbed()
      .setTitle("Level up!")
      .setThumbnail(message.author.avatarURL)
      .setDescription(`<@${message.author.id}>`)
      .setColor("RANDOM")
      .addField("your current level is:",  curLvl + 1)

      message.channel.send(lvlUp)
      return;
  }

  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
});

  console.log(`level is ${xp[message.author.id].level}`);

 if(!profile[message.author.id]){
  profile[message.author.id] = {
    emojis: ':black_circle:',
    emojis1: ':black_circle:',
    emojis2: ':black_circle:'
  };
};

 let emjis = profile[message.author.id].emojis;
 let emjis1 = profile[message.author.id].emojis1;
 let emjis2 = profile[message.author.id].emojis2;
 let desc = profile[message.author.id].description

 if(!money[message.author.id]){
  money[message.author.id] = {
    money: 0
  };
}

fs.writeFile("./money.json", JSON.stringify(money), (err) => {
  if(err) console.log(err)
});

 let mony = money[message.author.id].money;
 let sloF = ':flag_si:';
 let auF = ':flag_au:';
 let atF = ':flag_at:';
 let brF = ':flag_br:';
 let deF = ':flag_de:';
 let nlF = ':flag_nl:';
 let gbF = ':flag_gb:';
 let skF = ':flag_sk:';
 let rusF = ':flag_ru:';
 let czF = ':flag_cz:';
 let usF = ':flag_us:';
 let esF = ':flag_es:';
 let mfF = ':flag_mf:';
 let caF = ':flag_ca:';
 let noF = ':flag_no:';
 let G = ':regional_indicator_g:';
 let A = ':regional_indicator_a:';
 let B = ':regional_indicator_b:';
 let C = ':regional_indicator_c:';
 let D = ':regional_indicator_d:';
 let E = ':regional_indicator_e:';
 let F = ':regional_indicator_f:';
 let H = ':regional_indicator_h:';
 let I = ':regional_indicator_i:'
 let J = ':regional_indicator_j:'
 let K = ':regional_indicator_k:'
 let L = ':regional_indicator_l:'
 let M = ':regional_indicator_m:'
 let N = ':regional_indicator_n:'
 let O = ':regional_indicator_o:'
 let P = ':regional_indicator_p:'
 let R = ':regional_indicator_r:'
 let S = ':regional_indicator_s:'
 let T = ':regional_indicator_t:'
 let U = ':regional_indicator_u:'
 let V = ':regional_indicator_v:'
 let W = ':regional_indicator_w:'
 let X = ':regional_indicator_x:'
 let Y = ':regional_indicator_y:'
 let Z = ':regional_indicator_z:'
 let Q = ':regional_indicator_q:'

 if(cmd === `${prefix}buyLetterA`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = A; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + A);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = A; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ A);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = A;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + A);
    };
  };
};

if(cmd === `${prefix}buyLetterB`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = B; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + B);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = B; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ B);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = B;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + B);
    };
  };
};

if(cmd === `${prefix}buyLetterC`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = C; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + C);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = C; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ C);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = C;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + C);
    };
  };
};

if(cmd === `${prefix}buyLetterD`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = D; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + D);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = D; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ D);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = D;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + D);
    };
  };
};

if(cmd === `${prefix}buyLetterE`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = E; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + E);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = E; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ E);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = E;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + E);
    };
  };
};

if(cmd === `${prefix}buyLetterF`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = F; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + F);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = F; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ F);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = F;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + F);
    };
  };
};

if(cmd === `${prefix}buyLetterA`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = A; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + A);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = A; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ A);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = A;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + A);
    };
  };
};

if(cmd === `${prefix}buyLetteG`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = G; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + G);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = G; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ G);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = G;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + G);
    };
  };
};

if(cmd === `${prefix}buyLetterG`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = G; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + G);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = G; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ G);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = G;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + G);
    };
  };
};

if(cmd === `${prefix}buyLetterH`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = H; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + H);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = H; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ H);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = H;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + H);
    };
  };
};

if(cmd === `${prefix}buyLetterI`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = I; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + I);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = I; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ I);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = I;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + I);
    };
  };
};

if(cmd === `${prefix}buyLetterJ`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = J; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + J);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = J; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ J);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = J;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + J);
    };
  };
};

if(cmd === `${prefix}buyLetterK`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = K; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + K);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = K; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ K);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = K;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + K);
    };
  };
};

if(cmd === `${prefix}buyLetterL`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = L; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + L);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = L; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ L);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = L;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + L);
    };
  };
};

if(cmd === `${prefix}buyLetterM`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = M; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + M);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = M; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ M);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = M;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + M);
    };
  };
};

if(cmd === `${prefix}buyLetterN`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = N; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + N);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = N; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ N);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = N;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + N);
    };
  };
};

if(cmd === `${prefix}buyLetterO`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = O; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + O);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = O; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ O);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = O;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + O);
    };
  };
};

if(cmd === `${prefix}buyLetterP`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = A; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + A);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = A; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ A);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = A;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + A);
    };
  };
};

if(cmd === `${prefix}buyLetterQ`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = Q; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + Q);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = Q; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ Q);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = Q;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + Q);
    };
  };
};

if(cmd === `${prefix}buyLetterR`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = R; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + R);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = R; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ R);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = R;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + R);
    };
  };
};

if(cmd === `${prefix}buyLetterS`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = S; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + S);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = S; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ S);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = S;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + S);
    };
  };
};

if(cmd === `${prefix}buyLetterT`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = T; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + T);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = T; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ T);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = T;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + T);
    };
  };
};

if(cmd === `${prefix}buyLetterU`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = U; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + U);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = U; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ U);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = U;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + U);
    };
  };
};

if(cmd === `${prefix}buyLetterV`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = V; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + V);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = V; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ V);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = V;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + V);
    };
  };
};

if(cmd === `${prefix}buyLetterW`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = W; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + W);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = W; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ W);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = W;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + W);
    };
  };
};

if(cmd === `${prefix}buyLetterX`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = X; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + X);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = X; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ X);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = X;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + X);
    };
  };
};

if(cmd === `${prefix}buyLetterY`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = Y; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + Y);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = Y; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ Y);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = Y;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + Y);
    };
  };
};

if(cmd === `${prefix}buyLetterZ`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = Z; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to " + Z);
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = Z; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to "+ Z);
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = Z;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to " + Z);
    };
  };
};

 if(cmd === `${prefix}buyFlagSi`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = sloF; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to :flag_si:");
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = sloF; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_si:");
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = sloF;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_si:");
    };
  };
};

if(cmd === `${prefix}buyFlagAu`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = auF; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to :flag_au:");
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = auF; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_au:");
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = auF;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_au:");
    };
  };
};

if(cmd === `${prefix}buyFlagAt`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = atF; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to :flag_at:");
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = atF; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_at:");
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = atF;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_at:");
    };
  };
};

if(cmd === `${prefix}buyFlagBr`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = brF; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to :flag_br:");
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = brF; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_br:");
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = brF;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_br:");
    };
  };
};

if(cmd === `${prefix}buyFlagDe`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = deF; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to :flag_de:");
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = deF; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_de:");
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = deF;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_de:");
    };
  };
};

if(cmd === `${prefix}buyFlagNl`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = nlF; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to :flag_nl:");
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = nlF; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_nl:");
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = nlF;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_nl:");
    };
  };
};

if(cmd === `${prefix}buyFlagGb`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = gbF; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to :flag_gb:");
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = gbF; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_gb:");
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = gbF;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_gb:");
    };
  };
};

if(cmd === `${prefix}buyFlagSk`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = skF; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to :flag_sk:");
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = skF; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_sk:");
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = skF;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_sk:");
    };
  };
};

if(cmd === `${prefix}buyFlagRu`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = rusF; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to :flag_ru:");
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = rusF; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_ru:");
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = rusF;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_ru:");
    };
  };
};

if(cmd === `${prefix}buyFlagCz`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = czF; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to :flag_cz:");
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = czF; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_cz:");
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = czF;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_cz:");
    };
  };
};

if(cmd === `${prefix}buyFlagUs`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = usF; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to :flag_us:");
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = usF; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_us:");
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = usF;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_us:");
    };
  };
};

if(cmd === `${prefix}buyFlagEs`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = esF; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to :flag_es:");
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = esF; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_es:");
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = esF;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_es:");
    };
  };
};

if(cmd === `${prefix}buyFlagMf`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = mfF; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to :flag_mf:");
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = mfF; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_mf:");
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = mfF;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_mf:");
    };
  };
};

if(cmd === `${prefix}buyFlagCa`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = caF; 
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to :flag_ca:");
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = caF; 
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_ca:");
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = caF;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_ca:");
    };
  };
};

if(cmd === `${prefix}buyFlagNo`){
  if(mony < 1000) return message.channel.send("you don't have enough money");
  if(mony >= 1000){
      if(emjis == ":black_circle:"){
        profile[message.author.id].emojis = noF;
        money[message.author.id].money = mony - 1000;
        message.channel.send("Emoji set to :flag_no::");
      };
    if(emjis1 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      profile[message.author.id].emojis1 = noF;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_no:");
      };
    if(emjis2 == ":black_circle:"){
      if(emjis == ":black_circle:") return;
      if(emjis1 == ":black_circle:") return;
      profile[message.author.id].emojis2 = noF;
      money[message.author.id].money = mony - 1000;
      message.channel.send("Emoji set to :flag_no:");
    };
  };
};

if(cmd === `${prefix}resetEmojis`){
  if(mony < 200) return message.channel.send(":exclamation: | You need at least 200 :money_with_wings: to use this command"); 
  if(mony >= 200){
    if(profile[message.author.id].emjis != ":black_circle:"){
    profile[message.author.id].emojis = ":black_circle:";
    profile[message.author.id].emojis1 = ":black_circle:";
    profile[message.author.id].emojis2 = ":black_circle:";
    money[message.author.id].money = mony - 200
    message.channel.send(":white_check_mark: | Your emojies were reset!");
    }else if(profile[message.author.id].emjis = ":black_circle:"){
      message.channel.send(":exclamation: | You have no emojis to reset!")
    }
  }
};

 fs.writeFile("./profile.json", JSON.stringify(profile), (err) => {
  if(err) console.log(err)
});

  let fishV = [":paperclip:", ":paperclip:", ":paperclip:", ":page_facing_up:", ":page_facing_up:", ":page_facing_up:", ":fish:", ":fish:", ":fish:", ":fish:", ":fish:", ":tropical_fish:", ":tropical_fish:", ":fish:", ":fish:", ":fish:", ":fish:", ":tropical_fish:", ":tropical_fish:", ":blowfish:"];
  let fishR = Math.floor((Math.random() * fishV.length) + 0);
  let fishF = fishV[fishR];
  let monys = money[message.author.id].money

  if(cmd === `${prefix}fish`){  
    if(mony < 100) return message.channel.send(":exclamation: | You need at least 100:money_with_wings: to fish!")
    if(mony > 100){
      if(fishF == ":page_facing_up:"){
        money[message.author.id].money = monys - 100;
        message.channel.send(":regional_indicator_f: | You cought " + fishF + " ! You lost 100:money_with_wings:.");
      }else if(fishF == ":paperclip:"){
        money[message.author.id].money = monys - 100;
        message.channel.send(":regional_indicator_f: | You cought " + fishF + " ! You lost 100:money_with_wings:.");
      }else if(fishF == ":fish:"){
        money[message.author.id].money = monys + 50;
        message.channel.send(":regional_indicator_f: | You cought " + fishF + " ! You erned 50:money_with_wings:.")
      }else if(fishF == ":tropical_fish:"){
        money[message.author.id].money = monys + 100;
        message.channel.send(":regional_indicator_f: | You cought " + fishF + " ! You erned 100:money_with_wings:.")
      }else if(fishF == ":blowfish:"){
        money[message.author.id].money = monys + 200;
        message.channel.send(":regional_indicator_f: | You cought " + fishF + " ! You erned 200:money_with_wings:.")
      };
    };
  };

  if(cmd === `${prefix}gambleFlip`){
    if(monys < 50)return message.channel.send(":exclamation: | You need at least 50 :money_with_wings: to flip a coin!");
    if(monys >= 50){
    let coin = ["heads", "tails"];
    let coinR = Math.floor((Math.random() * coin.length) + 0);
    let flipR = coin[coinR];
    if(flipR == "tails"){
      money[message.author.id].money = monys - 100;
      message.channel.send(":regional_indicator_r: | You fliped tails, you lost 100 :money_with_wings:!");
    }else if(flipR == "heads"){
      money[message.author.id].money = monys + 50;
      message.channel.send(":regional_indicator_r: | You fliped heads, you won 100 :money_with_wings:!");
      }
    }
  }

  if(cmd === `${prefix}transfer`){
    const tUser = message.guild.member(message.mentions.users.first())
    if(!money[tUser.user.id])return message.channel.send(":exclamation: | " + tUser + " has no account yet.")
    if(monys < 100)return message.channel.send(":exclamation: | You need to have atlest 100 :money_with_wings: to transfer to: " + tUser + ".");
    if(monys >= 100){
      let uMons = money[tUser.user.id].money
      money[message.author.id].money = monys - 100;
      Math.floor(money[tUser.user.id].money = uMons + 100);
      message.channel.send(":white_check_mark: | You transfered 100 :money_with_wings: to: " + tUser + ".");
    };
  };

  fs.writeFile("./money.json", JSON.stringify(money), (err) => {
    if(err) console.log(err)
  });

  if(cmd === `${prefix}profile`){
    let pIcon = message.author.displayAvatarURL;
    let prEmbed = new Discord.RichEmbed()
    .setTitle("~PROFILE~")
    .setThumbnail(pIcon)
    .setColor("#42f492")
    .addField("Your emojis:", emjis + emjis1 + emjis2)
    .addField("Your current money:", `${money[message.author.id].money}` + ":money_with_wings:")
    .addField("Your currnet level:", curLvl)
    .addField("Your current xp:", curXp);

    message.channel.send(prEmbed);
    return;
   };

   fs.writeFile("./money.json", JSON.stringify(money), (err) => {
    if(err) console.log(err)
  });

  if(cmd === `${prefix}catalog`){
    let cEmbed = new Discord.RichEmbed()
    .setTitle("~CATALOG~")
    .setColor("#3e2ce8")
    .addField("*fCatalog", "This command will show you all the flags you can add to your profile.")
    .addField("*lCatalog", "This command will show you all the letters you can add to your profile.");

    message.channel.send(cEmbed);
    return;
  };

  if(cmd === `${prefix}flCatalog`){
    let flEmbed = new Discord.RichEmbed()
    .setTitle("~FLAGS~")
    .setColor("#f44242")
    .setDescription("Each flag costs 1000:money_with_wings:")
    .addField("Flags:", ":flag_si: :flag_au: :flag_at: :flag_br: :flag_nl: :flag_es: :flag_gb: :flag_ru: :flag_mf: :flag_de: :flag_us: :flag_sk: :flag_cz: :flag_ca:");

    message.channel.send(flEmbed);
    return;
  }

  if(cmd === `${prefix}lCatalog`){
    let lEmbed = new Discord.RichEmbed()
    .setTitle("~LETTERS~")
    .setColor("#42d4f4")
    .setDescription("Each letter costs 1000:money_with_wings:")
    .addField("Letters:", ":regional_indicator_a: :regional_indicator_b: :regional_indicator_c: :regional_indicator_d: :regional_indicator_e: :regional_indicator_f: :regional_indicator_g: :regional_indicator_h: :regional_indicator_i: :regional_indicator_j: :regional_indicator_l: :regional_indicator_m: :regional_indicator_n: :regional_indicator_o: :regional_indicator_p: :regional_indicator_q: :regional_indicator_r: :regional_indicator_s: :regional_indicator_t: :regional_indicator_u: :regional_indicator_v: :regional_indicator_w: :regional_indicator_x: :regional_indicator_y: :regional_indicator_z:");

    message.channel.send(lEmbed);
    return;
  }

  if(!message.content.endsWith("ly")) return;
  if(coldown.has(message.author.id)){
  message.delete();
  return message.channel.send(":exclamation: |  " + `<@${message.author.id}>` + " You have to wait 1 day.")
  }if(!message.member.roles.has("name", "Patito18-")){
  coldown.add(message.author.id);
  }
  if(cmd === `${prefix}daily`){
  
  let addM = 200;
  console.log(addM);
  let curM = money[message.author.id].money;
  money[message.author.id].money = curM + addM;
  let mEmbed = new Discord.RichEmbed()
  .setTitle(":white_check_mark: | Added " + addM + " money!")
  .setColor("#00c413")
  .setDescription(":money_with_wings:");

  message.channel.send(mEmbed);
  };
 
 setTimeout(() => {
 coldown.delete(message.author.id)
 }, cdseconds * 24)

fs.writeFile("./money.json", JSON.stringify(money), (err) => {
  if(err) console.log(err)
});

});
bot.login(botconfig.token)