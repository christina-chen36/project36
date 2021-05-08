var dog, sadDog, happyDog, database;
var foodS, foodStock;
var addFood;
var foodObj;
var database;

//create feed and lastFed variable here

var feed;
var lastFed;
var lastFedValue;

function preload() {
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
}

function setup() {
  createCanvas(1000, 400);
  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  lastFed = database.ref("FeedTime");
  lastFed.on("value", readFeedTime);

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  //create feed the dog button here

  feed = createButton("Feed");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background(46, 139, 87);
  foodObj.display();

  //write code to read fedtime value from the database

  //write code to display text lastFed time here
  fill("black");
  if (lastFedValue) {
    var currentDate = new Date();
    currentDate.setHours(lastFedValue);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);

    text(
      "Last Hour Fed In 24 Hour Time: " + currentDate.toLocaleString(),
      200,
      30
    );
  } else {
    text("Last Hour Fed In 24 Hour Time: Never Fed", 250, 30);
  }

  drawSprites();
}

//function to read food Stock
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function readFeedTime(data) {
  lastFedValue = data.val();
}

function feedDog() {
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  foodObj.deductFood();
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour(),
  });
}

//function to add food in stock
function addFoods() {
  foodS++;
  database.ref("/").update({
    Food: foodS,
  });
}
