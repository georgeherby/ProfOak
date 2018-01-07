let mysql = require('mysql');
const config = require("./config.json");

module.exports = {
    createDbConnect: function ()
{
    let connection = mysql.createConnection(
        {
            host: config.db_host,
            user: config.db_user,
            password: config.db_password,
            database: config.db_database,
            multipleStatements: true
        }
    );
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Database connected");
    });
    return connection;
},

    getThumbnail: function (dex_id){
        let imageID;
        switch(dex_id.toString().length) {
            case 1:
                imageID = "00"+dex_id;
                break;
            case 2:
                imageID = "0"+dex_id;
                break;
            case 3:
                imageID = dex_id;
                break;
            default:
                imageID = dex_id;
        }

        return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageID}.png`;
    },
    getDexIdFromName: function(pokemon_name, pokemonNameArray, pokemonIdArray){
        return pokemonIdArray[pokemonNameArray.indexOf(pokemon_name)];
    },
    toTitleCase: function(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
},
    isPokemon: function (pokemon, pokemonNameArray) {
        return (pokemonNameArray.indexOf(pokemon) > -1)

    },
    sendMessage(event,messageToSend){
        event.channel.send('```'+ messageToSend + '```');
    },sendEmbed(event,embed){
        event.channel.send(embed);
    }


};