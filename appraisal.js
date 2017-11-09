let utils = require("./utils.js");

module.exports = {


    getPokemonIv: function (stardust, message, hp,cp) {
        let query = `SELECT level, cp_multiplier FROM pokemon_level where stardust = '${stardust}'`;
        let connection = utils.createDbConnect();
        let levels = [];
        let possible_combinations = [];

        connection.query(query, (err, rows) => {
            for (let i in rows) {
                // All possible pokemon levels
                //TODO Get Pokemon Base stats
                let ind_sta = getIndStaminaFromHP(hp,rows[i].cp_multiplier,182);
                console.log(`Level: ${rows[i].level} -  Sta IV: ${ind_sta}`);
                if (ind_sta <=15.0){
                    levels.push([rows[i].level, ind_sta,rows[i].cp_multiplier])
                }
            }


            levels.forEach(function (value){
                console.log(value[0]);
                console.log(value[1]);
                console.log(value[2]);

                for (let def = 0;def <= 15; def++){
                    let ind_att = getIndAttack(cp,201,def,182,value[1],value[2],263);
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
