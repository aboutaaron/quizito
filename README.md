# quizito.js

A JavaScript library for creating quick-and-easy inline quizzes. This library assumes your questions have boolean answers (true/false, yes/no). Need something beefier? Check out [motherjones/newsquiz](https://github.com/motherjones/newsquiz).

## Dependencies
quizito.js depends on:

- ~~[Mustache.js](https://github.com/janl/mustache.js)~~
- [Watch.js](https://github.com/melanke/Watch.JS)

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

After that, start the quiz
```js
quiz.init();
```

Told you. Easy.

## Customization

`Quizito.js` comes with zero css. It's up to you to implement what the quiz will actually look like.

The default HTML looks like this:
```html
<div class="quiz-body">
  <div class="quiz-question">Question></div>
    <div class="quiz-answer">
      <div class="radio">
        <label>
          <input type="radio" name="quiz-radio" id="quiz-yes" value="yes">
          Yes
        </label>
      </div>
      <div class="radio">
        <label>
          <input type="radio" name="quiz-radio" id="quiz-no" value="no">
          No
        </label>
      </div>
  </div>
  <div class="quiz-controls">
    <a href="#" class="quiz-submit">submit</a>
  </div>
</div>
```
### Templates
`Quizito.Template` holds the HTML templates for each state. The defaults are set to `start`, `active` and `finished`. If you don't like defaults? Override the template values with the your own. Just be sure that you have the following HTML:

```
.quiz-question: The element that contains the questions
.quiz-start: the element clicked to start the quiz
.quiz-submit: The element clicked to go to the next question
.quiz-try: The element clicked to restart the quiz. This should only be located in `Quizito.Template.finished`
```

Don't like this format? Pass `Quizito.buildTemplate()` a string of your preferred HTML and go from there (though you'll definitely need to modify the library a bit. Working on making this a little easier in the future).

## API
#### properties
`container`: DOM node that contains the quiz

`questions`: Array of question objects used for the quiz

`answers`: Similar to **questions** but contains the answers. Updates dynamically.

`count`: Integer representing the current question number. Starts at 1

`state`: 'start', 'active', 'finished'. Tells you which part of the quiz you're in.

`Template`: Object that holds the corresponding HTML for each state

#### functions
These functions handle the internals of the library. While you probably shouldn't modify these, it's worth explaining what they do incase you'd like to.

`init()`: boot your quiz

`_buildTemplate(state)`: Take a the state name as a string and render the corresponding HTML stored in `Quizito.Template.stateName`.

`start()`: Function called to start the quiz

`active()`: Function called to render quiz questions and handle question cycling

`finished()`: Function called to display results and do any leftover logic


## Events
```js
// Event for when a user clicks a radio button to select an answer
quiz.on('change', function (event) {});

// Event for when the user clicks the button to go to the next question
quiz.on('submit', function (event) {});

// Define your own
quiz.on('someEventName', function (event) { /* your custom event here */ })
```

### Watching Object values
`Quizito.js` uses [Watch.js](https://github.com/melanke/Watch.JS) to monitor various object properties. For example, you may want to watch the "state" of the quiz. `Quizito.state` holds the following values:

- **'start'**: for when the quiz is first initialized
- **'active'**: state for when the quiz is being taken
- **'finished'**: fires after the the last question is answer and the results are displayed


So, if you wanted to do something based on the various quiz states, you'd write the following:
```js
quiz.watch('state', function (property, action, oldvalue, newvalue) {
    /*
        property: the property being watched. In this case *state*
        action: the action that triggered the watch event to fire
        oldvalue: the previous value held by the property
        newvalue: the new value currently held by the property

    */
    if (newvalue === 'start') { /* Do something when the quiz starts*/ }

    if (newvalue === 'active') { /* Do something while the quiz is active*/ }

    if (newvalue === 'finished') { /* Do something when the quiz is finished */ }
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