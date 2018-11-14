var SasukeX = SasukeX || {};

SasukeX.Sasuke = {};

SasukeX.Sasuke.init = function(stats){
  this.day = stats.day;
  this.distance = stats.distance;
  this.crew = stats.crew;
  this.food = stats.food;
  this.tailed_beast = stats.tailed_beast;
  this.ryō = stats.ryō;
  this.chakra = stats.chakra;
};

//update weight and capacity
SasukeX.Sasuke.updateWeight = function(){
  var droppedFood = 0;
  var droppedKunai = 0;

  //how much can the sasuke carry
  this.capacity = this.tailed_beast * SasukeX.WEIGHT_PER_TAILED_BEAST + this.crew * SasukeX.WEIGHT_PER_PERSON;

  //how much weight do we currently have
  this.weight = this.food * SasukeX.FOOD_WEIGHT + this.chakra * SasukeX.FIREPOWER_WEIGHT;

  //drop things behind if it's too much weight
  //assume guns get dropped before food
  while(this.chakra && this.capacity <= this.weight) {
    this.chakra--;
    this.weight -= SasukeX.FIREPOWER_WEIGHT;
    droppedKunai++;
  }

  if(droppedKunai) {
    this.ui.notify('Left '+droppedKunai+' kunais behind', 'negative');
  }

  while(this.food && this.capacity <= this.weight) {
    this.food--;
    this.weight -= SasukeX.FOOD_WEIGHT;
    droppedFood++;
  }

  if(droppedFood) {
    this.ui.notify('Left '+droppedFood+' food provisions behind', 'negative');
  }
};

//update covered distance
SasukeX.Sasuke.updateDistance = function() {
  //the closer to capacity, the slower
  var diff = this.capacity - this.weight;
  var speed = SasukeX.SLOW_SPEED + diff/this.capacity * SasukeX.FULL_SPEED;
  this.distance += speed;
};

//food consumption
SasukeX.Sasuke.consumeFood = function() {
  this.food -= this.crew * SasukeX.FOOD_PER_PERSON;

  if(this.food < 0) {
    this.food = 0;
  }
};
