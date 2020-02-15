function getGrade(myPercentage) {
/* returns a letter grade based on the score */
let grade = '';
    if (myPercentage < 60) {
        grade = 'F ... <br />Maybe try again?';
    } else if ((myPercentage => 60) && (myPercentage < 70)) {
        grade = 'D ... <br /> You passed, but barely.';
    } else if ((myPercentage >= 70) && (myPercentage < 80)) {
        grade = 'C ... <br /> Meh - its average.';
    } else if ((myPercentage >= 80) && (myPercentage < 90)) {
        grade = 'B ... <br /> Not bad!'
    } else {
        grade = 'A ... <br /> Excellent job space cadet!';
    }
    return grade;
}

function percentage(partialValue, totalValue) {
/* returns a percentage based on the correct questions and total questions */
return Math.round((100 * partialValue) / totalValue);
}