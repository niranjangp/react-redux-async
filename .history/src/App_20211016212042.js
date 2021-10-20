import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

let isLoaded = true;

function App() {
  const displayCart = useSelector(state => state.uiStore.cartIsVisible);
  const cart = useSelector((state) => state.cartStore);
  const dispatchFn = useDispatch();
  const showNotif = useSelector(state => state.uiStore.notification)

  useEffect(() => {
    const fetchData = async () => {
      dispatchFn(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!'
      }));

      const response = await fetch('https://react-http-aafdf-default-rtdb.firebaseio.com/reduxcart.jso', {
        method: 'PUT',
        body: JSON.stringify(cart),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        //const respData = await response.json();
        dispatchFn(uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data Successfully'
        }));

      } else {
        throw new Error("Sending cart data Failed!");
      }
    }

    if (isLoaded) {
      isLoaded = false;
      return;
    }

    fetchData().catch((e) => {
      dispatchFn(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: e.message
      })
      );
    });
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
