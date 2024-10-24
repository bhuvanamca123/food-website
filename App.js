import React, { useState } from 'react';
import './App.css';
import Cart from './Cart';
import Payment from './Payment';
import FoodItem from './FoodItem';

function App() {
  // Sample data for food items
  const foodData = [
    { id: 1, name: 'Burger', price: 8.99, imageUrl: 'https://via.placeholder.com/300/ff6347/ffffff?text=Burger' },
    { id: 2, name: 'Pizza', price: 12.99, imageUrl: 'https://via.placeholder.com/300/ffa500/ffffff?text=Pizza' },
    { id: 3, name: 'Pasta', price: 10.99, imageUrl: 'https://via.placeholder.com/300/ffd700/ffffff?text=Pasta' },
    { id: 4, name: 'Salad', price: 7.99, imageUrl: 'https://via.placeholder.com/300/008000/ffffff?text=Salad' },
    { id: 5, name: 'Sushi', price: 15.99, imageUrl: 'https://via.placeholder.com/300/0000ff/ffffff?text=Sushi' },
  ];

  const [cart, setCart] = useState([]);
  const [page, setPage] = useState('home');

  // Add item to cart
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="App">
      <header>
        <h1>Online Food Ordering</h1>
        <nav>
          <button onClick={() => setPage('home')}>Home</button>
          <button onClick={() => setPage('cart')}>Cart ({cart.length})</button>
        </nav>
      </header>

      {page === 'home' && (
        <div className="food-gallery">
          {foodData.map((item) => (
            <FoodItem key={item.id} item={item} addToCart={addToCart} />
          ))}
        </div>
      )}

      {page === 'cart' && (
        <Cart cart={cart} removeFromCart={removeFromCart} goToPayment={() => setPage('payment')} />
      )}

      {page === 'payment' && (
        <Payment total={getTotalPrice()} goToHome={() => setPage('home')} />
      )}
    </div>
  );
}

export default App;
