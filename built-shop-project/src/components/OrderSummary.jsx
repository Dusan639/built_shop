import { useSelector } from 'react-redux';
//UTILS
import { convertPrice } from '../utils/convertPrice';
import { formatPrice } from '../utils/formatPrice';

const OrderSummary = () => {
    const { cartItems } = useSelector(state => state.cart);

    // Funkcija za računanje ukupne cene (s popustom)
    const calculateTotalAmountWithDiscount = () => {
        return cartItems.reduce((acc, item) => {
            const discountPrice = item.discountPercentage > 0
                ? item.price - (item.price * item.discountPercentage / 100)
                : item.price;
            return acc + (discountPrice * item.quantity);
        }, 0);
    };

    // Funkcija za računanje ukupne uštede
    const calculateTotalSavings = () => {
        return cartItems.reduce((acc, item) => {
            if (item.discountPercentage > 0) {
                const originalPrice = item.price * item.quantity;
                const discountPrice = originalPrice - (originalPrice * item.discountPercentage / 100);
                return acc + (originalPrice - discountPrice); // Dodaj razliku između originalne i snižene cene
            }
            return acc;
        }, 0);
    };

    const totalAmountWithDiscount = calculateTotalAmountWithDiscount();
    const totalSavings = calculateTotalSavings();

    return (
        (totalAmountWithDiscount > 0) && (
            <div className="w-full pt-[24px] pr-[22px] pb-[48px] pl-[23px] bg-[#F6F6F6] rounded-[5px]">
                <h2 className="text-black text-[18px] leading-[24px] font-bold mb-[28px]">Tvoja narudžbina</h2>
                <div className="flex justify-between mb-[13px]">
                    <h3 className='text-[16px] leading-[28px]'>Ukupno</h3>
                    <span>{formatPrice(convertPrice(totalAmountWithDiscount))} RSD</span>
                </div>
                <div className="flex justify-between mb-[15px]">
                    <h3>Ušteda</h3>
                    <span>-{formatPrice(convertPrice(totalSavings))} RSD</span>
                </div>
                <div className="flex justify-between items-center mb-[17px] pb-[12px] border-b border-[#979797]">
                    <h3 className="text-text-[16px] leading-[28px]">Isporuka Daily Express*</h3>
                    <p className="text-[12px] tracking-[-0.25px]">Besplatna</p>
                </div>
                <div className="flex justify-between mb-[9px]">
                    <p className="text-[16px] leading-[28px]">Ukupno za uplatu</p>
                    <span className='text-[18px] leading-[25px] tracking-[-0.25px]'>{formatPrice(convertPrice(totalAmountWithDiscount))} RSD</span>
                </div>
                <p className="text-[12px] tracking-[-0.25px] mb-[33px]">Cena je sa uključenim PDV-om</p>
                <button className="bg-black text-white  text-[18px] w-full h-[45px] flex items-center justify-center py-3 rounded-[100px]">Prijavi se za brže plaćanje</button>
            </div>
        )
    );
};

export default OrderSummary;
