import React, { useEffect, useState } from 'react';
import { RowSection, Banner, Footer } from '../../components';
import { getProducts } from '../../services/flixycartApi';
import './Home.scss';

const Home = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        if (res.status === 200) {
          setProducts(res.data.result);
        }
      } catch (error) {
        //
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="Home__root w-full min-h-screen d-flex flex-col">
      <Banner />
      <section className="Home__section">
        <RowSection title="Trending" align="center" books={products?.slice(0, 4)} id="trending" />
        <RowSection title="Top Sellers" align="center" books={products?.slice(4, 8)} />
        <RowSection title="Books on Sale" align="center" books={products?.slice(6, 10).reverse()} />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
