

/* make sure the from and to fields are not empty */
let validateForm = (userData) => {
    if (userData.from.length == 0) {
        $('.error-from').css('display', 'block');
        return false;
    }
    if (userData.to.length == 0) {
        $('.error-to').css('display', 'block');
        return false;
    }
    return true;
}

let interestsToArray = (podcastInterestString) => {
    if (podcastInterestString.search(', ') != -1) {
        return podcastInterestString.split(', ');
    } else {
        return podcastInterestString;
    }
}

let toHHMMSS = (secs) => {
    let sec_num = parseInt(secs, 10)
    let hours = Math.floor(sec_num / 3600)
    let minutes = Math.floor(sec_num / 60) % 60
    let seconds = sec_num % 60

    return [hours, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v, i) => v !== "00" || i > 0)
        .join(":")
}

/* reset some of the css classes */
let resetClasses = () => {
    $('.error-to').css('display', 'none');
    $('.error-from').css('display', 'none');
    $('.error-mapquest').css('display', 'none');
}
