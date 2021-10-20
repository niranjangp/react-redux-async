import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';

function App() {

  const displayCart = useSelector(state => state.uiStore.cartIsVisible);
  return (
    <Layout>
      {displayCart ? <Cart /> : null}
      <Products />
    </Layout>
  );
}

export default App;
