// Получение данных из локального хранилища
if (localStorage.getItem("energy") == null){energy = 1;} else{energy = Number(localStorage.getItem("energy"));}
if (localStorage.getItem("wood") == null){wood = 0;} else{wood = Number(localStorage.getItem("wood"));}
if (localStorage.getItem("trees") == null){trees = 0;} else{trees = Number(localStorage.getItem("trees"));}
if (localStorage.getItem("cut_tree_c") == null){cut_tree_c = 25;} else{cut_tree_c = Number(localStorage.getItem("cut_tree_c"));}
if (localStorage.getItem("boiler_load") == null){boiler_load = 0;} else{boiler_load = Number(localStorage.getItem("boiler_load"));}
if (localStorage.getItem("water_volume") == null){water_volume = 0;} else{water_volume = Number(localStorage.getItem("water_volume"));}
if (localStorage.getItem("max_water_volume") == null){max_water_volume = 5;} else{max_water_volume = Number(localStorage.getItem("max_water_volume"));}
if (localStorage.getItem("plant_tree_t") == null){plant_tree_t = 10;} else{plant_tree_t = Number(localStorage.getItem("plant_tree_t"));}
if (localStorage.getItem("steam") == null){steam = 0;} else{steam = Number(localStorage.getItem("steam"));}
if (localStorage.getItem("steamGenerator_volume") == null){steamGenerator_volume = 0;} else{steamGenerator_volume = Number(localStorage.getItem("steamGenerator_volume"));}
if (localStorage.getItem("steamGenerator_maxvolume") == null){steamGenerator_maxvolume = 100;} else{steamGenerator_maxvolume = Number(localStorage.getItem("steamGenerator_maxvolume"));}

// Инициализация нехранимых переменных
pouring_water = false;
boiler_active = false;

const clickSound = document.getElementById("clickSound");
const denySound = document.getElementById("denySound");
const autosaveSound = document.getElementById("autosaveSound");
const burnStartSound = document.getElementById("burnStartSound");
const burnLoopSound = document.getElementById("burnLoopSound");
burnLoopSound.loop = true;
const burnStopSound = document.getElementById("burnStopSound");
denySound.volume = 0.3;
autosaveSound.volume = 0.1;

// Инициализация функций
function update(){
    document.getElementById("energy_count").innerHTML = energy.toFixed(2);
    document.getElementById("wood_count").innerHTML = wood;
    document.getElementById("trees_count").innerHTML = trees;
    document.getElementById("trees_time").innerHTML = plant_tree_t.toFixed(1);
    document.getElementById("cut_clicks").innerHTML = cut_tree_c;
    document.getElementById("boiler_load").innerHTML = boiler_load;
    document.getElementById("water_volume").innerHTML = water_volume.toFixed(1);
    document.getElementById("max_water_volume").innerHTML = max_water_volume;
    document.getElementById("burn_speed").innerHTML = 0.1;
    document.getElementById("steamGenerator_count").innerHTML = steam.toFixed(2);
    }
    
    
function save(){
    localStorage.setItem("energy", energy);
    localStorage.setItem("wood", wood);
    localStorage.setItem("trees", trees);
    localStorage.setItem("boiler_load", boiler_load);
    localStorage.setItem("water_volume", water_volume);
    localStorage.setItem("max_water_volume", max_water_volume);
    localStorage.setItem("steam", steam);
    localStorage.setItem("steamGenerator_volume", steamGenerator_volume);
    localStorage.setItem("steamGenerator_maxvolume", steamGenerator_maxvolume);
    }


setInterval(() => {
    save();
    autosaveSound.play();
    document.getElementById("autosave").style.opacity = "100%";
    setTimeout(() => {
        document.getElementById("autosave").style.transitionDuration = "3s";
        document.getElementById("autosave").style.opacity = "0%";
    }, 500)
    document.getElementById("autosave").style.transitionDuration = "0s";
}, 60000)

update();
// Инициализация завершена


function plant_tree(){
    clickSound.load();
    clickSound.play();
    if (energy >= 1 && plant_tree_t == Number((10).toFixed(2))){
        --energy;
        let flag = setInterval(() => {
            if (plant_tree_t > 0) {
                plant_tree_t = Number((plant_tree_t - 0.1).toFixed(1));
                update();
            }
            else {
                clearInterval(flag);
                plant_tree_t = Number((10).toFixed(2));
                trees++;
                update();
                return;
            }
        }, 100);
    }
    else{
        denySound.load();
        denySound.play();
        document.getElementById("plant_button").style.backgroundColor = "rgb(255, 93, 93)";
        setTimeout(() => {
            document.getElementById("plant_button").style.transitionDuration = "0.5s";
            document.getElementById("plant_button").style.backgroundColor = "white";
        }, 100)
        document.getElementById("plant_button").style.transitionDuration = "0s";
    }
}

function speed_up(){
    if (plant_tree_t < 10){
        clickSound.load();
        clickSound.play();
        plant_tree_t = plant_tree_t - 0.05;
        update();
    }
    else{
        clickSound.load();
        clickSound.play();
        denySound.load();
        denySound.play();
        document.getElementById("speed_up_button").style.backgroundColor = "rgb(255, 93, 93)";
        setTimeout(() => {
            document.getElementById("speed_up_button").style.transitionDuration = "0.5s";
            document.getElementById("speed_up_button").style.backgroundColor = "white";
        }, 100)
        document.getElementById("speed_up_button").style.transitionDuration = "0s";
    }
}


function cut_tree(){
    clickSound.load();
    clickSound.play();
    if (trees > 0){
        --cut_tree_c;
        if (cut_tree_c == 0){
            ++wood
            --trees
            cut_tree_c = 25;
        }
        update();
    }
    else{
        denySound.load();
        denySound.play();
        document.getElementById("cut_button").style.backgroundColor = "rgb(255, 93, 93)";
        setTimeout(() => {
            document.getElementById("cut_button").style.transitionDuration = "0.5s";
            document.getElementById("cut_button").style.backgroundColor = "white";
        }, 100)
        document.getElementById("cut_button").style.transitionDuration = "0s";
    }
}


function boiler_add1(){
    clickSound.load();
    clickSound.play();
    if (wood > 0 && boiler_active == false) {
        ++boiler_load;
        --wood;
        update();
    }
}


function boiler_add10(){
    clickSound.load();
    clickSound.play();
    if (wood >= 10 && boiler_active == false) {
        boiler_load = boiler_load + 10;
        wood = wood - 10;
        update();
    }
}


function boiler_remove1(){
    clickSound.load();
    clickSound.play();
    if (boiler_load > 0 && boiler_active == false) {
        --boiler_load;
        ++wood;
        update();
    }
}


function boiler_remove10(){
    clickSound.load();
    clickSound.play();
    if (boiler_load >= 10 && boiler_active == false) {
        boiler_load = boiler_load - 10;
        wood = wood + 10;
        update();
    }
}


function boiler_burn(){
    clickSound.load();
    clickSound.play();
    if (boiler_load > 0 && boiler_active == false && water_volume > 0){
        burnStartSound.play();
        setTimeout(() => {
            burnLoopSound.load();
            burnLoopSound.play();
        }, 500)
        let flag = setInterval(() => {
            if (boiler_load > 0 && water_volume > 0){
                boiler_active = true;
                water_volume = Number((water_volume - 0.01).toFixed(2));
                boiler_load = Number((boiler_load - 0.01).toFixed(2));
                steam = steam + 0.1;
                energy = Number((energy + 0.025).toFixed(3));
                update();
            }
            else{
                burnLoopSound.load();
                burnStopSound.play();
                burnLoopSound.pause();
                burnLoopSound.currentTime = 0;
                clearInterval(flag)
                boiler_active = false;
                update();
                return;
            }
        }, 100)
    }
    else{
        denySound.load();
        denySound.play();
        document.getElementById("burn_button").style.backgroundColor = "rgb(255, 93, 93)";
        setTimeout(() => {
            document.getElementById("burn_button").style.transitionDuration = "0.5s";
            document.getElementById("burn_button").style.backgroundColor = "white";
        }, 100)
        document.getElementById("burn_button").style.transitionDuration = "0s";
    }
}


function pour_water(){
    clickSound.load();
    clickSound.play();
    if (water_volume < max_water_volume && pouring_water == false) {
        let flag = setInterval(() => {
            if (water_volume < max_water_volume){
                pouring_water = true;
                boiler_active = true;
                water_volume = Number((water_volume + 0.1).toFixed(2));
                update();
            }
            else {
                clearInterval(flag);
                boiler_active = false;
                pouring_water = false;
                update();
                return;
            }
        }, 100)
    }
}