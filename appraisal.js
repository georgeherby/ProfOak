let utils = require("./utils.js");

module.exports = {


    getPokemonIv: function (message, stardust, hp,cp,pokemon, client) {
        let query = `SELECT level, cp_multiplier FROM pokemon_level where stardust = '${stardust}'`;
        let queryDetails = `SELECT pg_attack,pg_def,pg_stamina FROM pokedex where name = '${pokemon}' and in_game > 0`;


        query = `${query};${queryDetails}`;
        console.log(query);
        let connection = utils.createDbConnect();
        let levels = [];
        let possible_combinations = [];

        connection.query(query, function(err, results){


            console.log(1);
            let base_defence, base_attack, base_staminia = 0;
            let stats = results[1];

                for (let j in stats) {
                    base_defence = stats[j].pg_def;
                    base_staminia = stats[j].pg_stamina;
                    base_attack = stats[j].pg_attack;
                    console.log(`Base Defence: ${base_defence} Base Stamina: ${base_staminia} Base Attack: ${base_attack}`)
                }


            let levelInfo = results[0];
            for (let i in levelInfo) {
                // All possible pokemon levels
                let ind_sta = getIndStaminaFromHP(hp,levelInfo[i].cp_multiplier,base_staminia);
                console.log(`Level: ${levelInfo[i].level} -  Sta IV: ${ind_sta}`);
                if (ind_sta <=15.0){
                    levels.push([levelInfo[i].level, ind_sta,levelInfo[i].cp_multiplier])
                }
            }



            levels.forEach(function (value){
                console.log(value[0]);
                console.log(value[1]);
                console.log(value[2]);

                for (let def = 0;def <= 15; def++){
                    let ind_att = getIndAttack(cp,base_defence,def,base_staminia,value[1],value[2],base_attack);
                    console.log(`TESTING Sta: ${value[1]}  Def: ${def} Att: ${ind_att}`);
                    if (ind_att <= 15) {
                        console.log(ind_att);
                        if(isCorrectCP(base_staminia,value[1],base_defence,def,base_attack,ind_att,value[2],cp) && isCorrectHP(hp,base_staminia,value[1],value[2])) {
                            console.log('Legal IV for CP.');
                            possible_combinations.push([value[1], def, ind_att])
                        }
                    }
                }

            });

            let ivList = [];
            possible_combinations.forEach(function (combinations){
                let iv = ((combinations[0] + combinations[1] + combinations[2])/45)*100;
                console.log(`Sta: ${combinations[0]}  Def: ${combinations[1]} Att: ${combinations[2]} = ${iv}%`);
                ivList.push(iv);
            });

            if(ivList.length >0){
                ivList.sort(function(a, b){return a-b});
                message.channel.send(`IV between ${parseFloat(ivList[0]).toFixed(1)}% to ${parseFloat(ivList[ivList.length-1]).toFixed(1)}%`);
                possible_combinations.forEach(function (combinations) {
                    let iv = parseFloat((combinations[0] + combinations[1] + combinations[2])/45*100).toFixed(1);
                    message.channel.send(`Sta: ${combinations[0]}  Def: ${combinations[1]} Att: ${combinations[2]} = ${iv}%`)
                });
            }

            });
    }
};


function isCorrectCP(base_hp, inv_hp, base_def, inv_def, base_att, inv_att, cp_multi, cp){
    //(Attack * Defense^0.5 * Stamina^0.5 * CP_Multiplier^2) / 10

    let total = ((base_att + inv_att) * (Math.pow(base_def + inv_def,0.5)) * (Math.pow(base_hp + inv_hp,0.5) * Math.pow(cp_multi,2) ))/10;

    //return (cp - 1 <= total) && (total <= cp + 1);
    return Math.trunc(total) === parseInt(cp)
}

function isCorrectHP(stamina, base_hp, inv_hp, cp_multi){
    //Stamina = (Base Stamina + Individual Stamina) * CP_Multiplier
    return parseInt(stamina) === Math.trunc((base_hp + inv_hp) * cp_multi);
}



function getIndStaminaFromHP(hp, cp_multiplier, base_staminia) {
    //Indiv =  Base Stamina -(Staminia/ CP Mutli)
    //return  parseFloat(((hp / cp_multiplier) - base_staminia).toFixed(0))
    return  Math.ceil(parseFloat(((hp / cp_multiplier) - base_staminia)))


}

function getIndAttack(cp, base_defence, ind_defence, base_stamina, ind_stamina, cp_multiplier, base_attack) {
   // (CP / ((Base_Defense + Individual_Defense)^0.5 * (Base_Stamina + Individual_Stamina)^(0.5) * CPM^2 / 10)) - Base_Attack
    let def = Math.pow((base_defence + ind_defence),0.5);
    let sta = Math.pow((base_stamina + ind_stamina),0.5);
    let cp_multi = Math.pow(cp_multiplier,2)/10;
    //return parseFloat(((cp / (def * sta * cp_multi)) - base_attack).toFixed(0))
    return Math.ceil(((cp / (def * sta * cp_multi)) - base_attack))

}

function getIndDefence(cp, base_attack, ind_attach, base_stamina, ind_stamina, cp_mulitplier, base_defence) {
    return (cp / ((base_attack + ind_attach) * (base_stamina + ind_stamina) ^ (0.5) * cp ^ 2 / 10)) ^ 2 - base_defence
}
