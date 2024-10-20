import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cart/cartSlice';
//COMPONENTS
import { message } from 'antd';
import AtcBox from './AtcBox';
//UTILS
import { convertPrice } from '../utils/convertPrice';
import { formatPrice } from '../utils/formatPrice';

const ProductCard = ({ product, showInformations = false, customStyle, hideDefaultQuantity = false }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      weight: product.weight,
      brand: product.brand,
      category: product.category,
      discountPercentage: product.discountPercentage,
      quantity,
    }));
    message.success(`${product.title} je uspešno dodan u korpu!`);
  };

  const calculateDiscountPrice = (price, discountPercentage) => {
    return price - (price * discountPercentage / 100);
  };

  const discountPrice = calculateDiscountPrice(product.price, product.discountPercentage);

  return (
    <div onClick={() => navigate(`/product/${product.id}`)} className={`product-card cursor-pointer ${customStyle ? customStyle : ''}`}>
      <figure className="h-[284px] mb-[16px] flex items-center justify-center bg-[#F0F0F0] relative group">
        <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-contain" />
        {!hideDefaultQuantity && (
          <AtcBox
            quantity={quantity}
            handleQuantityChange={(action) => {
              if (action === 'increase') setQuantity(prev => prev + 1);
              if (action === 'decrease' && quantity > 1) setQuantity(prev => prev - 1);
            }}
            handleAddToCart={handleAddToCart}
          />
        )}
      </figure>

      <div>
        <h3 className="text-[18px] leading-[24px] font-bold mt-2 mb-[7px]">{product.title}</h3>

        {showInformations && (
          <div>
            <p className="text-[18px] text-gray-600 leading-[24px] mb-[16px]">{product.description}</p>
            {product.category && (
              <div className="text-[18px] text-black leading-[24px] mb-[16px]">
                Category: <span className="font-semibold">{product.category}</span>
              </div>
            )}
            {product.brand && (
              <div className="text-[18px] text-black leading-[24px] mb-[16px]">
                Brand: <span className="font-semibold">{product.brand}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 product-prices">
          <p className="text-[24px] leading-[33px] font-semibold mt-2">{formatPrice(convertPrice(discountPrice))} <span className='text-[13px] leading-[18px]'>RSD</span></p>
          {product.discountPercentage > 0 && (
            <p className="text-[18px] line-through text-red-600">{formatPrice(convertPrice(product.price))} RSD</p>
          )}
        </div>

        {hideDefaultQuantity && (
          <AtcBox
            quantity={quantity}
            handleQuantityChange={(action) => {
              if (action === 'increase') setQuantity(prev => prev + 1);
              if (action === 'decrease' && quantity > 1) setQuantity(prev => prev - 1);
            }}
            handleAddToCart={handleAddToCart}
          />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
