import { useEffect, useState } from "react";
import Product from "../../models/product";

const PRODUCTS_URL = "https://dummyjson.com/products";

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${PRODUCTS_URL}?limit=20&skip=${count*20}`);
                const result = await response.json();

                if (result && result.products && result.products.length) {
                    setProducts(result.products);
                    setIsLoading(false);
                }
            } catch (error: any) {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const onLoadMoreClick = () => null;

    if (isLoading) {
        return <div> Loading products. Please wait...</div>
    }

    return (
        <div className="container">
            <div className="products-container">
                {
                    products && products.length ? (
                        products.map(p => (
                            <div className="product" key={p.id}>
                                <img alt={p.title} src={p.thumbnail} />
                                <p>{p.title}</p>
                            </div>
                        ))
                    ) : null
                }
            </div>
            <div className="button-container">
                <button onClick={onLoadMoreClick}>Load More Products</button>
            </div>
        </div>
    );
};

export default Products;