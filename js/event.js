eventTypes = [
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'crew',
    value: -3,
    text: 'Attacked by Danzo. Casualties: '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'crew',
    value: -4,
    text: 'Eight-Tails Jinchūriki Appeared. Casualties: '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'food',
    value: -10,
    text: 'Rations stolen by bandits. Food lost: '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'ryō',
    value: -50,
    text: 'Anbu raided base. Lost 両'
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'tailed_beast',
    value: -1,
    text: 'Tailed Beast(s) Escapes. Lost: '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'food',
    value: 20,
    text: 'Found chakra fruit. Food added: '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'food',
    value: 15,
    text: 'Found ramen shop. Food added: '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'tailed_beast',
    value: 1,
    text: 'Captured Tailed Beast. New Tailed Beast: '
  },
  {
    type: 'SHOP',
    notification: 'neutral',
    text: 'You have found a shop',
    products: [
      {item: 'food', qty: 20, price: 50},
      {item: 'tailed_beast', qty: 1, price: 200},
      {item: 'chakra', qty: 2, price: 50},
      {item: 'crew', qty: 5, price: 80}
    ]
  },
  {
    type: 'SHOP',
    notification: 'neutral',
    text: 'You have found a shop',
    products: [
      {item: 'food', qty: 30, price: 50},
      {item: 'tailed_beast', qty: 1, price: 200},
      {item: 'chakra', qty: 2, price: 20},
      {item: 'crew', qty: 10, price: 80}
    ]
  },
  {
    type: 'SHOP',
    notification: 'neutral',
    text: 'Smugglers sell various goods',
    products: [
      {item: 'food', qty: 20, price: 60},
      {item: 'tailed_beast', qty: 1, price: 300},
      {item: 'chakra', qty: 2, price: 80},
      {item: 'crew', qty: 5, price: 60}
    ]
  },
  {
    type: 'ATTACK',
    notification: 'negative',
    text: 'Bandits are attacking you'
  },
  {
    type: 'ATTACK',
    notification: 'negative',
    text: 'Bandits are attacking you'
  },
  {
    type: 'ATTACK',
    notification: 'negative',
    text: 'Bandits are attacking you'
  }
];

// SasukeX.Event.generateEvent = function(){
//   //pick random one
//   var eventIndex = Math.floor(Math.random() * this.eventTypes.length);
//   var eventData = this.eventTypes[eventIndex];
//
//   //events that consist in updating a stat
//   if(eventData.type == 'STAT-CHANGE') {
//     this.stateChangeEvent(eventData);
//   }
//
//   //shops
//   else if(eventData.type == 'SHOP') {
//     //pause game
//     this.game.pauseJourney();
//
//     //notify user
//     this.ui.notify(eventData.text, eventData.notification);
//
//     //prepare event
//     this.shopEvent(eventData);
//   }
//
//   //attacks
//   else if(eventData.type == 'ATTACK') {
//     //pause game
//     this.game.pauseJourney();
//
//     //notify user
//     this.ui.notify(eventData.text, eventData.notification);
//
//     //prepare event
//     this.attackEvent(eventData);
//   }
// };
//
// SasukeX.Event.stateChangeEvent = function(eventData) {
//   //can't have negative quantities
//   if(eventData.value + this.sasuke[eventData.stat] >= 0) {
//     this.sasuke[eventData.stat] += eventData.value;
//     this.ui.notify(eventData.text + Math.abs(eventData.value), eventData.notification);
//   }
// };
//
// SasukeX.Event.shopEvent = function(eventData) {
//   //number of products for sale
//   var numProds = Math.ceil(Math.random() * 4);
//
//   //product list
//   var products = [];
//   var j, priceFactor;
//
//   for(var i = 0; i < numProds; i++) {
//     //random product
//     j = Math.floor(Math.random() * eventData.products.length);
//
//     //multiply price by random factor +-30%
//     priceFactor = 0.7 + 0.6 * Math.random();
//
//     products.push({
//       item: eventData.products[j].item,
//       qty: eventData.products[j].qty,
//       price: Math.round(eventData.products[j].price * priceFactor)
//     });
//   }
//
//   this.ui.showShop(products);
// };
//
// //prepare an attack event
// SasukeX.Event.attackEvent = function(eventData){
//   var chakra = Math.round((0.7 + 0.6 * Math.random()) * SasukeX.ENEMY_FIREPOWER_AVG);
//   var ryō = Math.round((0.7 + 0.6 * Math.random()) * SasukeX.ENEMY_ryō_AVG);
//
//   this.ui.showAttack(chakra, ryō);
// };
