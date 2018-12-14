class UI {
    constructor() {
        this.attackInitiated = false;

    }

    notify(message, type, game) {
        document.getElementById('updates-area').innerHTML = '<div class="update-' + type + '">Day ' + Math.ceil(game.sasuke.day) + ': ' + message + '</div>' + document.getElementById('updates-area').innerHTML;
    }

    //refresh visual sasuke stats
    refreshStats(game) {
        //modify the dom
        document.getElementById('stat-day').innerHTML = Math.ceil(game.sasuke.day);
        document.getElementById('stat-distance').innerHTML = Math.floor(game.sasuke.distance);
        document.getElementById('stat-crew').innerHTML = game.sasuke.crew;
        document.getElementById('stat-tailedbeast').innerHTML = game.sasuke.tailedbeast;
        document.getElementById('stat-food').innerHTML = Math.ceil(game.sasuke.food);
        document.getElementById('stat-ryo').innerHTML = game.sasuke.ryo;
        document.getElementById('stat-chakra').innerHTML = game.sasuke.chakra;
        document.getElementById('stat-weight').innerHTML = Math.ceil(game.sasuke.weight) + '/' + game.sasuke.capacity;

        //update sasuke's crew position
        document.getElementById('sasuke').style.left = (380 * game.sasuke.distance / game.sasuke.trailStats.FINAL_DISTANCE) + 'px';
    };


    showAttack(chakra, ryo, controller) {
        let attackDiv = document.getElementById('attack');
        attackDiv.classList.remove('hidden');

        //keep properties
        this.chakra = chakra;
        this.ryo = ryo;

        //show chakra
        document.getElementById('attack-description').innerHTML = 'Chakra: ' + chakra;

        //init once
        if (!this.attackInitiated) {

            //fight
            document.getElementById('fight').addEventListener('click', () => {
                controller.fight(chakra, ryo)
            });

            //run away
            document.getElementById('runaway').addEventListener('click', () => {
                controller.runaway(chakra)
            });

            this.attackInitiated = true;
        }
    };

    hideAttack() {
        document.getElementById('attack').classList.add('hidden');
    }



    showShop(products, game) {
        // display shop

        // get shop area
        let shopDiv = document.getElementById('shop');
        shopDiv.classList.remove('hidden');

        //init the shop just once
        if (!this.shopInitiated) {

            //event delegation
            shopDiv.addEventListener('click', function(e) {

                //what was clicked
                let target = e.target || e.src;

                //exit button
                if (target.tagName == 'BUTTON') {
                    //resume journey
                    shopDiv.classList.add('hidden');
                    game.play();
                } else if (target.tagName == 'DIV' && target.className.match(/product/)) {

                    // buys the product
                    game.buyProduct({
                        item: target.getAttribute('data-item'),
                        qty: target.getAttribute('data-qty'),
                        price: target.getAttribute('data-price')
                    });

                }
            });

            this.shopInitiated = true;
        }

        //clear existing content
        let prodsDiv = document.getElementById('prods');
        prodsDiv.innerHTML = '';

        //show products
        let product;
        for (let i = 0; i < products.length; i++) {
            product = products[i];
            prodsDiv.innerHTML += '<div class="product" data-qty="' + product.qty + '" data-item="' + product.item + '" data-price="' + product.price + '">' + product.qty + ' ' + product.item + ' - $' + product.price + '</div>';
        }
    }
}
