# newsquiz.js

A JavaScript library for creating quick-and-easy inline quizzes. This library assumes your questions have boolean answers (true/false, yes/no). Need something beefier? Check out [motherjones/newsquiz](https://github.com/motherjones/newsquiz). And oh yeah, Zero dependencies!

## Installation
```bash
$ bower install newsquiz
```

In your HTML
```html
<script src="bower_components/newsquiz/newsquiz.js"></script>
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

Newsquiz takes an array of question objects and a selector to inject the quiz into
```js
var quiz = new NewsQuiz('#quiz', questions);
```

Told you. Easy.

## Customization

`newsquiz.js` comes with zero css. It's up to you to implement what the quiz will actually look like.

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

Don't like this format? Pass `NewsQuiz.buildTemplate()` a string of your preferred HTML and go from there (though you'll definitely need to modify the library a bit. Working on making this a little easier in the future).

## API
`container` (**property**): DOM node that contains the quiz

`questions` (**property**): Array of question objects used for the quiz

`answers` (**property**): Similar to **questions** but contains the answers. Updates dynamically.

`count` (**property**): Integer representing the current question number. Starts at 1

`state` (**property**): 'start', 'active', 'finished'. Tells you which part of the quiz you're in.

`init` (**function**): boot your quiz

`reset` (**function**): Starts your quiz from the beginning

`buildTemplate` (**function**): Take a *string* representation of HTML and pass to the selector


## Events
```js
// Event for when a user selects an answer
quiz.on('change', function (event) {});

// Event for when the user clicks the button to go to the next answer
quiz.on('submit', function (event) {});

// Define your own
quiz.on('someEventName', function (event) { /* your custom event here */ })
```

### Watching for state
newsquiz.js uses an implementation of [Object.watch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/watch) to monitor various object properties. This is primarily used to watch the value of the "state" property that tracks where the user is in the question. `NewsQuiz.state` will hold the following values:

    start: for when the quiz is first initialized
    active: state for when the quiz is being taken
    finished: fires after the the last question is answer and the results are displayed


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
        /* Do something for when the quiz is done */
    }
});
```

You can also watch `NewsQuiz.count` whuch tracks what question is active
```js
quiz.watch('count', function () { /* Do something when count changes */ });
```