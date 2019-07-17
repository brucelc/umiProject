
import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';

import styles from './products.css';

const Products = ({ dispatch, products }) => {
  function handleDelete(id: any) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  return (
    <div>
      <h2>List of Products</h2>
      <ProductList onDelete={handleDelete} products={products} />
    </div>
  );
};

export default connect(({ products }) => ({
  products,
}))(Products);

// export default function() {
//   return (
//     <div className={styles.normal}>
//       <h1>Page products</h1>
//     </div>
//   );
// }
