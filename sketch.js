
var dog, dogImg,food,foodStock,database,happyDogImg,milkBottleImg,lastFed,fedTime

function preload()
{
dogImg=loadImage("images/dogImg.png")	
happyDogImg=loadImage("images/dogImg1.png")	
milkBottleImg=loadImage("images/Milk.png")
}

function setup() {
	createCanvas(800, 800);
  dog=createSprite(600,400,20,20)
  dog.addImage(dogImg)
  dog.scale=0.3
  database=firebase.database()
  foodStock=database.ref('food')
  foodStock.on("value",readStock)


feed=createButton("Feed the dog")
feed.position(700,95)
feed.mousePressed(feedDog)

addFood=createButton("Add Food")
addFood.position(800,95)
addFood.mousePressed(addFoods)

}


function draw() {  
  background(46, 139, 87)
  drawSprites();
  textSize(18)
  fill("white")
  stroke("white") 
  text("Note: Press UP_ARROW Key To Feed Fluffy Milk",200,100)
//if(keyWentDown(UP_ARROW)){

  //writeStock(food)
//dog.addImage(happyDogImg)}

fedTime=database.ref('FeedTime')
fedTime.on("value",function(data){

  lastFed=data.val()
})

fill(255,255,254)
textSize(15)

if(lastFed>=12){
text("Last Feed :" + lastFed%12 + "PM" ,350, 30)
}
else if(lastFed==0){
text("Last Fed : 12AM",350,30)
}
else{
  text("Last Feed : " + lastFed + "AM",350,30)
}



}

function readStock(data){
food=data.val()

}

function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }
database.ref('/').update({
  food:x
})



  }
  
  function feedDog(){
dog.addImage(happyDogImg)

foodObj.updateFoodStock(foodObj.getFoodStock()-1)
database.ref('/').update({

Food:foodObj.getFoodStock(),
FeedTime:hour()
})
}

function addFoods(){

foodStock++
database.ref('/').update({

food:foodStock


})

}



