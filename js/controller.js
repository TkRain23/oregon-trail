class Controller {

    constructor(crew, food, tailedbeast, chakra, ryo, eventTypes) {
        this.ui = new UI(this);
        this.eventTypes = eventTypes;
        this.sasuke = new Sasuke(crew, food, tailedbeast, chakra, ryo, this.ui);
        this.updateWeight();
        this.start();
    }

    updateWeight() {
        // update weight and capacity

        let droppedKunai = 0;
        let droppedFood = 0;

        // logic to check current weight
        this.sasuke.weight = this.sasuke.food * this.sasuke.trailStats.FOOD_WEIGHT + this.sasuke.chakra * this.sasuke.trailStats.CHAKRA_WEIGHT;

        // logic for how much can sasuke carry
        this.sasuke.capacity = this.sasuke.tailedbeast * this.sasuke.trailStats.WEIGHT_PER_TAILEDBEAST + this.sasuke.crew * this.sasuke.trailStats.WEIGHT_PER_PERSON;

        // drop items behind if weight limit exceeded
        // assume that kunai are dropped before food
        while (this.sasuke.weight > this.sasuke.capacity && this.sasuke.chakra) {
            this.sasuke.chakra--;
            this.sasuke.weight -= this.sasuke.trailStats.CHAKRA_WEIGHT;
            droppedKunai++;
        }

        if (droppedKunai) {
            this.ui.notify(`dropped ${droppedKunai} kunai`, "negative", this);
        }

        while (this.sasuke.weight > this.sasuke.capacity && this.sasuke.food) {
            this.sasuke.food--;
            this.sasuke.weight -= this.sasuke.trailStats.FOOD_WEIGHT;
            droppedFood++;
        }
        if (droppedFood) {
            this.ui.notify(`dropped ${droppedFood} food`, "negative", this);
        }
    }

    updateDistance() {
        // updated covered distance
        // the higher the capacity, the slower he becomes
        let diff = this.sasuke.capacity - this.sasuke.weight;
        let speed = this.sasuke.trailStats.SLOW_SPEED + diff / this.sasuke.capacity * this.sasuke.trailStats.FULL_SPEED;
        this.sasuke.distance += speed;
    }

    consumeFood() {
        // food consumption
        this.sasuke.food -= this.sasuke.crew * this.sasuke.trailStats.FOOD_PER_PERSON;
        if (this.sasuke.food < 0) {
            this.sasuke.food = 0;
        }
    }

    start() {
        // start game
        this.gameActive = true;
        this.step();
    }

    step() {
        this.updateGame();
        if (this.gameActive) {
            //            this.gameActive=false;
            setTimeout(this.step.bind(this), this.sasuke.trailStats.GAME_SPEED);
        }
    }

    updateGame() {
        this.sasuke.day += this.sasuke.trailStats.DAY_PER_STEP;
        this.consumeFood();

        if (this.sasuke.food === 0) {
            this.ui.notify('Sasuke and his clan starved to death', 'negative', this);
            this.gameActive = false;
            return;
        }

        this.updateWeight();
        this.updateDistance();
        this.ui.refreshStats(this);

        if (this.sasuke.crew <= 0) {
            this.sasuke.crew = 0;
            this.gameActive = false;
            this.ui.notify("Sasuke and his team were wiped out", "negative", this);
            return;

        }

        if (this.sasuke.distance >= this.sasuke.trailStats.FINAL_DISTANCE) {
            this.ui.notify('Sasuke and his team returned from the mission', 'positive', this);
            this.gameActive = false;
            return;
        }

        if (Math.random() <= this.sasuke.trailStats.EVENT_PROBABILITY) {
            this.generateEvent();
        }

    }

    pause() {
        this.gameActive = false;
    }

    play() {
        this.gameActive = true;
        this.step();
    }

    generateEvent() {
        let index = Math.floor(Math.random() * this.eventTypes.length);
        let eventData = this.eventTypes[index];

        if (eventData.type == 'STAT-CHANGE') {
            this.statChange(eventData)
        };

        if (eventData.type == 'SHOP') {
            this.pause();

            //notify user
            this.ui.notify(eventData.text, eventData.notification, this);

            //prepare event
            this.shopEvent(eventData, this);
        }

        if (eventData.type == 'ATTACK') {
            this.pause();

            this.ui.notify(eventData.text, eventData.notification, this);
            this.attackEvent(eventData);
        }


    }


    statChange(eventData) {
        if (eventData.value + this.sasuke[eventData.stat] >= 0) {
            this.sasuke[eventData.stat] += eventData.value;
            this.ui.notify(eventData.text + Math.abs(eventData.value), eventData.notification, this);
        }
    }

    shopEvent(eventData) {
        let numProds = Math.ceil(Math.random() * 4);

        //product list
        let products = [];
        let j, priceFactor;

        for (let i = 0; i < numProds; i++) {
            //random product
            j = Math.floor(Math.random() * eventData.products.length);

            //multiply price by random factor +-30%
            priceFactor = 0.7 + 0.6 * Math.random();

            products.push({
                item: eventData.products[j].item,
                qty: eventData.products[j].qty,
                price: Math.round(eventData.products[j].price * priceFactor)
            });
        }

        this.ui.showShop(products, this);
    }


    buyProduct(product) {
        // check if we can affort the product
        if (product.price > this.sasuke.ryo) {
            this.ui.notify('Not enough ryo', 'negative', this);
            return false;
        }

        this.sasuke.ryo -= product.price;

        this.sasuke[product.item] += +product.qty;

        this.ui.notify('Bought ' + product.qty + ' x ' + product.item, 'positive', this);

        //update weight
        this.updateWeight();

        //update visuals
        this.ui.refreshStats(this);
    }


    attackEvent(eventData) {
        let chakra = Math.round((0.7 + 0.6 * Math.random()) * this.sasuke.trailStats.ENEMY_CHAKRA_AVG);
        let ryo = Math.round((0.7 + 0.6 * Math.random()) * this.sasuke.trailStats.ENEMY_RYO_AVG);

        this.ui.showAttack(chakra, ryo, this);
    }


    fight(chakra, ryo) {
        let damage = Math.ceil(Math.max(0, chakra * 2 * Math.random() - this.sasuke.chakra));

        // check for any survivors
        if (damage < this.sasuke.crew) {
            this.sasuke.crew -= damage;
            this.sasuke.ryo += ryo;
            this.ui.notify(damage + ' people were killed fighting', 'negative', this);
            this.ui.notify('Found $' + ryo, 'ryo', this);

        } else {
            this.sasuke.crew = 0;
            this.ui.notify('Everybody died in the fight', 'negative', this);
        }
        this.ui.hideAttack();
        this.play();
    }

    runaway(chakra) {
        // running away from enemy

        let damage = Math.ceil(Math.max(0, chakra * Math.random() / 2));

        //check there are survivors
        if (damage < this.sasuke.crew) {
            this.sasuke.crew -= damage;
            this.ui.notify(damage + ' people were killed running', 'negative', this);
        } else {
            this.sasuke.crew = 0;
            this.ui.notify('Everybody died running away', 'negative', this);
        }
        this.ui.hideAttack();
        this.play();
    }


}
