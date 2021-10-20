import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { uiActions } from './store/ui-slice';

function App() {
  const displayCart = useSelector(state => state.uiStore.cartIsVisible);
  const cart = useSelector((state) => state.cartStore);
  const dispatchFn = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatchFn(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!'
      }));

      const response = await fetch('https://react-http-aafdf-default-rtdb.firebaseio.com/reduxcart.json', {
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
    <Layout>
      {displayCart ? <Cart /> : null}
      <Products />
    </Layout>
  );
}

export default App;
