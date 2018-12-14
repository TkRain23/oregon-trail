class Sasuke {
    constructor(crew, food, tailedbeast, chakra, ryo) {
        this.day = 0;
        this.distance = 0;
        this.crew = crew;
        this.food = food;
        this.tailedbeast = tailedbeast;
        this.chakra = chakra;
        this.ryo = ryo;

        this.trailStats = {
            WEIGHT_PER_TAILEDBEAST: 20,
            WEIGHT_PER_PERSON: 2,
            FOOD_WEIGHT: 0.6,
            CHAKRA_WEIGHT: 5,
            GAME_SPEED: 300,
            DAY_PER_STEP: 0.2,
            FOOD_PER_PERSON: 0.02,
            FULL_SPEED: 5,
            SLOW_SPEED: 3,
            FINAL_DISTANCE: 1000,
            EVENT_PROBABILITY: 0.15,
            ENEMY_CHAKRA_AVG: 5,
            ENEMY_RYO_AVG: 50
        }
    }
}
