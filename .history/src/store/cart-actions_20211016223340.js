import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

export const fetchDataActionCreator = () => {
    return async (dispatchFn) => {
        const fetchData = async () => {
            const response = await fetch('https://react-http-aafdf-default-rtdb.firebaseio.com/reduxcart.json');

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error('Could not load cart data!');
            }

        }
        try {
            const cartData = await fetchData();
            dispatchFn(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }));
        } catch (e) {
            dispatchFn(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data Failed!',
            }));
        }
    }
}


export const sendCartDataActionCreator = (cartData) => {
    return async (dispatchFn) => {
        dispatchFn(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }));

        const sendRequest = async () => {
            const response = await fetch('https://react-http-aafdf-default-rtdb.firebaseio.com/reduxcart.json', {
                method: 'PUT',
                body: JSON.stringify({ items: cartData.items, totalQuantity: cartData.totalQuantity }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error("Sending cart data Failed!");
            }
        }

        try {
            await sendRequest();
            dispatchFn(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully!',
            }));
        } catch (e) {
            dispatchFn(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sent cart data Failed!',
            }));
        }
    };
}