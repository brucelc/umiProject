import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';

import withRouter from 'umi/withRouter';

// components
import Loader from 'components/Loader';
import NProgress from 'nprogress';
import PublicLayout from './PublicLayout';
import PrimaryLayout from './PrimaryLayout';

// unitls
import { queryLayout } from 'utils/index';
import { config } from 'utils/config';

// style
import './index.less';

const LayoutMap = {
  primary: PrimaryLayout,
  public: PublicLayout,
  // 下面还可以继续增加不同的layout
};

interface Iprops {
  loading: any,
  children: boolean,
  location: any,
}

@withRouter
@connect(({ loading }) => ({ loading }))
class BaseLayout extends PureComponent<Iprops> {
  previousPath = '';

  render() {
    const { loading, children, location } = this.props;

    const Container = LayoutMap[queryLayout(config.layouts, location.pathname)];

    console.log('Container', queryLayout(config.layouts, location.pathname), config.layouts, location.pathname)
    const currentPath = location.pathname + location.search;
    if (currentPath !== this.previousPath) {
      NProgress.start();
    }

    if (!loading.global) {
      NProgress.done();
      this.previousPath = currentPath;
    }

    console.log('loading', loading);

    return (
      <Fragment>
        <Helmet>
          <title>{config.siteName}</title>
        </Helmet>
        <Loader fullScreen spinning={loading.effects['app/query']} />
        <Container>{children}</Container>
      </Fragment>
    );
  }
}

export default BaseLayout;
