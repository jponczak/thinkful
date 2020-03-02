
/* build the mapquest API string */
let buildAddressQueryString = (userData) => {
    let queryString = [];
    let queryFrom = encodeURIComponent(userData.from);
    let queryTo = encodeURIComponent(userData.to);
    queryString.push(`from=${queryFrom}`, `to=${queryTo}`, `key=${mapquestApiKey}`);

    return queryString.join('&');
}

/* build an array of listen now URLs */
let buildListenNowURL = (userData) => {

    let listenNowUrl = [];

    let currentDate = Date.now();

    if (Array.isArray(userData.podcastInterests)) {
        for (let x = 0; x < userData.podcastInterests.length; x++) {
            listenNowUrl.push(`${listenNotesBaseURL}?q=${userData.podcastInterests[x]}&len_min=10&len_max=${userData.travelTime}&sort_by_date=0&type=episode&offset=0&published_before=${currentDate}&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=1`);
        }    
    } else {
        listenNowUrl.push(`${listenNotesBaseURL}?q=${userData.podcastInterests}&len_min=10&len_max=${userData.travelTime}&sort_by_date=0&type=episode&offset=0&published_before=${currentDate}&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=1`);
    }
    return listenNowUrl;
}

/* make sure the from and to fields are not empty */
let validateForm = (userData) => {
    if (userData.from.length == 0 || userData.to.length == 0) {
        $('.error-message').html(`<p>${errors.noForm}</p>`).css('display', 'block');
        return false;
    }
    return true;
}

/* convert string to array */
let interestsToArray = (stringToConvert) => {
    if (stringToConvert.search(', ') != -1) {
        return stringToConvert.split(', ');
    } else {
        return stringToConvert;
    }
}

/* display in proper HH:MM:SS format */
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
    $('.error-message').css('display', 'none');
}
