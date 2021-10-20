import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {
  const dispatchFn = useDispatch();
  const cartQuantity = useSelector(state => state.cartStore.totalQuantity);
  const handleToggleCart = () => {
    dispatchFn(uiActions.toggle());
  }
  return (
    <button className={classes.button} onClick={handleToggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
