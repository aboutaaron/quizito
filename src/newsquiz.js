function NewsQuiz (container, questions) {
    'use strict';

    this.container = document.querySelector(container);
    this.questions = questions;
    this.setupHtml();
}

NewsQuiz.prototype = {
    setupHtml: function () {
        var template = '<div class="quiz-body"><div class="quiz-question">Have you done x?</div><div class="quiz-answer"><input type="radio" name="quiz-radio" id="quiz-yes" value="yes"> Yes <input type="radio" name="quiz-radio" id="quiz-no" value="no"> No </div> <div class="quiz-controls"> <a href="#" class="quiz-prev">prev</a> <a href="#" class="quiz-next">next</a> </div> </div>';

        this.container.innerHTML = template;
    },
    on: function (eventName, eventHandler) {

        if (eventName === 'change') {
            var radios = this.container.querySelectorAll('input');

            // Iterate over radios and attach event listeners
            [].forEach.call(
                radios,
                function (radio) {
                    radio.addEventListener('change', eventHandler);
                }
            );
        } else {

            this.container.addEventListener(eventName, eventHandler);
        }

    }
};
