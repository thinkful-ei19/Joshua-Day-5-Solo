'use strict';

const STORE = {
  items: [
    {name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false}
  ],
};

function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
    <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
      </button>
      <form class="js-edit-item-name">
      <label for="edit-item-name">Edit item name</label>
      <input type="text" name="edit-bar" class="js-edit-bar" placeholder="Type here">
      <button class="submit-edit js-submit-edit">
          <span class="button-label">submit</span>
      </form>
    </div>
  </li>`; 
}

function generateShoppingItemsString(shoppingList){
  console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) => generateItemElement(item,index));
  return items.join('');
}

function renderShoppingList(list){
  console.log('renderShoppingList ran');
  const shoppingListItemsString= generateShoppingItemsString(list);

  $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false});
}

function handleNewItemSubmit(){
  $('#js-shopping-list-form').submit(function (event){
    event.preventDefault();
    console.log('`handleItemCheckClicked` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList(STORE.items);
  });
}

function itemEdit(itemName, currentIndex){
STORE.items[currentIndex].name=itemName;
}

function handleEditItemName(){
  console.log('edit run');
  $('.js-shopping-list').on('submit', '.js-edit-item-name', function (event){
    event.preventDefault();
    const currentIndex= $(event.currentTarget).parents('li').attr('data-item-index');
    console.log(currentIndex);
    console.log(event.currentTarget);
    const newNameEdit = $(event.currentTarget).find('.js-edit-bar').val();
    console.log(newNameEdit);
$('.js-edit-bar').val('');
    itemEdit(newNameEdit, currentIndex);
    renderShoppingList(STORE.items); 
  });
}


function searchItemSubmit(itemName){
  let searchArr = STORE.items.filter(item=>{
    return (item.name === itemName);
  }); 
  return searchArr;
}

function handleSearchItemSubmit(){
  console.log('Search run');
  $('#js-search-by-name').submit(function (event){
    console.log('is it working');
    event.preventDefault();
    const searchItem = $('.js-search-bar').val();
    $('.js-search-bar').val('');
    const searchArr = searchItemSubmit(searchItem);
    renderShoppingList(searchArr);
  });
}

function resetList(){
  console.log('reset');
  $('.js-reset-button').on('click', event =>{
    renderShoppingList(STORE.items);
  });
}

function toggleCheckedForListItem(itemIndex){
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}

function getItemIndexFromElement(item){
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked(){
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList(STORE.items);
  });
}

function deleteItem(itemIndex){
  STORE.items.splice(itemIndex, 1);
}

function handleDeleteItemClicked(){
  $('.js-shopping-list').on('click', '.js-item-delete', event =>{
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteItem(itemIndex);
    renderShoppingList(STORE.items);
    console.log('`handleDeleteItemClicked` ran');
  });
}

function hideCheckedItems(){
  let unmarkedItems= STORE.items.filter(item=>{
    return item.checked === false;
  }); 
  console.log(unmarkedItems);
  renderShoppingList(unmarkedItems);
}

function handleToggleHideChecked(){
  $('.js-toggle-switch').on('change', event =>{
    if($('input[type=checkbox]').prop('checked')){
      console.log('checked'); 
      hideCheckedItems();
    } else {
      renderShoppingList(STORE.items);
      console.log('unchecked');
    }
    
  });
}



function handleShoppingList(){
  renderShoppingList(STORE.items);
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleToggleHideChecked(); 
  handleSearchItemSubmit();
  resetList();   
  handleEditItemName();
}

$(handleShoppingList);