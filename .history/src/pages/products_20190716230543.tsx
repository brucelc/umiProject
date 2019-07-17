import { connect } from 'dva';
import React from 'React';
import router from 'umi/router';
import Link from 'umi/Link';

import ProductList from '../components/ProductList';

const Products = ({ dispatch, products }: any) => {
  function handleDelete(id: string) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  return (
    <div>
      <h2>List of Products</h2>
      <button onClick={() => { router.goBack(); }}>go back</button>
      <Link to="/login">去登陆</Link>
      <ProductList onDelete={handleDelete} products={products} />
    </div>
  );
};

export default connect(({ products }: any) => ({
  products,
}))(Products);