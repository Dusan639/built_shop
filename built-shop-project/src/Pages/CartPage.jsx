import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//COMPONENTS
import CartItems from '../components/CartItems';
import OrderSummary from '../components/OrderSummary';

const CartPage = () => {
    const navigate = useNavigate();
    const { cartItems } = useSelector(state => state.cart);

    return (
        <section className="py-[50px]">
            <div className="max-w-[1240px] mx-auto px-[20px] flex flex-col md:flex-row justify-center gap-[40px]">
                <div className='flex-1 max-w-[764px]'>
                    <h1 className="text-black text-[24px] leading-[28px] font-bold mb-[42px]">Tvoja korpa</h1>

                    {cartItems.length === 0 ? (
                        <div>
                            <p className='mb-3 text-black text-[18px]'>Vaša korpa je prazna.</p>
                            <button
                                onClick={() => navigate('/all-products')}
                                className="bg-black text-white py-2 px-4 rounded"
                            >
                                Nastavite kupovinu
                            </button>
                        </div>
                    ) : (
                        <CartItems />
                    )}
                </div>
                <div className="flex-1 md:max-w-[381px] md:min-h-[454px]">
                    <OrderSummary />
                </div>
            </div>
        </section>
    );
};

export default CartPage;
