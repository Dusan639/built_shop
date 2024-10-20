import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/slices/cart/cartSlice';
//UTILS
import { convertPrice } from '../utils/convertPrice';
import { formatPrice } from '../utils/formatPrice';

const CartItems = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id, quantity) => {
        if (quantity < 1) return; 
        dispatch(updateQuantity({ id, quantity }));
    };

    const calculateDiscountPrice = (price, discountPercentage) => {
        return price - (price * discountPercentage / 100);
    };

    return (
        <div className="grid gap-[22px]">
            {cartItems.map((item) => {
                const discountPrice = calculateDiscountPrice(item.price, item.discountPercentage);

                return (
                    <div key={item.id} className="pb-[21px] border-b border-[#B9B9B9]">
                        <div className="flex gap-[37px]">
                            <figure className="flex items-center justify-center w-[143px] h-[143px] shrink-0 bg-[#F0F0F0]">
                                <img src={item.thumbnail} alt={item.title} className="object-contain" />
                            </figure>
                            <div className='flex flex-col justify-between w-full'>
                                <div className='flex flex-col md:flex-row justify-between mb-[12px] md:mb-0'>
                                    <div>
                                        <h3 className='text-[16px] md:text-[18px] leading-[24px] font-bold '>{item.title}</h3>
                                        <p className='text-[15px] leading-[23px]'>{item.weight} g</p>
                                    </div>
                                    <div className='flex flex-col gap-[5px]'>
                                        <p className="flex gap-[5px] text-[16px] md:text-[24px] leading-[33px]">{formatPrice(convertPrice(discountPrice))}
                                            <span className='text-[13px] leading-[18px]'>RSD</span>
                                        </p>
                                        {item.discountPercentage > 0 && (
                                            <p className='flex gap-[5px] text-[#C94D00] text-[16px] leading-[18px]'>
                                                <span className='line-through'>{formatPrice(convertPrice(item.price))}</span>
                                                <span className='text-[11px] leading-[11px] mb-[5px] text-[#C94D00]'>RSD</span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-[10px] md:gap-[26px] md:mb-[10px]">
                                    <div className="flex items-center jusify-center w-[98px] h-[35px] gap-[11px] rounded-[100px] border border-black border-solid">
                                        <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            className='flex-1 flex justify-center'
                                        >
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g>
                                                    <path d="M14.6304 7.98021H0V6.65018H14.6304V7.98021Z" fill="black" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1_584">
                                                        <rect width="14.6304" height="14.6304" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            className='flex-1 flex justify-center'
                                        >
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g>
                                                    <path d="M14.6304 7.98021H0V6.65018H14.6304V7.98021Z" fill="black" />
                                                    <path d="M6.65016 14.6304L6.65016 -5.81376e-08L7.98019 0L7.98019 14.6304L6.65016 14.6304Z" fill="black" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1_581">
                                                        <rect width="14.6304" height="14.6304" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                        </button>
                                    </div>
                                    <button onClick={() => handleRemove(item.id)} className='text-[16px] leading-[28px] underline underline-offset-[5px]'>Ukloni</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CartItems;
