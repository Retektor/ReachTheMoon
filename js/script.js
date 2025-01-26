// Инициализация переменных и обновления данных
let energy = 1;
let wood = 0;
let trees = 0;
let plant_tree_t = 3;
let cut_tree_t = 4;
let boiler_load = 0;
let boiler_active = false;
let clickAudio = document.getElementById("clickSound")
update();

function update(){
document.getElementById("energy_count").innerHTML = energy;
document.getElementById("wood_count").innerHTML = wood;
document.getElementById("trees_count").innerHTML = trees;
document.getElementById("trees_time").innerHTML = plant_tree_t;
document.getElementById("cut_time").innerHTML = cut_tree_t;
document.getElementById("boiler_load").innerHTML = boiler_load;
}

function playClickSound(){
    clickAudio.load();
    clickAudio.play();
}
// Инициализация завершена

function plant_tree(){
    playClickSound();
    if (energy >= 1 && plant_tree_t == 3){
        --energy;
        let flag = setInterval(() => {
            if (plant_tree_t > 0) {
                plant_tree_t = Number((plant_tree_t - 0.1).toFixed(1));
                update();
            }
            else {
                clearInterval(flag);
                plant_tree_t = 3;
                trees++;
                update();
                return;
            }
        }, 100);
    }
}

function cut_tree(){
    playClickSound();
    if (trees > 0 && cut_tree_t == 4){
        --trees;
        let flag = setInterval(() => {
            if (cut_tree_t > 0){
                cut_tree_t = Number((cut_tree_t - 0.1).toFixed(1));
                update();
            }
            else {
                clearInterval(flag)
                ++wood
                cut_tree_t = 4;
                update();
                return;
            }
        }, 100)
    }
}


function boiler_add1(){
    playClickSound();
    if (wood > 0) {
        ++boiler_load;
        --wood;
        update();
    }
}


function boiler_add10(){
    playClickSound();
    if (wood >= 10) {
        boiler_load = boiler_load + 10;
        wood = wood - 10;
        update();
    }
}


function boiler_remove1(){
    playClickSound();
    if (boiler_load > 0) {
        --boiler_load;
        ++wood;
        update();
    }
}


function boiler_remove10(){
    playClickSound();
    if (boiler_load >= 10) {
        boiler_load = boiler_load - 10;
        wood = wood + 10;
        update();
    }
}


function boiler_burn(){
    playClickSound();
    if (boiler_load > 0 && boiler_active == false){
        let flag = setInterval(() => {
            if (boiler_load > 0){
                boiler_active = true;
                boiler_load = Number((boiler_load - 0.1).toFixed(2));
                energy = Number((energy + 0.2).toFixed(2));
                update();
            }
            else{
                clearInterval(flag)
                boiler_active = false;
                update();
                return;
            }
        }, 1000)
    }
}