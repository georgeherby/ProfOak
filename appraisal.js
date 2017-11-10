let utils = require("./utils.js");

module.exports = {


    getPokemonIv: function (message, stardust, hp,cp,pokemon) {
        let query = `SELECT level, cp_multiplier FROM pokemon_level where stardust = '${stardust}'`;
        let connection = utils.createDbConnect();
        let levels = [];
        let possible_combinations = [];

        connection.query(query, (err, levelInfo) => {

            let base_defence, base_attack, base_staminia = 0;
            let queryDetails = `SELECT pg_attack,pg_defence,pg_stamina FROM pokedex where name = ${pokemon} and in_game > 0`;
            connection.query(queryDetails, (err,stats) =>{
                for (let j in stats) {
                    base_defence = stats[j].pg_defence;
                    base_staminia = stats[j].pg_staminia;
                    base_attack = stats[j].pg_attack;
                }



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
                    if (ind_att <= 15) {
                        console.log(ind_att);
                        possible_combinations.push([value[1],def,ind_att])
                    }
                }

            });


            possible_combinations.forEach(function (combinations){
                let iv = ((combinations[0] + combinations[1] + combinations[2])/45)*100;
                console.log(`Sta: ${combinations[0]}  Def: ${combinations[1]} Att: ${combinations[2]} = ${iv}%`);
                message.channel.send(`Sta: ${combinations[0]}  Def: ${combinations[1]} Att: ${combinations[2]} = ${iv}%`)
            });


            });
        });
    }
}
function getIndStaminaFromHP(hp, cp_multiplier, base_staminia) {
    //Indiv =  Base Stamina -(Staminia/ CP Mutli)
    return  parseFloat(((hp / cp_multiplier) - base_staminia).toFixed(0))
}

function getIndAttack(cp, base_defence, ind_defence, base_stamina, ind_stamina, cp_mulitplier, base_attach) {
   // (CP / ((Base_Defense + Individual_Defense)^0.5 * (Base_Stamina + Individual_Stamina)^(0.5) * CPM^2 / 10)) - Base_Attack
    let def = Math.pow((base_defence + ind_defence),0.5);
    let sta = Math.pow((base_stamina + ind_stamina),0.5);
    let cp_multi = Math.pow(cp_mulitplier,2)/10;
    return parseFloat(((cp / (def * sta * cp_multi)) - base_attach).toFixed(0))

}

function getIndDefence(cp, base_attack, ind_attach, base_stamina, ind_stamina, cp_mulitplier, base_defence) {
    return (cp / ((base_attack + ind_attach) * (base_stamina + ind_stamina) ^ (0.5) * cp ^ 2 / 10)) ^ 2 - base_defence
}
