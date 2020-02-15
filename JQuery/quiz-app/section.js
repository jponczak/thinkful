function buildSummary(answersArray) {
    /* builds the summary html, including the score, % correct, grade and correct / incorrect answers*/
    var playAgainButton = playAgainButtonHTML();
    let myPercentage = percentage(parseInt(score), parseInt(totalQuestions));
    let myGrade = getGrade(myPercentage);
    var gotRight = '';
    var gotWrong = '';
    var link = "https://www.businessinsider.com/biggest-scientific-discoveries-of-2019-2019-11";
    for (let x = 0; x < answersArray.length; x++) {
        answerObj = answersArray[x];
        if (answerObj.isRight == "Yes") {
            gotRight += `Question ${answerObj.question}: correct!<br />`
        } else {
            gotWrong += `Question ${answerObj.question}: incorrect! The correct answer is '${answerObj.correctAnswer}'<br />`
        }
    }

    var summarySection =
        `<main>
          <section class="triviaBox">
            <div class="question">
            <h3>Thanks for taking the quiz!. <br /><br /> You got ${score} out of ${totalQuestions} right.</h3>
            <h3>Your overall grade is a ${myPercentage}%, which is a ${myGrade}</h3>
            <p> ${gotRight}</p>
            <p> ${gotWrong}</p>
            <p>The content for this quiz was taken from this fascinating <a href="${link}" target="_blank">article</a>.</p>
            ${playAgainButton}
            </div>
            </section>
            </main>`
        ;

    return summarySection;
}

function questionHTML(pageNumber, questionObj) {
    /* builds the questions in proper html format */
    var radioButtonHTML = buildRadioButtons(questionObj, pageNumber);
    var rightAnswer = '<h5 class="right"></h5>';
    var wrongAnswer = '<h5 class="wrong"><h5>';
    var buttonMessage = "Next Question";

    //determines if user is on the last question. If so, change button text.
    if ((pageNumber + 1) == totalQuestions) {
        buttonMessage = "See my results";
    }
    var buildSection =
        `<div class="mainSection" data-num="${pageNumber}"> 
        <nav class="navbar">
        <h2>Question ${questionObj.number} of ${totalQuestions}</h2>
        </nav>
        <main>
        <section class="question">
        <h3>${questionObj.question}</h3>
        <form id="questionForm">
        <div class="verticalRadioButtons">
        <fieldset alt = ${questionObj.imageAlt}" style="background-image: url(./images/${questionObj.imageName}); background-repeat: no-repeat;width: 100%;height: 100%; -webkit-background-size: cover; -background-size: cover; -moz-background-size: cover; -o-background-size: cover;">
        ${radioButtonHTML}
        </fieldset>
        </div>
        <div class="answer">
        ${rightAnswer}
        ${wrongAnswer}
        </div>
        <div id="question-${pageNumber}-button">
        <button class="questionButton button blueButton">${buttonMessage}</button>
        </div>
        </form>
        </section>
        </main>
        </div>`;

    return buildSection;
}

function playAgainButtonHTML() {
    /* pay again button available on the summary page */
    var playGameAgainButton =
        '<div id="playAgainButton"><button class="playAgainButton button blueButton">Play Again?</button></div>';

    return playGameAgainButton;
}

function buildRadioButtons(questionObj, pageNumber) {
    /* creates the radio input options based on the question object */
    var answers = questionObj.possibleAnswers[0].split(',');
    var radioButtons = '';

    for (let x = 0; x < answers.length; x++) {
        radioButtons = radioButtons +
            '<div><span class="radioLabel"><input type="radio" name="triviaOption" id="' +answers[x] + '" class="radioAnswer" value="' + answers[x] + '">'
            + '<label for="' + answers[x] + '">' + answers[x] + '</label></span></div>';

    }
    return radioButtons;
}