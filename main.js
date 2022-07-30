//https://teachablemachine.withgoogle.com/models/C3zDByzsK/

prediction1="";


Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach(camera)

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/C3zDByzsK/model.json',modelLoaded)

    function take_snapshot() {
         Webcam.snap(function(data_uri) {
            document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
        }
    )
}


function speak(){
    synth=window.speechSynthesis;
    speak_data_1="the first prediction is "+prediction1;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function modelLoaded(){
   console.log("Model is loaded");
}

function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,got_results);
}

function got_results(error,results){
if(error){
    console.error(error)
}
else{
console.log(results)
prediction1=results[0].label;
document.getElementById("result_emotion1").innerHTML=prediction1;
if(prediction1=="Peace"){
    document.getElementById("update_emoji1").innerHTML="&#9996";
}
if(prediction1=="Amazing"){
    document.getElementById("update_emoji1").innerHTML="&#128076";
}
if(prediction1=="Best"){
    document.getElementById("update_emoji1").innerHTML="&#128077";
}
speak();
}
}