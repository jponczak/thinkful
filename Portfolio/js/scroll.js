/* controls flow */
function init() {
    scrollFunction();
    moveToTop();
}

function scrollFunction() {
    /* checks to see if the user scrolls */
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll > 100 && $(window).width() > 320) {
            $('#topBtn').css('display','block');
        } else {
            $('#topBtn').css('display','none');
        }
    });
  }

  function moveToTop() {
      /* scrolls to the top of the page */
    $('body').on('click','#topBtn', function() {
        $(window).scrollTop(1);
        $('#topBtn').css('display','none');
    });
}

$(init)