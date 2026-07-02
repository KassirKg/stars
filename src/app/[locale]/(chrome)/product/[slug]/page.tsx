import { ProductSlider } from '@/entities/banner';
import { AsideBar } from '@/widgets/asideBar';
import { ProductInfo } from '@/widgets/productInfo';

import styles from './ProductPage.module.scss';

const MOCK_DATAS = ['/images/ex9.jpg', '/images/ex10.jpg', '/images/ex11.jpg'];

const MOCK_INFO = {
  id: 1,
  title: 'Футболка',
  author: 'Egor Kreed',
  price: 2500,
  description: 'Премиальная футболка',
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  image: '/images/ex9.jpg',
};

const ProductPage = () => {
  return (
    <div className={styles.root}>
      <AsideBar title={MOCK_INFO.title} image={MOCK_INFO.image} />

      <section className={styles.hero}>
        <ProductSlider images={MOCK_DATAS} />

        <ProductInfo
          key={MOCK_INFO.id}
          title={MOCK_INFO.title}
          author={MOCK_INFO.author}
          price={MOCK_INFO.price}
          description={MOCK_INFO.description}
          sizes={MOCK_INFO.sizes}
          image={MOCK_INFO.image}
        />
      </section>
    </div>
  );
};

export default ProductPage;
