import { Icon } from '@iconify/react';
import Pill from '../pill';

const CartWidget = () => {
    return (
        <div className='cart-widget'>
            <Pill quantity={5} />
            <Icon className='cart-widget__cart' icon="f7:cart-fill" />
        </div>
    );
};

export default CartWidget;
