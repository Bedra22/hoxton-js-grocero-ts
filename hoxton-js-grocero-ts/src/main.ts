import './style.css'
import './reset.css'
type storeitem={
  id: number;
  name: string;
  price: number;
  incart: number;
}

type State={
  storeItems:storeitem
}
let state: State={
  storeItems:[{
    id:1,
    name:"Beetroot",
    price:0.50,
    incart:0,
    stock:0
  },
  {
    id: 2,
    name:"Carrot",
    price:0.10,
    incart:0,
    stock:0
  },
  {
    id: 3,
    name:"Apple",
    price:0.20,
    incart:0,
    stock:0
  },
  {
    id: 4,
    name:"Apricot",
    price:0.30,
    incart:0,
    stock:0
  },
  {
    id: 5,
    name:"Avocados",
    price:0.40,
    incart:0,
    stock:0
  },
  {
    id: 6,
    name:"Bananas",
    price:0.60,
    incart:0,
    stock:0
  },
  {
    id: 7,
    name:"Bellpepper",
    price:0.70,
    incart:0,
    stock:0
  },
  {
    id: 8,
    name:"Berry",
    price:0.80,
    incart:0,
    stock:0
  },
  {
    id: 9,
    name:"Blueberry",
    price:0.90,
    incart:0,
    stock:0
  },
  {
    id: 10,
    name:"Eggplant",
    price:0.10,
    incart:0,
    stock:0
  },
],
}
function getimgpath(item: storeitem) {
  let id = String(item.id).padStart(3, '0')
  return `assets/icons/${id}-${item.name}.svg`
}
function cartitems () {
  return state.storeItems.filter(item => item.incart > 0)
}


function increasestock (item: storeitem) {
  if (item.stock === 0) return

  item.incart++
  item.stock--
}

function decreasestock (item: storeitem) {
  if (item.incart > 0) {
    item.incart--
    item.stock++
  }
}

function renderstoreitems () {
  let storeUl = document.querySelector('.store--item-list')
  storeUl.textContent = ''

  for (let item of state.storeItems) {
    let storeEl = document.createElement('li')

    let icondiv = document.createElement('div')
    icondiv.className = '.store--item-icon'

    let iconimg = document.createElement('img')
    iconimg.src = getimgpath(item)

    let addBtn = document.createElement('button')
    addBtn.textContent = `Add to cart (${item.stock})`
    addBtn.addEventListener('click', function () {
      increasestock(item)
      render()
    })

    icondiv.append(iconimg)
    storeEl.append(icondiv, addBtn)
    storeUl.append(storeEl)
  }
}

function rendercartitems () {
  let cartUl = document.querySelector('.cart--item-list')
  cartUl.textContent = ''

  let cartItems = cartitems()

  for (let item of cartItems) {
    let cartLi = document.createElement('li')

    let itemimg = document.createElement('img')
    itemimg.className = 'cart--item-icon'
    itemimg.src = getimgpath(item)
    itemimg.alt = item.name

    let itemname = document.createElement('p')
    itemname.textContent = item.name

    let removebutton = document.createElement('button')
    removebutton.className = 'quantity-btn remove-btn center'
    removebutton.textContent = '-'
    removebutton.addEventListener('click', function () {
      decreasestock(item)
      render()
    })

    let quantitySpan = document.createElement('span')
    quantitySpan.className = 'quantity-text center'
    quantitySpan.textContent = String(item.inCart)

    let addbutton = document.createElement('button')
    addbutton.className = 'quantity-btn add-btn center'
    addbutton.textContent = '+'
    addbutton.addEventListener('click', function () {
      increasestock(item)
      render()
    })

    cartLi.append(itemimg, itemname, removebutton, quantitySpan, addbutton)
    cartUl.append(cartLi)
  }
}

function render () {
  renderstoreitems()
  rendercartitems()
}

render()
