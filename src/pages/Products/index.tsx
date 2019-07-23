import { connect } from 'dva';
import React from 'react';
import router from 'umi/router';
import Link from 'umi/link';

// import ProductList from './component/productList';

// style
// import style from './style.less';

interface Iprops {
  dispatch: (arg0: any) => void,
  products: any,
}

class Products extends React.PureComponent<Iprops> {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    dispatch({
      type: 'products/list',
    });
  }

  handleDelete = (id: string) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }

  render() {
    const { products } = this.props;
    const { list = [] } = products;
    console.log('products', products, list);

    return (
      <div>
        <h2>List of Products</h2>
        <button onClick={() => { router.goBack(); }}>go back</button>
        <Link to="/login">退出登陆</Link>
        {/* <ProductList onDelete={this.handleDelete} products={list} /> */}
      </div>
    );
  }
}

export default connect(({ products }: any) => ({
  products,
}))(Products);
