//Create variables here
var dog, dogImg, dogImg1;
var database;
var foodS, foodStock;
var lastFed;
function preload()
{
  //load images here
  dogImg = loadImage("Dog.png");
  dogImg1 = loadImage("HappyDog.png");
}

function setup() {

  database = firebase.database();

  createCanvas(1000, 500);

  dog = createSprite(800,200,150,150);
  dog.addImage(dogImg1);
  dog.scale = 0.15;

  bottle = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  textSize(20);
  
  feed=createButton("Feed the dog");
  feed.position(400,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(500,95);
  addFood.mousePressed(addFoods);
}


function draw() {  

  background(46,139,87);
  bottle.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
  }

  drawSprites();
  

}

function readStock(data) {
  foodS = data.val();
  bottle.updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(dogImg);

  bottle.updateFoodStock(bottle.getFoodStock()-1);
  database.ref('/').update({
    Food:bottle.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
  
