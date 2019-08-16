# MDP Workshop: p5 Speech-to-Text

This workshop documentation assumes you are using the [p5 web editor](https://editor.p5js.org/). It is a beginning friendly (hopefully) set of instructions on progressively getting speech-to-text and word-to-vec working in p5.

## Getting Speech-to-Text Working

1. Download [p5.speech Library](http://ability.nyu.edu/p5.js-speech/)
2. Upload the **p5.speech.js** file into your web editor
3. Open the **index.html** file and add the p5.speech.js file by adding the following line of code underneath line 6 :

```html
<script src="p5.speech.js"></script>

```

4. Go to the **sketch.js** file (this will be where we will be doing the remainder of the work). The setup function should look like this:

```javascript
function setup(){
    let speechRec = new p5.SpeechRec('en-US',gotSpeech);
    let continuous = true;
    speechRec.start(continuous);

    function gotSpeech(){
        if(speechRec.resultValue){
            console.log(speechRec.resultString);
        }
    }
}

```

5. Click on the Run button at the top of p5 web editor. Your browser will ask you for permission to access the microphone. Click Yes. As you speak, the text should be printed in the console window.

6. If you would like to get some unfinalized results, change the setup function to look like the following:

```javascript
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

```

## Getting ml5 Working

[ml5](https://ml5js.org/) is a friendly machine learning library that we can use directly in p5.

1. Open the **index.html** file and add the following line of code underneath line 7.

```html
<script src="https://unpkg.com/ml5@0.3.1/dist/ml5.min.js"></script>
```
2. Download the wordvecs1000.json file [here](https://github.com/ml5js/ml5-examples/tree/master/p5js/Word2Vec/data) Because of the p5 web editor limitations, you can't use any of the larger wordvec json files. (See how to run from a text editor to use the larger files)

3. Add this code at the top of your **sketch.js** file to initialize the Word2Vec model

```javascript
const wordVectors = ml5.word2vec("wordvecs1000.json", modelLoaded);

function modelLoaded() {
  console.log("Model Loaded!");
}

function printResult(err,results){
  console.log(results[0].word);
}

```

4. Next to actually evaluate the model, you have multiple options. See the [ml5 Word2Vec documentation](https://ml5js.org/reference/api-Word2vec/) for full details.

```javascript
//Find the closest word to "cat"
wordVectors.nearest("cat",printResult);

//Add two words
wordVectors.add(["cat","dog"],printResult);

//Subtract two words
wordVectors.subtract(["cat","dog"],printResult);
```
