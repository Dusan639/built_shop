import { FiShoppingCart } from 'react-icons/fi';

const AtcBox = ({ quantity, handleQuantityChange, handleAddToCart }) => {
    return (
        <div className="absolute bottom-[8px] left-[8px] flex items-center gap-[6px] opacity-0 group-hover:opacity-100 transition-opacity quantity-box" 
             onClick={(e) => e.stopPropagation()} 
        >
            <div className="flex items-center jusify-center w-[98px] h-[35px] gap-[11px] rounded-[100px] bg-white quantity-items">
                <button
                    onClick={() => handleQuantityChange('decrease')}
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
                <span className='text-[16px]'>{quantity}</span>
                <button
                    onClick={() => handleQuantityChange('increase')}
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
            <button
                onClick={handleAddToCart} 
                className="bg-black text-white p-2 rounded-full">
                <FiShoppingCart className="h-5 w-5" />
            </button>
        </div>
    );
};

export default AtcBox;
