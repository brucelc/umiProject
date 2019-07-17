import { connect } from 'dva';
import React from 'React';
import ProductList from '../components/ProductList';

const Products = ({ dispatch, products }) => {
  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  return (
    <div>
      123
      {/* <h2>List of Products</h2> */}
      {/* <ProductList onDelete={handleDelete} products={products} /> */}
    </div>
  );
};

export default connect(({ products }) => ({
  products,
}))(Products);