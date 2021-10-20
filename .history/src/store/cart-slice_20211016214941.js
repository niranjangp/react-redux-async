import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from './ui-slice'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            } else {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                })
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        },
    },
});

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
                body: JSON.stringify(cartData),
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

export const cartActions = cartSlice.actions;
export default cartSlice;