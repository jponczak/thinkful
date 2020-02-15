
/* 
Checkpoint 3 EventListener Assignment
Author: Joe P.
*/

// handles the form - input, check, and delete
function addItemToList() {
  $('#js-shopping-list-form').submit(event => {
    event.preventDefault();
    const item = $(event.currentTarget).find('input[name="shopping-list-entry"]').val();
    /*build the html. probably can refactor since all the li's use the same elements. */
    var insertedItem = '<li><span class="shopping-item">' + item + '</span>' +
    '<div class="shopping-item-controls">' + 
    '<button class="shopping-item-toggle">' + 
      '<span class="button-label">check</span>' + 
    '</button>' +
    '<button class="shopping-item-delete">' +
      '<span class="button-label">delete</span>' +
    '</button> '+ 
  '</div></li>';
  /* add to the list */
    $('.shopping-list').append(insertedItem);
  /* empty the form input field */
    $('#shopping-list-entry').val('');

    //did user select check after adding an item
    $('ul').on('click', '.shopping-item-toggle', function(event) {
      var itemClass = $(event.currentTarget).closest('li').find('.shopping-item');
      changeCheck(itemClass);
    });

    //did user select delete after adding an item
    $('ul').on('click', '.shopping-item-delete', function(event) {
        /* hide the li from the ul */
        var itemClass = $(event.currentTarget).closest('li');
        deleteItem(itemClass);
    });
});
}

//did user select check
function handleCheckEvent(newItemEvent) {
  $('.shopping-item-toggle').click(event => {
    var itemClass = $(event.currentTarget).closest('li').find('.shopping-item');
    changeCheck(itemClass);
  });

}

//did user try to delete an item
function handleDeleteEvent() {
  $('.shopping-item-delete').click(event => { 
    var itemClass = $(event.currentTarget).closest('li');
    deleteItem(itemClass);
  });

}

//function to toggle class for check / uncheck
function changeCheck(itemClass) {
  if (itemClass.hasClass('shopping-item__checked')) {
    itemClass.removeClass('shopping-item__checked').addClass('shopping-item');
  } else {
    itemClass.addClass('shopping-item__checked');
  }
}

//function to handle delete (ie hide)
function deleteItem(itemClass) {
  itemClass.hide();
}

$(addItemToList);
$(handleCheckEvent);
$(handleDeleteEvent);
