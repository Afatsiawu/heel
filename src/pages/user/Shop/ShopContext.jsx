import { createContext, useContext, useMemo, useState } from 'react'

const ShopContext = createContext(null)

const ALL_PRODUCTS = [
  { id: 1, name: 'Sable Stiletto', price: 198, tag: 'Bestseller', material: 'Suede', category: 'Stilettos', heelHeight: '110mm', color: 'Black', heelType: 'Pointed stiletto' },
  { id: 2, name: 'Ava Block Heel', price: 185, tag: 'New', material: 'Leather', category: 'Block Heels', heelHeight: '75mm', color: 'Chestnut', heelType: 'Square block' },
  { id: 3, name: 'Vera Wedge', price: 172, tag: null, material: 'Braided raffia', category: 'Wedges', heelHeight: '65mm', color: 'Bone', heelType: 'Espadrille wedge' },
  { id: 4, name: 'Celeste Sandal', price: 142, tag: 'Limited', material: 'Patent leather', category: 'Heeled Sandals', heelHeight: '85mm', color: 'Red', heelType: 'Strappy sandal' },
  { id: 5, name: 'Mina Pointed Toe', price: 205, tag: 'New', material: 'Nappa leather', category: 'Pumps', heelHeight: '90mm', color: 'Nude', heelType: 'Classic pump' },
  { id: 6, name: 'Noir Ankle Boot', price: 225, tag: null, material: 'Polished leather', category: 'Boots', heelHeight: '80mm', color: 'Ebony', heelType: 'Lace-up boot' },
  { id: 7, name: 'Luna Peep Toe', price: 165, tag: 'Bestseller', material: 'Velvet', category: 'Pumps', heelHeight: '75mm', color: 'Emerald', heelType: 'Peep toe pump' },
  { id: 8, name: 'Ivy Mule', price: 155, tag: null, material: 'Soft leather', category: 'Mules', heelHeight: '55mm', color: 'Rose', heelType: 'Slip-on mule' },
  { id: 9, name: 'Harper Slingback', price: 189, tag: null, material: 'Leather', category: 'Heeled Sandals', heelHeight: '95mm', color: 'Silver', heelType: 'Slingback sandal' },
  { id: 10, name: 'Luna Bootie', price: 218, tag: 'New', material: 'Suede', category: 'Boots', heelHeight: '70mm', color: 'Olive', heelType: 'Chunky bootie' },
  { id: 11, name: 'Nina Kitten Heel', price: 128, tag: null, material: 'Satin', category: 'Pumps', heelHeight: '45mm', color: 'Blush', heelType: 'Kitten heel' },
  { id: 12, name: 'Rhea Platform', price: 230, tag: 'Limited', material: 'Leather', category: 'Platforms', heelHeight: '95mm', color: 'White', heelType: 'Platform heel' },
]

const CATEGORIES = ['All', ...Array.from(new Set(ALL_PRODUCTS.map(product => product.category)))]
const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: low to high', value: 'price-asc' },
  { label: 'Price: high to low', value: 'price-desc' },
  { label: 'Name A–Z', value: 'name' },
]

const INITIAL_SHIPPING = {
  fullName: '',
  address: '',
  city: '',
  postcode: '',
  country: '',
  phone: '',
}

export function ShopProvider({ children }) {
  const [user, setUser] = useState({ email: '', password: '' })
  const [loggedIn, setLoggedIn] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [cart, setCart] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [shipping, setShipping] = useState(INITIAL_SHIPPING)
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')

  const filteredProducts = useMemo(() => {
    const list = activeCategory === 'All'
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter(product => product.category === activeCategory)

    if (sortBy === 'price-asc') return [...list].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') return [...list].sort((a, b) => b.price - a.price)
    if (sortBy === 'name') return [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [activeCategory, sortBy])

  const cartItems = useMemo(
    () => cart.map(item => ({
      ...ALL_PRODUCTS.find(product => product.id === item.id),
      quantity: item.quantity,
    })),
    [cart]
  )

  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = cartQuantity ? 15 : 0
  const taxAmount = Math.round(cartSubtotal * 0.08)
  const orderTotal = cartSubtotal + shippingCost + taxAmount

  function handleUserChange(event) {
    const { name, value } = event.target
    setUser(current => ({ ...current, [name]: value }))
    setLoginError('')
  }

  function handleLogin(event) {
    event.preventDefault()
    if (!user.email.includes('@') || user.password.length < 5) {
      setLoginError('Enter a valid email and password with at least 5 characters.')
      return
    }
    setLoggedIn(true)
    setLoginError('')
  }

  function handleLogout() {
    setLoggedIn(false)
    setUser({ email: '', password: '' })
    setCheckoutSuccess(false)
    setCheckoutError('')
  }

  function handleAdd(productId) {
    setCart(current => {
      const existing = current.find(item => item.id === productId)
      if (existing) {
        return current.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...current, { id: productId, quantity: 1 }]
    })
    setCheckoutSuccess(false)
  }

  function handleRemove(productId) {
    setCart(current => current.filter(item => item.id !== productId))
  }

  function handleQuantity(productId, delta) {
    setCart(current => current.flatMap(item => {
      if (item.id !== productId) return item
      const nextQty = item.quantity + delta
      return nextQty > 0 ? { ...item, quantity: nextQty } : []
    }))
    setCheckoutSuccess(false)
  }

  function handleShippingChange(event) {
    const { name, value } = event.target
    setShipping(current => ({ ...current, [name]: value }))
    setCheckoutError('')
  }

  function handleCheckout(event) {
    event.preventDefault()
    if (!loggedIn) {
      setCheckoutError('Please sign in before checking out.')
      return
    }
    if (!cartQuantity) {
      setCheckoutError('Add items to your cart before checkout.')
      return
    }
    const missing = Object.entries(shipping).filter(([, value]) => !value.trim())
    if (missing.length > 0) {
      setCheckoutError('Complete all shipping details to place your order.')
      return
    }
    
    // Save order to localStorage
    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      email: user.email,
      fullName: shipping.fullName,
      address: shipping.address,
      city: shipping.city,
      postcode: shipping.postcode,
      country: shipping.country,
      phone: shipping.phone,
      items: cartItems,
      subtotal: cartSubtotal,
      shipping: shippingCost,
      tax: taxAmount,
      total: orderTotal,
    }
    
    const existingOrders = localStorage.getItem('heels_orders')
    const orders = existingOrders ? JSON.parse(existingOrders) : []
    orders.push(order)
    localStorage.setItem('heels_orders', JSON.stringify(orders))
    
    setCheckoutSuccess(true)
    setCheckoutError('')
    setCart([])
  }

  return (
    <ShopContext.Provider
      value={{
        ALL_PRODUCTS,
        CATEGORIES,
        SORT_OPTIONS,
        user,
        loggedIn,
        loginError,
        cart,
        cartItems,
        cartQuantity,
        cartSubtotal,
        shippingCost,
        taxAmount,
        orderTotal,
        shipping,
        checkoutSuccess,
        checkoutError,
        activeCategory,
        sortBy,
        filteredProducts,
        handleUserChange,
        handleLogin,
        handleLogout,
        handleAdd,
        handleRemove,
        handleQuantity,
        handleShippingChange,
        handleCheckout,
        setActiveCategory,
        setSortBy,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

export function useShop() {
  const context = useContext(ShopContext)
  if (!context) {
    throw new Error('useShop must be used inside ShopProvider')
  }
  return context
}