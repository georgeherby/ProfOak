const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
let utils = require("./utils.js");
let appraisal = require("./appraisal.js");

let pokemon = [];
let pokemon_id = [];
let prefix = config.prefix;

client.on("ready", () => {
  loadPokemonArray(utils.createDbConnect(), "SELECT * FROM pokedex");
  if (config.single_channel) {
    if (config.single_channel_name) {
      console.log("Run only in " + config.single_channel_name);
    } else {
      console.log(
        "You did not specify a channel name even though you set single_channel to true"
      );
      process.exit();
    }
  } else {
    console.log("All channel");
    if (config.single_channel_name) {
      console.log(
        "You specified a single channel but single_channel needs to be true in config file so allowing output from all channels..."
      );
    }
  }
});

client.on("message", message => {
  if (message.channel.type === "dm") {
  } else if (
    config.single_channel &&
    message.channel.name === config.single_channel_name
  ) {
    listeners(message);
  } else if (!config.single_channel) {
    listeners(message);
  }
});

function listeners(message) {
  let messageContent = message.content.toLowerCase();
  if (messageContent.startsWith(config.prefix)) {
    if (
      message.content
        .toLowerCase()
        .match(
          new RegExp(
            "![A-z0-9 ().'-]+ " +
              "(((cp=[0-9]+ hp=[0-9]+ stardust=[0-9]+))|(cp=[0-9]+ stardust=[0-9]+ hp=[0-9]+)|" +
              "(hp=[0-9]+ cp=[0-9]+ stardust=[0-9]+)|(hp=[0-9]+ stardust=[0-9]+ cp=[0-9]+)|" +
              "(stardust=[0-9]+ hp=[0-9]+ cp=[0-9]+)|" +
              "(stardust=[0-9]+ cp=[0-9]+ hp=[0-9]+))" +
              "( poweredup=(true|false))?"
          )
        )
    ) {
      console.log("IV Check");
      appraisal.getCoreDetailsFromUser(client, message, pokemon, pokemon_id);
    } else if (
      pokemon.indexOf(messageContent.split(config.prefix)[1].toLowerCase()) > -1
    ) {
      sendPokemonDetails(utils.createDbConnect(), message);
      deleteMessage(message);
    } else if (
      pokemon_id.indexOf(parseInt(messageContent.split(config.prefix)[1])) > -1
    ) {
      sendPokemonDetails(utils.createDbConnect(), message);
      deleteMessage(message);
    } else if (messageContent.startsWith(prefix + "egg ")) {
      let split = messageContent.split(prefix + "egg ");
      if (pokemon.indexOf(split[1]) > -1) {
        console.log("Getting specific egg details for " + split[1]);
        getSingleMonEgg(utils.createDbConnect(), split[1], message);
      } else if (split[1].match("(2|5|7|10)(km)?")) {
        let distance;
        if (split[1].endsWith("km")) {
          distance = split[1].substr(0, split[1].length - 2);
        } else {
          distance = split[1];
        }
        console.log(`Get ${distance}km egg chart`);
        getDistanceChart(utils.createDbConnect(), distance, message);
      } else {
        utils.sendMessage(message, "Invalid pokemon name");
      }
    } else if (messageContent.startsWith(prefix + "boss ")) {
      let split = messageContent.split(prefix + "boss ");
      if (pokemon.indexOf(split[1]) > -1) {
        console.log("Specific Boss Details for " + split[1]);
        getSingleBoss(utils.createDbConnect(), split[1], message);
      } else if (split[1].match("[1-5]")) {
        console.log("Boss List for level " + split[1]);
        getBossTierList(utils.createDbConnect(), split[1], message);
      } else {
        utils.sendMessage(message, "Invalid boss name");
      }
    }
  }
}

function deleteMessage(message) {
  if (config.delete_user_message === true) {
    message.delete();
  }
}

function getSingleMonEgg(connection, pokeName, message) {
  let query = `SELECT * FROM pokedex where pokedex.name = '${pokeName}' and is_egg > 0`;
  connection.query(query, (err, rows) => {
    let embed;
    let notInGame = false;
    let notInEgg = false;
    for (let i in rows) {
      if (rows[i].in_game > 0) {
        embed = new Discord.RichEmbed().setTitle(
          `${rows[i].name} ${
            rows[i].is_shiny === 1 ? "<:sparkles:468894032274391042>" : ""
          }`
        );
        embed.setThumbnail(utils.getThumbnail(rows[i].dex_id));
        embed.setDescription(
          `${rows[i].egg_distance}km\n${rows[i].level_20_min} to ${
            rows[i].level_20_max
          } CP`
        );
        utils.sendEmbed(message, embed);
      } else {
        //TODO Fix error message - issues with mega types
        /*if (rows[i].in_game === 0 ){
                    notInGame = true;
                }else{
                    if (rows[i].is_egg !==1){
                        notInEgg = true;
                    }
                }
                */
      }
    }

    if (notInGame === true || notInEgg === true) {
      if (notInGame) {
        utils.sendMessage(
          message,
          "This pokemon is not in the game. If you believe this is wrong please let an Admin know"
        );
      }
      if (notInEgg) {
        utils.sendMessage(
          message,
          "This pokemon is not in eggs. If you believe this is wrong please let an Admin know"
        );
      }
    }
  });
}

function getSingleBoss(connection, pokeName, message) {
  let query = `SELECT dex_id,
    name,
    capture_rate * 100 AS capture_rate,level_20_min,
    level_20_max,
    level_25_min,
    level_25_max,
    raid_cp,
    weather,
    is_raid,
    IFNULL(weakness, "None") as weakness,
    IFNULL(double_weakness, "None") as double_weakness,
    IFNULL(resistance, "None") as resistance,
    IFNULL(double_resistance, "None") as double_resistance 
    FROM pokedex 
    where name = '${pokeName}' 
        AND in_game > 0`;

  connection.query(query, (err, rows) => {
    let embed;
    for (let i in rows) {
      if (rows[i].is_raid > 0) {
        embed = new Discord.RichEmbed().setTitle(`${rows[i].name}`);
        embed.setFooter(
          `${
            rows[i].is_raid === 2 ||
            rows[i].is_raid === 0 ||
            rows[i].is_raid === null
              ? " OLD BOSS"
              : " ACTIVE BOSS"
          }`
        );
        let imageID;
        switch (rows[i].dex_id.toString().length) {
          case 1:
            imageID = "00" + rows[i].dex_id;
            break;
          case 2:
            imageID = "0" + rows[i].dex_id;
            break;
          case 3:
            imageID = rows[i].dex_id;
            break;
          default:
            imageID = rows[i].dex_id;
        }
        embed.setThumbnail(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageID}.png`
        );
        embed.setDescription(`**Raid CP:** ${
          rows[i].raid_cp
        }\n**Boosted In: ** ${rows[i].weather}\n**Min CP:** ${
          rows[i].level_20_min
        } **Boosted: **${rows[i].level_25_min}\n**Max CP:** ${
          rows[i].level_20_max
        } **Boosted: **${rows[i].level_25_max}\n**Capture Rate:** ${
          rows[i].capture_rate
        }%\n\n**Weakness: **${rows[i].weakness}\n**Double Weakness: **${
          rows[i].double_weakness
        }\n**Resistance: **${rows[i].resistance}\n**Double Resistance: **${
          rows[i].double_resistance
        }
                `);
        utils.sendEmbed(message, embed);
      } else {
        utils.sendMessage(message, "This is not a boss!");
      }
    }
  });
}

function getBossTierList(connection, level, message) {
  let query = `SELECT pokemon_id,
  capture_rate * 100 AS capture_rate,
  level_20_min,
  level_20_max,
    level_25_min,
  level_25_max,
  weather,
  is_raid,
  is_shiny
  FROM pokedex
  where raid_level = ${level}
  ORDER BY is_raid,NAME ASC`;

  let embed = new Discord.RichEmbed().setTitle(`Tier ${level} Raid Bosses`);
  connection.query(query, (err, rows) => {
    let unsent = false;
    let limit = 25;
    for (let i in rows) {
      if (i < limit) {
        if (rows[i].is_raid === 1) {
          embed.addField(
            `${rows[i].pokemon_id} ${
              rows[i].is_shiny === 1 ? "<:sparkles:468894032274391042>" : ""
            }`,
            `**Normal:** ${rows[i].level_20_min}- ${
              rows[i].level_20_max
            }cp  \n**Boosted: **${rows[i].level_25_min} - ${
              rows[i].level_25_max
            }cp  \n**Capture Rate:** ${rows[i].capture_rate}%`,
            true
          );
        }
        unsent = true;
      } else if (parseInt(i) === limit) {
        utils.sendEmbed(message, embed);
        limit = limit + 25;
        embed = new Discord.RichEmbed().setTitle(
          `${level} Raid Boss Chart cont.`
        );
        if (rows[i].is_raid === 1) {
          embed.addField(
            `${rows[i].pokemon_id} ${
              rows[i].is_shiny === 1 ? "<:sparkles:468894032274391042>" : ""
            }`,
            `**Normal:** ${rows[i].level_20_min}- ${
              rows[i].level_20_max
            }cp  \n**Boosted: **${rows[i].level_25_min} - ${
              rows[i].level_25_max
            }cp  \n**Capture Rate:** ${rows[i].capture_rate}%`,
            true
          );
        }
        unsent = true;
      } else {
        if (rows[i].is_raid === 1) {
          embed.addField(
            `${rows[i].pokemon_id} ${
              rows[i].is_shiny === 1 ? "<:sparkles:468894032274391042>" : ""
            }`,
            `**Normal:** ${rows[i].level_20_min}- ${
              rows[i].level_20_max
            }cp  \n**Boosted: **${rows[i].level_25_min} - ${
              rows[i].level_25_max
            }cp  \n**Capture Rate:** ${rows[i].capture_rate}%`,
            true
          );
        }
        unsent = true;
      }
    }
    if (unsent) {
      utils.sendEmbed(message, embed);
    }
  });
}

function getDistanceChart(connection, distance, message) {
  let query = `SELECT * 
  FROM pokedex
  where egg_distance = ${distance} 
    AND is_egg >0`;
  let embed = new Discord.RichEmbed().setTitle(`${distance}km Egg Chart`);
  connection.query(query, (err, rows) => {
    let unsent = false;
    let limit = 25;
    for (let i in rows) {
      if (i < limit) {
        embed.addField(
          `${rows[i].name} ${
            rows[i].is_shiny === 1 ? "<:sparkles:468894032274391042>" : " "
          }`,
          `${rows[i].level_20_min} to ${rows[i].level_20_max} CP`,
          true
        );
        unsent = true;
      } else if (parseInt(i) === limit) {
        utils.sendEmbed(message, embed);
        limit = limit + 25;
        embed = new Discord.RichEmbed().setTitle(
          `${distance}km Egg Chart cont.`
        );
        embed.addField(
          `${rows[i].name} ${
            rows[i].is_shiny === 1 ? "<:sparkles:468894032274391042>" : ""
          }`,
          `${rows[i].level_20_min} to ${rows[i].level_20_max} CP`,
          true
        );
        unsent = true;
      } else {
        embed.addField(
          `${rows[i].name} ${
            rows[i].is_shiny === 1 ? "<:sparkles:468894032274391042>" : ""
          }`,
          `${rows[i].level_20_min} to ${rows[i].level_20_max} CP`,
          true
        );
        unsent = true;
      }
    }
    if (unsent) {
      utils.sendEmbed(message, embed);
    }
  });
}

function sendPokemonDetails(connection, message) {
  let reg = new RegExp("^[0-9]+$");
  let query = null;
  let evo_query = null;

  if (message.content.split(config.prefix)[1].match(reg)) {
    let dexID = parseInt(message.content.split(config.prefix)[1], 10);
    query = `SELECT *
    FROM pokedex dex
    LEFT JOIN pokemon_moves mapping on dex.dex_id = mapping.pokemon_id
    LEFT JOIN moves ON moves.move_id = mapping.move_id
    LEFT Join in_game game ON dex.in_game = game.in_game
    WHERE dex.dex_id ='${dexID}'
    ORDER BY form asc`;

    evo_query = `SELECT family,
    name,
    evolution_stage,
    generation
    FROM pokedex
    WHERE family in 
        (SELECT DISTINCT family]
            FROM pokedex
            WHERE dex_id ='${dexID}' AND form IS NULL) 
    ORDER BY family, evolution_stage`;
  } else {
    query = `SELECT *
    FROM pokedex dex
    LEFT JOIN pokemon_moves mapping on dex.dex_id = mapping.pokemon_id
    LEFT JOIN moves ON moves.move_id = mapping.move_id
    LEFT Join in_game game ON dex.in_game = game.in_game
    WHERE dex.name ='${message.content
      .split(config.prefix)[1]
      .toLowerCase()}' ORDER BY form asc`;

    evo_query = `SELECT family,
    name,
    evolution_stage,
    generation
    FROM pokedex dex
    WHERE family in (SELECT FAMILY FROM pokedex where name = '${message.content
      .split(config.prefix)[1]
      .toLowerCase()}' AND form is null) ORDER BY family, evolution_stage`;
  }

  let messageToSend = "";
  let cMoves, qMoves;
  let messageEmbed = new Discord.RichEmbed();
  query = query + "; " + evo_query;
  console.log(query);
  connection.query(query, function(err, results) {
    if (err) throw err;
    let lastForm;
    let rows = results[0];
    for (let i in rows) {
      messageEmbed.title = `No: ${rows[i].dex_id} - ${rows[i].name}`;
      let imageID;
      let length = rows[i].dex_id.toString().length;
      switch (length) {
        case 1:
          imageID = "00" + rows[i].dex_id;
          break;
        case 2:
          imageID = "0" + rows[i].dex_id;
          break;
        case 3:
          imageID = rows[i].dex_id;
          break;
        default:
          imageID = rows[i].dex_id;
      }

      messageEmbed.setThumbnail(utils.getThumbnail(rows[i].dex_id));
      if (rows[i].form === null) {
        //Base Form
        lastForm = rows[i].form;
        messageToSend = `__**Base Form (${rows[i].game_status})**__`;
      } else {
        //Special Forms
        if (lastForm !== rows[i].form) {
          messageToSend = `${messageToSend}\n\n__**${rows[i].form} (${
            rows[i].game_status
          })**__`;
        }
      }

      if (!(rows[i].type_1 === null)) {
        if (lastForm !== rows[i].form || rows[i].form === null) {
          messageToSend = `${messageToSend}\n**Types:** ${rows[i].type_1}${
            rows[i].type_2 === null ? `` : `/${rows[i].type_2}`
          }`;
        }
      }

      if (
        !(
          rows[i].pg_stamina === null &&
          rows[i].pg_def === null &&
          rows[i].pg_attack === null
        )
      ) {
        messageToSend = `${messageToSend}\n**Sta:** ${
          rows[i].pg_stamina
        } **Att:** ${rows[i].pg_attack} **Def:** ${rows[i].pg_def}`;

        if (rows[i].in_game !== 0) {
          messageToSend = `${messageToSend}\n**Max CP (Lvl 40):** ${
            rows[i].level_40_max
          }\n**Buddy Distance:** ${rows[i].buddy}km`;
        }

        if (!(rows[i].move_type === null)) {
          if (rows[i].move_type === "C") {
            if (cMoves === undefined) {
              cMoves = rows[i].move_name;
            } else {
              cMoves = `${cMoves}, ${rows[i].move_name}`;
            }
          }
          if (rows[i].move_type === "Q") {
            if (qMoves === undefined) {
              qMoves = rows[i].move_name;
            } else {
              qMoves = `${qMoves}, ${rows[i].move_name}`;
            }
          }
          if (lastForm !== rows[i].form || rows[i].form === null) {
            messageToSend = `${messageToSend}\n**Quick Moves:** ${qMoves}\n**Charge Moves:** ${cMoves}`;
          }
        }
      } else {
        if (lastForm !== rows[i].form || rows[i].form === null) {
          messageToSend = `${messageToSend}\n__Main Game Stats (Not PoGo)__\n**Sta:** ${
            rows[i].base_hp
          } **Att:** ${rows[i].base_attack} **Def:** ${rows[i].base_defense}`;
        }
      }
      lastForm = rows[i].form;
    }
    messageToSend = messageToSend + "\n\n__**Evolutions**__";
    let level1, level2, level3;
    rows = results[1];
    let oldFamily;
    for (let i in rows) {
      switch (rows[i].evolution_stage) {
        case 1:
          if (level1 === undefined) {
            level1 = rows[i].name + ` (Gen ${rows[i].generation})`;
          } else {
            level1 =
              level1 + "\n" + rows[i].name + ` (Gen ${rows[i].generation})`;
          }
          break;
        case 2:
          if (level2 === undefined) {
            level2 = rows[i].name + ` (Gen ${rows[i].generation})`;
          } else {
            level2 =
              level2 + "\n" + rows[i].name + ` (Gen ${rows[i].generation})`;
          }
          break;
        case 3:
          if (level3 === undefined) {
            level3 = rows[i].name + ` (Gen ${rows[i].generation})`;
          } else {
            level3 =
              level3 + "\n" + rows[i].name + ` (Gen ${rows[i].generation})`;
          }
          break;
        default:
          break;
      }
      oldFamily = rows[i].family;
    }
    if (level1 !== undefined) {
      if (level3 === undefined && level2 === undefined) {
        messageEmbed.addField("Only Evolution", level1, false);
      } else {
        messageEmbed.addField("Base Evolution", level1, false);
      }
    }
    if (level2 !== undefined) {
      if (level3 === undefined) {
        messageEmbed.addField("Top Evolution", level2, false);
      } else {
        messageEmbed.addField("Middle Evolution", level2, false);
      }
    }
    if (level3 !== undefined) {
      messageEmbed.addField("Top Evolution", level3, false);
    }
    console.log(messageToSend);

    messageEmbed.description = messageToSend;

    utils.sendEmbed(message, messageEmbed);
  });
  console.log("Database connection closed");
}

function loadPokemonArray(connection, query) {
  connection.query(query, (err, rows) => {
    if (err) throw err;
    let count = 0;
    for (let i in rows) {
      pokemon.push(rows[i].name.toLowerCase());
      pokemon_id.push(rows[i].dex_id);
      count++;
    }
    console.log(`${count} Pokemon loaded into array for validation`);
  });
  connection.end();
}

function sentenceCase(str) {
  if (str === null || str === "") return false;
  else str = str.toString();
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

if (config.test) {
  client.login(config.test_token);
} else {
  client.login(config.discord_token);
}
