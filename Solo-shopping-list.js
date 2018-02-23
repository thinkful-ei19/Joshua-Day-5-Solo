'use strict';

const STORE = [
  {name: 'apples', checked: false},
  {name: 'oranges', checked: false},
  {name: 'milk', checked: true},
  {name: 'bread', checked: false}
];

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
  STORE.push({name: itemName, checked: false});
}

function handleNewItemSubmit(){
  $('#js-shopping-list-form').submit(function (event){
    event.preventDefault();
    console.log('`handleItemCheckClicked` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList(STORE);
  });
}

function toggleCheckedForListItem(itemIndex){
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE[itemIndex].checked = !STORE[itemIndex].checked;
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
    renderShoppingList(STORE);
  });
}

function deleteItem(itemIndex){
  STORE.splice(itemIndex, 1);
}

function handleDeleteItemClicked(){
  $('.js-shopping-list').on('click', '.js-item-delete', event =>{
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteItem(itemIndex);
    renderShoppingList(STORE);
    console.log('`handleDeleteItemClicked` ran');
  });
}

function hideCheckedItems(){
  let unmarkedItems= STORE.filter(item=>{
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
        renderShoppingList(STORE);
        console.log('unchecked');
    }
    
  });
}

function handleShoppingList(){
  renderShoppingList(STORE);
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleToggleHideChecked();    
}

$(handleShoppingList);