var SasukeX = SasukeX || {};

SasukeX.UI = {};

//show a notification in the message area
SasukeX.UI.notify = function(message, type){
  document.getElementById('updates-area').innerHTML = '<div class="update-' + type + '">Day '+ Math.ceil(this.sasuke.day) + ': ' + message+'</div>' + document.getElementById('updates-area').innerHTML;
};

//refresh visual stats
SasukeX.UI.refreshStats = function() {
  //modify the dom
  document.getElementById('stat-day').innerHTML = Math.ceil(this.sasuke.day);
  document.getElementById('stat-distance').innerHTML = Math.floor(this.sasuke.distance);
  document.getElementById('stat-crew').innerHTML = this.sasuke.crew;
  document.getElementById('stat-tailed_beast').innerHTML = this.sasuke.tailed_beast;
  document.getElementById('stat-food').innerHTML = Math.ceil(this.sasuke.food);
  document.getElementById('stat-ryō').innerHTML = this.sasuke.ryō;
  document.getElementById('stat-chakra').innerHTML = this.sasuke.chakra;
  document.getElementById('stat-weight').innerHTML = Math.ceil(this.sasuke.weight) + '/' + this.sasuke.capacity;

  //update sasuke's crew position
  document.getElementById('sasuke').style.left = (380 * this.sasuke.distance/SasukeX.FINAL_DISTANCE) + 'px';
};

//show shop
SasukeX.UI.showShop = function(products){

  //get shop area
  var shopDiv = document.getElementById('shop');
  shopDiv.classList.remove('hidden');

  //init the shop just once
  if(!this.shopInitiated) {

    //event delegation
    shopDiv.addEventListener('click', function(e){
      //what was clicked
      var target = e.target || e.src;

      //exit button
      if(target.tagName == 'BUTTON') {
        //resume journey
        shopDiv.classList.add('hidden');
        SasukeX.UI.game.resumeJourney();
      }
      else if(target.tagName == 'DIV' && target.className.match(/product/)) {

        console.log('buying')

        var bought = SasukeX.UI.buyProduct({
          item: target.getAttribute('data-item'),
          qty: target.getAttribute('data-qty'),
          price: target.getAttribute('data-price')
        });

        if(bought) target.html = '';
      }
    });

    this.shopInitiated = true;
  }

  //clear existing content
  var prodsDiv = document.getElementById('prods');
  prodsDiv.innerHTML = '';

  //show products
  var product;
  for(var i=0; i < products.length; i++) {
    product = products[i];
    prodsDiv.innerHTML += '<div class="product" data-qty="' + product.qty + '" data-item="' + product.item + '" data-price="' + product.price + '">' + product.qty + ' ' + product.item + ' - 両' + product.price + '</div>';
  }

  //setup click event
  //document.getElementsByClassName('product').addEventListener(SasukeX.UI.buyProduct);
};

//buy product
SasukeX.UI.buyProduct = function(product) {
  //check we can afford it
  if(product.price > SasukeX.UI.sasuke.ryō) {
    SasukeX.UI.notify('Not enough ryō', 'negative');
    return false;
  }

  SasukeX.UI.sasuke.ryō -= product.price;

  SasukeX.UI.sasuke[product.item] += +product.qty;

  SasukeX.UI.notify('Bought ' + product.qty + ' x ' + product.item, 'positive');

  //update weight
  SasukeX.UI.sasuke.updateWeight();

  //update visuals
  SasukeX.UI.refreshStats();

  return true;

};

//show attack
SasukeX.UI.showAttack = function(chakra, gold) {
  var attackDiv = document.getElementById('attack');
  attackDiv.classList.remove('hidden');

  //keep properties
  this.chakra = chakra;
  this.gold = gold;

  //show chakra
  document.getElementById('attack-description').innerHTML = 'Chakra: ' + chakra;

  //init once
  if(!this.attackInitiated) {

    //fight
    document.getElementById('fight').addEventListener('click', this.fight.bind(this));

    //run away
    document.getElementById('runaway').addEventListener('click', this.runaway.bind(this));

    this.attackInitiated = true;
  }
};

//fight
SasukeX.UI.fight = function(){

  var chakra = this.chakra;
  var gold = this.gold;

  var damage = Math.ceil(Math.max(0, chakra * 2 * Math.random() - this.sasuke.chakra));

  //check there are survivors
  if(damage < this.sasuke.crew) {
    this.sasuke.crew -= damage;
    this.sasuke.ryō += gold;
    this.notify(damage + ' people were killed fighting', 'negative');
    this.notify('Found 両' + gold, 'gold');
  }
  else {
    this.sasuke.crew = 0;
    this.notify('Everybody died in the fight', 'negative');
  }

  //resume journey
  document.getElementById('attack').classList.add('hidden');
  this.game.resumeJourney();
};

//runing away from enemy
SasukeX.UI.runaway = function(){

  var chakra = this.chakra;

  var damage = Math.ceil(Math.max(0, chakra * Math.random()/2));

  //check there are survivors
  if(damage < this.sasuke.crew) {
    this.sasuke.crew -= damage;
    this.notify(damage + ' people were killed running', 'negative');
  }
  else {
    this.sasuke.crew = 0;
    this.notify('Everybody died running away', 'negative');
  }

  //remove event listener
  document.getElementById('runaway').removeEventListener('click');

  //resume journey
  document.getElementById('attack').classList.add('hidden');
  this.game.resumeJourney();

};
