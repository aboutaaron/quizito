# quizito.js

A JavaScript library for creating quick-and-easy inline quizzes. This library assumes your questions have boolean answers (true/false, yes/no). Need something beefier? Check out [motherjones/newsquiz](https://github.com/motherjones/newsquiz). And oh yeah, Zero dependencies!

## Installation
```bash
$ bower install quizito
```

In your HTML
```html
<script src="bower_components/dist/quizito/quizito.js"></script>
```

## Usage
First, format a JSON object with your questions

```js
var questions = [
  { question: 'Have you ever been Emeryville?' },
  { question: 'Do you like potato chips?' },
  { question: 'Would you vote to split California into six states?' }
]
```

Quizito takes an array of question objects and a selector to inject the quiz into
```js
var quiz = new Quizito('#quiz', questions);
```

Told you. Easy.

## Customization

`Quizito.js` comes with zero css. It's up to you to implement what the quiz will actually look like.

The default HTML looks like this:
```html
<div id="quiz">
    <div class="quiz-body">
        <div class="quiz-question">Quiz question?</div>
        <div class="quiz-answer">
            <input type="radio" name="quiz-radio" id="quiz-yes" value="yes"> Yes
            <input type="radio" name="quiz-radio" id="quiz-no" value="no"> No
        </div>
        <div class="quiz-controls">
            <a href="#" class="quiz-submit">submit</a>
        </div>
    </div>
</div>
```

Don't like this format? Pass `Quizito.buildTemplate()` a string of your preferred HTML and go from there (though you'll definitely need to modify the library a bit. Working on making this a little easier in the future).

## API
#### properties
`container`: DOM node that contains the quiz

`questions`: Array of question objects used for the quiz

`answers`: Similar to **questions** but contains the answers. Updates dynamically.

`count`: Integer representing the current question number. Starts at 1

`state`: 'start', 'active', 'finished'. Tells you which part of the quiz you're in.

#### functions
`init()`: boot your quiz

`reset()`: Starts your quiz from the beginning

`buildTemplate()`: Take a *string* representation of HTML and appends it to the defined selector


## Events
```js
// Event for when a user clicks a radio button to select an answer
quiz.on('change', function (event) {});

// Event for when the user clicks the button to go to the next question
quiz.on('submit', function (event) {});

// Define your own
quiz.on('someEventName', function (event) { /* your custom event here */ })
```

### Watching for state
`Quizito.js` uses an implementation of [Object.watch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/watch) to monitor various object properties. This is primarily used to watch the "state" of the quiz. `Quizito.state` will hold the following values:

- **'start'**: for when the quiz is first initialized
- **'active'**: state for when the quiz is being taken
- **'finished'**: fires after the the last question is answer and the results are displayed


So, if you wanted to do something based on the various quiz states, you'd write the following:
```js
quiz.watch('state', function () {
    if (this.state === 'start') {
        /* Do something when the quiz starts*/
    }

    if (this.state === 'active') {
        /* Do something while the quiz is active*/
    }

    if (this.state === 'finished') {
        /* Do something when the quiz is finished */
    }
});
```

You can also watch `Quizito.count` which tracks what question is active
```js
quiz.watch('count', function () { /* Do something when count changes */ });
```

## Contributing
Want to add or feature of need something fixed? Open an [issue](https://github.com/cirlabs/Quizito/issues).

## License
The MIT License (MIT)

Copyright (c) [2014] [The Center for Investigative Reporting]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.