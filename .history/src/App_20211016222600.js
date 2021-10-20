import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import Notification from './components/UI/Notification';
import { sendCartDataActionCreator, fetchDataActionCreator } from './store/cart-actions'

let isLoaded = true;

function App() {
  const displayCart = useSelector(state => state.uiStore.cartIsVisible);
  const cart = useSelector((state) => state.cartStore);
  const dispatchFn = useDispatch();
  const showNotif = useSelector(state => state.uiStore.notification)

  useEffect(() => {
    dispatchFn(fetchDataActionCreator());
  }, [dispatchFn]);

  useEffect(() => {
    if (isLoaded) {
      isLoaded = false;
      return;
    }
    if (cart.changed) {
      dispatchFn(sendCartDataActionCreator(cart));
    }

  }, [cart, dispatchFn]);

  return (
    <Fragment>
      <Layout>
        {showNotif ? <Notification status={showNotif.status} title={showNotif.title} message={showNotif.message} /> : null}
        {displayCart ? <Cart /> : null}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
