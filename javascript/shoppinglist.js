const getShoppingList = () => {
	const ShoppingList = {
		list: [],
		priceList: [],
		total: 0,
		addToList: (item) => {
			ShoppingList.list.push(item);
			return ShoppingList.list;
		},
		addToPriceList: (item) => {
			ShoppingList.priceList.push(item)
			return ShoppingList.priceList
		},
		editItemInList: (index, newItemValue) => {
			if (index < 0 || index > ShoppingList.countItemsInList()) {
				return;
			}
			if (newItemValue === '' || newItemValue.trim() === '') {
				return;
			}
			ShoppingList.list[index] = newItemValue;
		},
		editPriceInList: (index, newItemValue) => {
			if (index < 0 || index > ShoppingList.countItemsInList()) {
				return;
			}
			if (newItemValue === '') {
				return;
			}
			ShoppingList.priceList[index] = newItemValue;
		},
		removeItemFromList: (listItem) => {
			ShoppingList.list = ShoppingList.list.filter((currentItem) => {
				return currentItem !== listItem;
			});
			return ShoppingList.list;
		},
		removePriceFromList: (listPrice) => {
			ShoppingList.priceList = ShoppingList.priceList.filter((currentItem) => {
				return currentItem !== parseFloat(listPrice.slice(1));
			});
			return ShoppingList.priceList;
		},
		displayList: () => {
			let str = '';
			for (let i = 0; i < ShoppingList.list.length; i++) {
				str += (i+1) + '. ' + ShoppingList.list[i] + '\n';
			}
			return str;
		},
		totalCost: () => {
			for (let i = 0; i< ShoppingList.priceList.length; i++) {
				ShoppingList.total += ShoppingList.priceList[i]
			}
			parseFloat(ShoppingList.total).toFixed(2)
			return ShoppingList.total
			},
		countItemsInList: () => {
			return ShoppingList.list.length;
		}
	};
	return ShoppingList;
};

// -----------------------------------------------------
// shopping list with optional prices, supports multiple items and prices
// if price is entered, it must be entered for each item

// create empty shopping list
const myShoppingList = getShoppingList();


// we use the render function to ALWAYS draw an
// accurate depiction of the shoppinglist for the user
const render = (container, shoppingList) => {
	let str = '';
	for (let i = 0; i < shoppingList.countItemsInList(); i++) {
			str += `<li>
				<span class="js-shopping-list-listitem" data-idx="${i}">${shoppingList.list[i]}</span>
				<span class="js-shopping-list-priceitem" data-idx="${i}">$${shoppingList.priceList[i].toFixed(2)}</span>
				<span class="js-delete-btn btn btn-primary ml-2 mr-1 p-0" data-idx="${i}">Delete</span>
				<span class="js-coupon-btn btn btn-primary m-0 p-0" data-idx="${i}">Apply Coupon</span>
			</li>`;
	}
	container.innerHTML = `<ol>${str}</ol>`
	shoppingListInput.focus()
	shoppingList.total = 0;
	shoppingList.totalCost()
	totalDisplayPrice.style.backgroundColor = null;
	totalDisplayPrice.style.fontWeight = null;
	let remainingBudget = (maxBudget.value - shoppingList.total).toFixed(2)
	let negRemainingBudget = - remainingBudget
	if (shoppingList.total > maxBudget.value) {
		alert(`Your Have Exceeded Your Max Budget Please Remove $${negRemainingBudget} from Shopping List.`)
		totalDisplayPrice.style.backgroundColor = "red"
		totalDisplayPrice.style.fontWeight = "bold";
	}
	totalDisplayPrice.innerHTML = `Shopping List Total is: $${parseFloat(shoppingList.total).toFixed(2)}, Remaining Budget: $${remainingBudget}`
}

// EVENT LISTENERS
const onAddToListClicked = evt => {
	// read the input field
	let shoppingItemValue = shoppingListInput.value;
	let shoppingPriceValue = addToListPrice.value
	const splitItemValue = shoppingItemValue.split(',')
	const splitPriceValue = shoppingPriceValue.split(',')
	if (shoppingItemValue.length < 3) {
		alert("Must enter valid item.")
		shoppingListInput.value = '';
		addToListPrice.value = '';
	}
	else if (shoppingPriceValue == undefined || shoppingPriceValue == 0 ) {
		alert("Must enter valid price.")
		shoppingListInput.value = '';
		addToListPrice.value = '';
	}
	else if (shoppingPriceValue !== '' && splitItemValue.length !== splitPriceValue.length) {
		alert("Unable to add any prices, not all defined.")
	}
	else {
		for (let i=0; i< splitItemValue.length; i++) {
			myShoppingList.addToList(splitItemValue[i])
			myShoppingList.addToPriceList(parseFloat(splitPriceValue[i]));
		}
	}
	shoppingListInput.value = '';
	addToListPrice.value = '';
	render(shoppingListCont, myShoppingList)
}

const onEnterKeyPressedItem = evt => {
	if (evt.keyCode === 13) {
		let shoppingItemValue = evt.target.value;
		let shoppingPriceValue = addToListPrice.value
		const splitItemValue = shoppingItemValue.split(',')
		const splitPriceValue = shoppingPriceValue.split(',')
		if (shoppingItemValue.length < 3) {
			alert("Must enter valid item.")
			evt.target.value = '';
			addToListPrice.value = '';
		}
		else if (shoppingPriceValue == undefined || shoppingPriceValue == 0 ) {
			alert("Must enter valid price.")
			evt.target.value = '';
			addToListPrice.value = '';
		}
		else if (shoppingPriceValue !== '' && splitItemValue.length !== splitPriceValue.length) {
			alert("Unable to add any prices, not all defined.")
		}
		else {
			for (let i=0; i< splitItemValue.length; i++) {
				myShoppingList.addToList(splitItemValue[i])
				myShoppingList.addToPriceList(parseFloat(splitPriceValue[i]));
			}
		}
		evt.target.value = '';
		addToListPrice.value = '';
		render(shoppingListCont, myShoppingList)
	}
}
const onEnterKeyPressedPrice = evt => {
	if (evt.keyCode === 13) {
		let shoppingItemValue = shoppingListInput.value;
		let shoppingPriceValue = evt.target.value
		const splitItemValue = shoppingItemValue.split(',')
		const splitPriceValue = shoppingPriceValue.split(',')
		if (shoppingItemValue.length < 3) {
			alert("Must enter valid item.")
			shoppingListInput.value = '';
			evt.target.value = '';
		}
		else if (shoppingPriceValue == undefined || shoppingPriceValue == 0 ) {
			alert("Must enter valid price.")
			shoppingListInput.value = '';
			evt.target.value = '';
		}
		else if (shoppingPriceValue !== '' && splitItemValue.length !== splitPriceValue.length) {
			alert("Unable to add any prices, not all defined.")
		}
		else {
			for (let i=0; i< splitItemValue.length; i++) {
				myShoppingList.addToList(splitItemValue[i])
				myShoppingList.addToPriceList(parseFloat(splitPriceValue[i]));
			}
		}
		shoppingListInput.value = '';
		evt.target.value = '';
		render(shoppingListCont, myShoppingList)
	}
}

const onContainerClicked = evt => {
	if (evt.target.matches('.js-delete-btn')) {
		const idx = evt.target.getAttribute('data-idx');
		const itemContainer = document.querySelector('.js-shopping-list-listitem[data-idx="'+idx+'"]');
		const priceContainer = document.querySelector('.js-shopping-list-priceitem[data-idx="'+idx+'"]');
		myShoppingList.removeItemFromList(itemContainer.innerHTML);
		myShoppingList.removePriceFromList(priceContainer.innerHTML);
		render(shoppingListCont, myShoppingList);
	}
	else if (evt.target.matches('.js-shopping-list-listitem')) {
		const idx = evt.target.getAttribute('data-idx');
		evt.target.innerHTML = `<input type="text" class="form-control js-edit-listitem" data-idx="${idx}" placeholder="${evt.target.innerHTML}">`;
		evt.target.querySelector('input').focus()
	}
	else if (evt.target.matches('.js-coupon-btn')) {
		const idx = evt.target.getAttribute('data-idx');
		evt.target.innerHTML = `<input type="text" class="form-control js-add-coupon" data-idx="${idx}" placeholder="Coupon Discount">`;
		evt.target.querySelector('input').focus()
	}
}

const onContainerItemKeyPressed = evt => {
	if (evt.keyCode === 13 && evt.target.matches('.js-edit-listitem')) {
		const newItemValue = evt.target.value;
		const idx = parseInt(evt.target.getAttribute('data-idx'), 10);
		myShoppingList.editItemInList(idx, newItemValue);
		render(shoppingListCont, myShoppingList);
	}
}

const onContainerPriceKeyPressed = evt => {
	if (evt.keyCode === 13 && evt.target.matches('.js-add-coupon')) {
		const idx = parseInt(evt.target.getAttribute('data-idx'), 10);
		let newItemValue = 0;
		const currentItemPriceHolder = document.querySelector('.js-shopping-list-priceitem[data-idx="'+idx+'"]')
		newItemValue = (100 - parseFloat(evt.target.value))/100 * (currentItemPriceHolder.innerHTML.slice(1))
		newItemValue = newItemValue.toFixed(2)
		newItemValue = parseFloat(newItemValue)
		myShoppingList.editPriceInList(idx, newItemValue);
		render(shoppingListCont, myShoppingList);
	}
}

// INIT VARIABLES
const shoppingListInput = document.querySelector('.js-shopping-list-item');
const addToList = document.querySelector('.js-add-to-list');
const shoppingListCont = document.querySelector('.js-shopping-list-container')
const addToListPrice = document.querySelector('.js-shopping-list-item-price')
const totalDisplayPrice = document.querySelector('.js-total')
const maxBudget = document.querySelector('.js-max-budget')

// EVENT HANDLERS
addToList.addEventListener('click', onAddToListClicked);
shoppingListInput.addEventListener('keypress', onEnterKeyPressedItem);
addToListPrice.addEventListener('keypress', onEnterKeyPressedPrice);
shoppingListCont.addEventListener('click', onContainerClicked);
shoppingListCont.addEventListener('keypress', onContainerItemKeyPressed);
shoppingListCont.addEventListener('keypress', onContainerPriceKeyPressed);
