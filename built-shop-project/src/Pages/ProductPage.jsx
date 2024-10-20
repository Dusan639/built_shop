import { useParams } from 'react-router-dom';
//DATA ACCESS
import { useFetchProductByIdQuery } from '../redux/slices/products/productsApiSlice';
//COMPONENTS
import ProductCard from '../components/ProductCard';
import { Spin } from 'antd'

const ProductPage = () => {
  const { id } = useParams();
  const { data: product, error, isLoading } = useFetchProductByIdQuery(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div>Greška pri učitavanju proizvoda</div>;
  }

  return (
    <div className="max-w-[1240px] mx-auto py-[50px] px-[20px] product-page">
      <ProductCard
        product={product}
        showInformations
        hideDefaultQuantity
        customStyle={'flex flex-col md:flex-row'}
      />
    </div>
  );
};

export default ProductPage;
