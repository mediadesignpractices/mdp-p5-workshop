const wordVectors = ml5.word2vec("wordvecs10000.json", modelLoaded);

function modelLoaded() {
  console.log("Model Loaded!");
}

function printResult(err,results){
  // console.log(results[0].word);
  return results[0].word;
}

function setup(){
    let speechRec = new p5.SpeechRec('en-US',gotSpeech);
    let continuous = true;
    let interim = false;
    speechRec.start(continuous,interim);

    var ipaddress = "10.4.17.64";
    var connected = false;
    websocket = new WebSocket("ws://"+ipaddress);
    websocket.onopen = function (event){
        connected = true;
    }


    function gotSpeech(){
        if(speechRec.resultValue){
            all_words = speechRec.resultString.split(" ");
            full_sentence = "";
            for(let i=0; i<all_words.length; i++){

                wordVectors.nearest(all_words[i],function(err,results){

                    if(results != null){
                        full_sentence = full_sentence + results[0].word + " ";
                        // console.log(results[0].word)
                    }
                    else{
                        full_sentence = full_sentence + all_words[i]+" ";
                        // console.log(all_words[i])
                    }
                    if(i == all_words.length-1){
                        if(connected){
                            websocket.send(full_sentence+"\n\n");
                        }
                        console.log(full_sentence);
                    }

                });
            }
            console.log(full_sentence);
        }
    }
}
