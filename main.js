img="";
status="";
objects = [];

function preload(){

img = loadImage("dog_cat.jpg");
     
}

function setup(){

 canvas = createCanvas(380,380);
 canvas.center();
 video = createCapture(VIDEO);
 video.size(380,380);
 video.hide();
 detection = ml5.objectDetector('cocossd', modelLoaded);
 document.getElementById("status").innerHTML = "Status : Identifiying Objects.. ";

}


function modelLoaded(){
 
    console.log("Model Has Been Loaded! Enjoy!");
    status = true;
    


}

function gotResults(error,results){
  
    if (error){

         console.log(error);

    }

    else{
      
        console.log(results);
        objects = results;

    }


}

function draw(){

image(video,0,0,380,380);
 
if ( status != ""){

    detection.detect(video,gotResults);  
    
    r = random(255);
    g = random(255);
    b = random(255);

   for( i=0 ; i < objects.length ; i++){

    
    
    document.getElementById("status").innerHTML = "Status : Objects Identified";
    document.getElementById("number-of-obj").innerHTML = "No. of objects identified are : " + objects.length;

    fill(r,g,b);
    percent = floor(objects[i].confidence * 100);
    text(objects[i].label + " " + percent + "% " ,objects[i].x + 20 , objects[i].y + 20);
    noFill();
    stroke(r,g,b);
    rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
    

   }

}

}