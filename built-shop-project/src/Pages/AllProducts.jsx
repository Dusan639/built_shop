import { useState } from 'react';
//DATA ACCESS
import { useFetchProductsQuery } from '../redux/slices/products/productsApiSlice';
//COMPONENTS
import ProductCard from '../components/ProductCard';
import { Spin } from 'antd';

const AllProducts = () => {
    const [page, setPage] = useState(1);
    const { data, error, isLoading } = useFetchProductsQuery({ page });

    const noMoreProducts = data && data.products.length < 16;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[500px]">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return <div>Greška pri učitavanju proizvoda: {error.message}</div>;
    }

    return (
        <section className="py-[50px] all-products">
            <div className="max-w-[1240px] mx-auto px-[20px]">
                <h1 className="text-black text-[20px] leading-[24px] font-bold flex items-end gap-[6px]">
                    Svi proizvodi
                    <span className="text-[15px] font-normal leading-[21px] opacity-[0.5]"> {data?.total || data?.products.length} proizvoda</span>
                </h1>
                <div className="mt-[28px] grid grid-cols-2 md:grid-cols-4 gap-x-[20px] md:gap-y-[60px] gap-y-[40px]">
                    {data?.products?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <div className="flex justify-between mt-5">
                    <button
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setPage(prev => prev + 1)}
                        disabled={noMoreProducts}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AllProducts;
