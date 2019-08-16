# MDP Workshop: p5 Speech-to-Text

This workshop documentation assumes you are using the [p5 web editor](https://editor.p5js.org/). It is a beginning friendly (hopefully) set of instructions on progressively getting speech-to-text and word-to-vec working in p5.

## Getting Speech-to-Text Working

1. Download [p5.speech Library](http://ability.nyu.edu/p5.js-speech/)
2. Upload the **p5.speech.js** file into your web editor
3. Open the **index.html** file and add the p5.speech.js file by adding the following line of code underneath line 6 :

```html
<script src="p5.speech.js"></script>

```

4. Go to the sketch.js file (this will be where we will be doing the remainder of the work). Add the following lines of code to the setup function

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
