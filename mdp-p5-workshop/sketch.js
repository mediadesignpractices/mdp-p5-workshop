const wordVectors = ml5.word2vec("../wordvecs10000.json", modelLoaded);

function modelLoaded() {
  console.log("Model Loaded!");
}

function printResult(err,results){
  console.log(results[0].word);
}

function setup(){
    let speechRec = new p5.SpeechRec('en-US',gotSpeech);
    let continuous = true;
    let interim = true;
    speechRec.start(continuous,interim);

    function gotSpeech(){
        if(speechRec.resultValue){
            console.log(speechRec.resultString);
        }
    }
}

wordVectors.nearest("a",printResult);
