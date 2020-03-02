
const mapquestApiKey = 'ofGSjKNQtDZF0b56ryF0tdBawpRqNoX6';
const mapquestBaseURL = 'https://www.mapquestapi.com/directions/v2/route';

const listenNotesApiKey = 'e3734451a0d3414f9db6cc43b2d9c189';
const listenNotesBaseURL = ' https://listen-api.listennotes.com/api/v2/search';

/* fetch the mapquest data */
let getAddressApi = (userData) => {
    fetch(userData.mapquestUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
            parseMapquestResponse(responseJson, userData);
        })
        .catch(err => {
            $('.error-mapquest').html(`<p>${errors.noMaps}</p>`);
            $('.error-mapquest').css('display', 'block');    
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

/* parse the mayquest response */
let parseMapquestResponse = (responseJson, userData) => {
    let statusCode = responseJson.info.statuscode;

    //check status code ...
    if (statusCode != 0) {
        let errorMessage = responseJson.info.messages[0];
        $('.error-mapquest').html(errorMessage);
        $('.error-mapquest').css('display', 'block');
    } else {
        //important - travel time is needed for the listen now api!
        userData.travelTime = Math.round(Number(responseJson.route.realTime) / 60).toString();
        userData.listenNowUrl = buildListenNowURL(userData);

        //success with mapquest data! now fetch listen now data
        renderMapQuestResults(responseJson, userData);
        fetchListenNow(responseJson, userData);
    }
}

/* fetch the listennow api data */
let fetchListenNow = (responseJson, userData) => {

    let counter = 0;
    let totalTravelTime = (toHHMMSS(responseJson.route.realTime));

    //for each element in the listennow array, build the request and attach a header object...
    for (let x = 0; x < userData.listenNowUrl.length; x++) {
        var request = new Request(userData.listenNowUrl[x], {
            headers: new Headers({
                'X-ListenAPI-Key': listenNotesApiKey
            })
        });

        //fetch the listen now podcast data
        fetch(request).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
            })
            .then(responseJson => {
                //do something with the responseJson
                for (let x = 0; x < responseJson.results.length; x++) {
                    listenNowPodcasts.push(responseJson.results[x]);
                }

                counter++;
            })
            .catch(err => {
                $('#js-error-message').text(`Something went wrong: ${err.message}`);
            }).finally(() => {
                if (Array.isArray(userData.podcastInterests)) {
                    if ((Number(counter)) === Number(userData.podcastInterests.length)) {
                        renderListenNowResults(listenNowPodcasts);
                        listenNowPodcasts = [];
                    }    
                } else {
                    renderListenNowResults(listenNowPodcasts);
                    userData.listenNowUrl = [];
                    listenNowPodcasts = [];
                }

                    //slow scroll from form to podcasts
                    var gotoForm = $('.podcasts-text-inner').position().top;
                    $('html, body').animate({
                    scrollTop: gotoForm
                    }, 900);


            });
    }
}