var SasukeX = SasukeX || {};

//constants
SasukeX.WEIGHT_PER_TAILED_BEAST = 20;
SasukeX.WEIGHT_PER_PERSON = 2;
SasukeX.FOOD_WEIGHT = 0.6;
SasukeX.FIREPOWER_WEIGHT = 5;
SasukeX.GAME_SPEED = 800;
SasukeX.DAY_PER_STEP = 0.2;
SasukeX.FOOD_PER_PERSON = 0.02;
SasukeX.FULL_SPEED = 5;
SasukeX.SLOW_SPEED = 3;
SasukeX.FINAL_DISTANCE = 1000;
SasukeX.EVENT_PROBABILITY = 0.15;
SasukeX.ENEMY_FIREPOWER_AVG = 5;
SasukeX.ENEMY_GOLD_AVG = 50;

SasukeX.Game = {};

//initiate the game
SasukeX.Game.init = function(){

  //reference ui
  this.ui = SasukeX.UI;

  //reference event manager
  this.eventManager = SasukeX.Event;

  //setup sasuke
  this.sasuke = SasukeX.Sasuke;
  this.sasuke.init({
    day: 0,
    distance: 0,
    crew: 30,
    food: 80,
    tailed_beast: 2,
    ryō: 300,
    chakra: 2
  });

  //pass references
  this.sasuke.ui = this.ui;
  this.sasuke.eventManager = this.eventManager;

  this.ui.game = this;
  this.ui.sasuke = this.sasuke;
  this.ui.eventManager = this.eventManager;

  this.eventManager.game = this;
  this.eventManager.sasuke = this.sasuke;
  this.eventManager.ui = this.ui;

  //begin adventure!
  this.startJourney();
};

//start the journey and time starts running
SasukeX.Game.startJourney = function() {
  this.gameActive = true;
  this.previousTime = null;
  this.ui.notify('A New Mission Starts', 'positive');

  this.step();
};

//game loop
SasukeX.Game.step = function(timestamp) {

  //starting, setup the previous time for the first time
  if(!this.previousTime){
    this.previousTime = timestamp;
    this.updateGame();
  }

  //time difference
  var progress = timestamp - this.previousTime;

  //game update
  if(progress >= SasukeX.GAME_SPEED) {
    this.previousTime = timestamp;
    this.updateGame();
  }

  //we use "bind" so that we can refer to the context "this" inside of the step method
  if(this.gameActive) window.requestAnimationFrame(this.step.bind(this));
};

//update game stats
SasukeX.Game.updateGame = function() {
  //day update
  this.sasuke.day += SasukeX.DAY_PER_STEP;

  //food consumption
  this.sasuke.consumeFood();

  if(this.sasuke.food === 0) {
    this.ui.notify('Sasuke and his crew starved to death', 'negative');
    this.gameActive = false;
    return;
  }

  //update weight
  this.sasuke.updateWeight();

  //update progress
  this.sasuke.updateDistance();

  //show stats
  this.ui.refreshStats();

  //check if everyone died
  if(this.sasuke.crew <= 0) {
    this.sasuke.crew = 0;
    this.ui.notify('Sasuke and his team were wiped out', 'negative');
    this.gameActive = false;
    return;
  }

  //check win game
  if(this.sasuke.distance >= SasukeX.FINAL_DISTANCE) {
    this.ui.notify('Sasuke and his team returned from the mission', 'positive');
    this.gameActive = false;
    return;
  }

  //random events
  if(Math.random() <= SasukeX.EVENT_PROBABILITY) {
    this.eventManager.generateEvent();
  }
};

//pause the journey
SasukeX.Game.pauseJourney = function() {
  this.gameActive = false;
};

//resume the journey
SasukeX.Game.resumeJourney = function() {
  this.gameActive = true;
  this.step();
};


//init game
SasukeX.Game.init();
