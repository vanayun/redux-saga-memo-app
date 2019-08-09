import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from 'components/Header';
import Layout from 'components/Layout';
import WriteMemo from './WriteMemo';

import * as memoActions from 'modules/memo';
import MemoListContainer from './MemoListContainer';

class App extends Component {
  componentDidMount() {
    const { MemoActions } = this.props;
    MemoActions.getInitialMemo();
    MemoActions.getRecentMemo();
  }

  render() {
    return (
      <Layout>
        <Header />
        <Layout.main>
          <WriteMemo />
          <MemoListContainer />
        </Layout.main>
      </Layout>
    );
  }
}

export default connect(
  state => ({}), // 현재는 비어있는 객체를 반환합니다
  dispatch => ({
    MemoActions: bindActionCreators(memoActions, dispatch)
  })
)(App);
