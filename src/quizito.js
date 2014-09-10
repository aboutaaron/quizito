/* global alert: true, watch: true */
function Quizito (container, questions) {
    'use strict';

    this.container = document.querySelector(container);
    // Store questions to object
    this.questions = questions;
}

Quizito.prototype = {
    Template: {
        start: '<div class="quiz-body"><h3>Some quiz about bananas</h3><a href="#" class="quiz-start">Start</a></div>',
        active: '<div class="quiz-body">'+
            '<div class="quiz-question">Question></div>'+
            '<div class="quiz-answer">'+
              '<div class="radio">'+
                '<label>'+
                  '<input type="radio" name="quiz-radio" id="quiz-yes" value="yes">'+
                  'Yes'+
                '</label>'+
              '</div>'+
              '<div class="radio">'+
                '<label>'+
                  '<input type="radio" name="quiz-radio" id="quiz-no" value="no">'+
                  'No'+
                '</label>'+
              '</div>'+
            '</div>'+
            '<div class="quiz-controls">'+
              '<a href="#" class="quiz-submit">submit</a>'+
            '</div>'+
          '</div>',
        finished: '<div class="quiz-body" id="results"><div class="quiz-question">Done!</div><div class="quiz-results-body"></div><a href="#" class="quiz-retry">Try again</a></div>'
    },
    init: function () {
        this.count = 0;
        this.answers = [];
        this.valid = false;

        // call the first scene
        this.start();

    },
    start: function () {
        var that = this;

        that.state = 'start';
        // Load Template
        that._buildTemplate('start');

        // Start the active section when a user clicks the start button
        that.on('start', function (event) {
            event.preventDefault();
            that.active();
        });
    },
    active: function () {
        var that = this;
        // Set state
        that.state = 'active';
        // Set template
        that._buildTemplate('active');
        // Cycle through questions
        that._cycle();
        // Validate on answer change
        that.on('change', function () {
            that._validate();
        });

        // Cycle to the next question when a user submits an answer
        that.on('submit', function (event) {
            event.preventDefault();

            // Check Validity

            if (that.valid) {
                that.answers.push({
                    count: that.count,
                    question: that.questions[that.count - 1].question,
                    answer: that._filterForSelected( that.container.querySelectorAll('input') )
                });

                that._cycle();
            } else {
                alert('Please select a value before continuing');
            }
        });
    },
    finished: function () {
        this._buildTemplate('finished');

        var that = this,
            btn = that.container.querySelector('.quiz-retry');
        that.state = 'finished';

        btn.addEventListener('click', function (event) {
            event.preventDefault();

            that.init();
        });
    },
    _buildTemplate: function (state) {
        this.container.innerHTML = this.Template[state];
    },
    _loadQuestion: function (obj) {
        var questionContainer = this.container.querySelector('.quiz-question');
        questionContainer.innerHTML = obj.question;
    },
    _cycle: function () {
        var that = this;

        // reset validity
        that.valid = false;

        if (that.count < that.questions.length) {
            that._loadQuestion(that.questions[that.count]);
            that.count++;
            that._clearRadio();

        } else {
            // Load results page
            that.finished();
        }
    },
    _filterForSelected: function (querySelectorArray) {
        var selected = [].filter.call(
            querySelectorArray,
            function (radio) { return radio.checked === true; }
        );

        return selected[0].value;
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
    _validate: function() {
        // Validate radio button is selected on submit
        var that = this,
            inputs = that.container.querySelectorAll('input');

        // Iterate over radio inputs
        // If checked, assign App.radio
        [].forEach.call(inputs, function (radio) {
            if (radio.type === 'radio' && radio.checked) { that.valid = true; }
        });
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

        // Event for a user clicks the start quiz button
        if (eventName === 'start') {
            var start = this.container.querySelector('.quiz-start');
            start.addEventListener('click', eventHandler);
        }

        // Event for when a user submits and answer
        if (eventName === 'submit') {
            var submit = this.container.querySelector('.quiz-submit');
            submit.addEventListener('click', eventHandler);
        }
    },
    watch: function (prop, eventHandler) {
        // A wrapper around the watch global
        var that = this;
        watch(that, prop, eventHandler);
    }
};