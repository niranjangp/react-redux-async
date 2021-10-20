import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const displayCart = useSelector(state => state.uiStore.cartIsVisible);
  const cart = useSelector((state) => state.cartStore);

  useEffect(() => {
    fetch('https://react-http-aafdf-default-rtdb.firebaseio.com/reduxcart.json', {
      method: 'PUT',
      body: JSON.stringify(cart),
      headers: { 'Content-Type': 'application/json' },
    })
  }, [cart]);

  return (
    <Layout>
      {displayCart ? <Cart /> : null}
      <Products />
    </Layout>
  );
}

export default App;
