/*! quizito - v0.0.1 - 2014-08-04
* Copyright (c) 2014 ; Licensed MIT */
function Quizito (container, questions) {
    'use strict';

    this.container = document.querySelector(container);
    // Store questions to object
    this.questions = questions;
    // Kickoff
    this.init();
}

Quizito.prototype = {
    init: function () {
        var that = this;

        that.state = 'start';
        that.count = 0;
        // Select the container for the quiz
        // answers submitted by user
        that.answers = [];

        // Load Template
        that.buildTemplate('<div class="quiz-body"><div class="quiz-question">Question></div><div class="quiz-answer"><input type="radio" name="quiz-radio" id="quiz-yes" value="yes"> Yes <input type="radio" name="quiz-radio" id="quiz-no" value="no"> No </div> <div class="quiz-controls"> <a href="#" class="quiz-submit">submit</a> </div> </div>');

        // Cycle through questions
        that.cycle();

        // Attach default event listeners
        that.on('change', function () {
            // Push values to array
            that.answers.push( {count: that.count, question: that.questions[that.count - 1].question, answer: this.value} );
        });

        // Cycle to the next question when a user submits an answer
        that.on('submit', function (event) {
            event.preventDefault();
            that.cycle();
        });

        // Watch events that listen to property changes
        that.watch('count', function (id, oldval, newval) { return newval; });
        that.watch('state', function (id, oldval, newval) { return newval; });
    },
    reset: function () {
        var that = this,
            btn = that.container.querySelector('.quiz-retry');

        btn.addEventListener('click', function (event) {
            event.preventDefault();

            that.init();
        });
    },
    buildTemplate: function (string) {
        this.container.innerHTML = string;
    },
    _loadQuestion: function (obj) {
        var questionContainer = this.container.querySelector('.quiz-question');
        questionContainer.innerHTML = obj.question;
    },
    cycle: function () {
        var that = this;

        if (that.count < that.questions.length) {
            that._loadQuestion(that.questions[that.count]);
            that.count++;
            that.state = 'active';
            that._clearRadio();

        } else {
            // Load results page
            that.state = 'finished';
            that.buildTemplate('<div class="quiz-body" id="results"><div class="quiz-question">Done!</div><div class="quiz-results-body"></div><a href="#" class="quiz-retry">Try again</a></div>');

            that.reset();
        }
    },
    _clearRadio: function () {
        var radios = this.container.querySelectorAll('input');
        [].forEach.call(
            radios,
            function (radio) {
                radio.checked = false;
            }
        );
    },
    filter: function (answer) {
        // Return array of objects with matching answer
        var results = this.answers.filter(function (a) {
            return a.answer === answer;
        });

        return results;
    },
    on: function (eventName, eventHandler) {
        // Event for when radio buttons change
        if (eventName === 'change') {
            var radios = this.container.querySelectorAll('input');

            // Iterate over radios and attach event listeners
            [].forEach.call(
                radios,
                function (radio) {
                    radio.addEventListener('change', eventHandler);
                }
            );
        }

        // Event for when button is change
        if (eventName === 'submit') {
            var submit = this.container.querySelector('.quiz-submit');
            submit.addEventListener('click', eventHandler);
        }
    }
};