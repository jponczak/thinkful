function init() {
    /* intialize global variables */
    totalQuestions = TRIVIA.length;
    questionsInHtml = '';
    pageNumber = 0;
    score = 0;
    allQuestionsHtml = '';
    userAnswersArray = [];

    triviaQuizController();
    nextQuestionController();
    reloadSite();
}

function triviaQuizController() {
    /* builds the questions, starts the quiz challenge */
    buildQuestions();
    $('#startQuiz').submit(function (event) {
        event.preventDefault();
        renderNextQuestion();
        checkAnswer();
    });
}

function renderNextQuestion() {
    /* renders the next question */
    $('#startQuiz').hide();
    $('.triviaContent').html(allQuestionsHtml);
    var group = $('.mainSection[data-num="' + pageNumber + '"]');
    group.css('display', 'block');
}

function checkAnswer() {
    /* checks the answer. */
    let currentQuestionObj = TRIVIA[pageNumber];
    var group = $('#question-' + pageNumber + '-button');
    group.css('display', 'none');
    $('.answer').hide(); //disables the next question button by default

    // when a user selects a radio input
    $(".radioAnswer").change(function () {
        //enables the next question button
        group.css('display', 'block');
        //disables all radio buttons to prevent user from selecting a different answer
        $('input[name=triviaOption]').attr('disabled', true);
        //shows the answer section
        $('.answer').show();
        //gets the user answer
        var selValue = $("input[type='radio']:checked").val();
        //builds a user answer object for use within the summary
        let userAnswer = {
            'question': currentQuestionObj.number,
            'correctAnswer': currentQuestionObj.answer,
            'userAnswer': 'selValue'
        }

        //conditional determines if the user answer is correct, as defined 
        //in the question object. also builds a message and displays it for 
        //the user
        if (selValue.trim() === currentQuestionObj.answer.trim()) {
            var message = `You got it! ${currentQuestionObj.description}`;
            score++;
            $('h5.right').show().text(message);
            $('h5.wrong').hide();
            //adds new key/value to user answer object
            userAnswer.isRight = 'Yes';
        }
        else {
            var message = `Not this time. The correct answer is ${currentQuestionObj.answer.toLowerCase()}. ${currentQuestionObj.description}`;
            $('h5.right').hide();
            $('h5.wrong').show().text(message);
            userAnswer.isRight = 'No';
        }
        //pushes all users answer objects to an array of objects for use in summary
        userAnswersArray.push(userAnswer);
    });
}

function buildQuestions() {
    /* builds an html of all questions, which are hidden by default*/
    for (let x = 0; x < totalQuestions; x++) {
        let questionObj = TRIVIA[x];
        allQuestionsHtml = allQuestionsHtml + questionHTML(x, questionObj);
    }
}

function nextQuestionController() {
    //checks to see if user selects  'next question' button
    //the format below is used to handle new buttons added to the 
    //DOM after the initial DOM rendering.
    $('.triviaContent').on('click', '.questionButton', function (event) {
        event.preventDefault();
        pageNumber++;

        if (pageNumber < totalQuestions) {
            renderNextQuestion();
            checkAnswer();
        } else {
            //no more questions. move to the summary.
            $('.questions').hide();
            summary();
        }
    });
}

function summary() {
    /* builds summary page */
    var message = buildSummary(userAnswersArray);
    $('.triviaContent').html(message);
    var group = $('.mainSection[data-num="6"]');
    group.css('display', 'block');
}

function reloadSite() {
    /* fancy javascript to reload page if user wants to play again */
    $('.triviaContent').on('click', '.playAgainButton', function (event) {
        event.preventDefault();
        location.reload(true);
    });

}

/* main */
$(init);

