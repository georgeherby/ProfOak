let utils = require("./utils.js");
let prof = require("./prof_oak.js");

const config = require("./config.json");
const Discord = require("discord.js");
const AsciiTable = require("ascii-table");
module.exports = {
  getCoreDetailsFromUser: function(
    client,
    message,
    pokemonNameArray,
    pokemonIdArray
  ) {
    let messageContent = message.content.toLowerCase();
    //!iv 9000 154 3504 dragonite
    //!dragonite cp=3504 hp=154 stardust=9000

    let hp = messageContent.split("hp=")[1].split(" ")[0];
    let cp = messageContent.split("cp=")[1].split(" ")[0];
    let stardust = messageContent.split("stardust=")[1].split(" ")[0];
    let regex = new RegExp("( hp=)|( cp=)|( stardust=)");
    let pokemon = messageContent.split("!")[1].split(regex)[0];
    let poweredup = false;
    if (messageContent.match(new RegExp(".* poweredup=(true|false)$"))) {
      poweredup = messageContent.split("poweredup=")[1] === "true";
    }

    if (utils.isPokemon(pokemon, pokemonNameArray)) {
      getPokemonIv(
        message,
        pokemonNameArray,
        pokemonIdArray,
        stardust,
        hp,
        cp,
        pokemon,
        poweredup
      );
    } else {
      utils.sendMessage(message, "Invalid Pokemon name, please try again!");
    }
  }
};

function getPokemonIv(
  message,
  pokemonNameArray,
  pokemonIdArray,
  stardust,
  hp,
  cp,
  pokemon,
  poweredUp
) {
  let maxSta = 15;
  let maxDef = 15;
  let maxAtk = 15;
  let perfectIV = maxSta + maxDef + maxAtk;
  let query = `SELECT level, cp_multiplier FROM pokemon_level where stardust = '${stardust} ORDER BY level asc'`;
  let queryDetails = `SELECT pg_attack,pg_def,pg_stamina FROM pokedex where name = '${pokemon}' and in_game > 0`;

  query = `${query};${queryDetails}`;
  console.log(query);
  let connection = utils.createDbConnect();

  connection.query(query, function(err, results) {
    let potentialLevels = levelsByDust(results[0]);

    if (!poweredUp) {
      potentialLevels = potentialLevels.filter(function(data) {
        return data[0] % 2 === 0;
      });
    }

    let staIV, atkIV, defIV;
    let potentialHPIVs = [];

    let levelIndex;
    let levelData;
    for (levelIndex = 0; levelIndex < potentialLevels.length; levelIndex++) {
      levelData = potentialLevels[levelIndex];

      for (staIV = 0; staIV <= 15; staIV++) {
        if (testHP(hp, staIV, levelData, results[1])) {
          potentialHPIVs.push({
            levelData,
            iv: staIV
          });
        }
      }
    }

    let hpIVIndex;
    let potentialIVs = [];
    for (hpIVIndex = 0; hpIVIndex < potentialHPIVs.length; hpIVIndex++) {
      staIV = potentialHPIVs[hpIVIndex].iv;
      levelData = potentialHPIVs[hpIVIndex]; //.levelData;
      for (atkIV = 0; atkIV <= 15; atkIV++) {
        for (defIV = 0; defIV <= 15; defIV++) {
          if (testCP(cp, atkIV, defIV, staIV, levelData, results[1], pokemon)) {
            potentialIVs.push({
              atkIV,
              defIV,
              staIV,
              level: levelData.levelData[0],
              perfection:
                Math.round(10 * ((atkIV + defIV + staIV) / perfectIV) * 100) /
                10, // round to nearest 10th
              poke: pokemon
            });
          }
        }
      }
    }
    console.log(potentialIVs);

    let embed = new Discord.RichEmbed().setTitle(
      `**Possible IV For ${utils.toTitleCase(pokemon)}**`
    );
    embed.setThumbnail(
      utils.getThumbnail(
        utils.getDexIdFromName(pokemon, pokemonNameArray, pokemonIdArray)
      )
    );

    if (potentialIVs.length > 0) {
      let rows = [];
      for (let i in potentialIVs) {
        rows.push([
          potentialIVs[i].level,
          potentialIVs[i].atkIV,
          potentialIVs[i].defIV,
          potentialIVs[i].staIV,
          `${potentialIVs[i].perfection}%`
        ]);
      }

      let table = AsciiTable.factory({
        //title: `IV For ${pokemon}`,
        heading: ["Lvl", "Att", "Def", "Sta", "Tot"],
        rows: rows
      });

      embed.setDescription("```" + table.toString() + "```");
    } else {
      embed.setDescription(
        "```No possible IVs for the information supplied...```"
      );
    }

    utils.sendEmbed(message, embed);
  });
}

function levelsByDust(resultSet) {
  let levels = [];

  for (let i in resultSet) {
    levels.push([resultSet[i].level, resultSet[i].cp_multiplier]);
  }

  return levels;
}

function testCP(cp, atkIV, defIV, staIV, levelData, pokemonStats) {
  let attackFactor = pokemonStats[0].pg_attack + atkIV;
  let defenseFactor = Math.pow(pokemonStats[0].pg_def + defIV, 0.5);
  let staminaFactor = Math.pow(pokemonStats[0].pg_stamina + staIV, 0.5);
  let scalarFactor = Math.pow(levelData.levelData[1], 2);
  let calcCP = parseInt(
    (attackFactor * defenseFactor * staminaFactor * scalarFactor) / 10,
    10
  );
  return parseInt(cp) === calcCP;
}

function testHP(hp, iv, levelData, pokemonStats) {
  let baseStamina = pokemonStats[0].pg_stamina;
  let cpMultiplier = levelData[1];
  let calcHP = parseInt(Math.floor((baseStamina + iv) * cpMultiplier), 10);
  return parseInt(hp) === calcHP;
}
