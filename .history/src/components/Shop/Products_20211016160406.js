import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCT = [
  {
    id: 'p1',
    price: 10,
    title: 'Shirt',
    description: 'A polo shirt for every need'
  },
  {
    id: 'p2',
    price: 20,
    title: 'Sweater',
    description: 'A woolen sweater for every need'
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCT.map((product) => (
          <ProductItem key={product.id}
            title={product.title}
            price={product.price}
            description={product.description} />
        ))}
      </ul>
    </section>
  );
};

export default Products;
