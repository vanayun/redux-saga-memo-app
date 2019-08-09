import React, { Component } from 'react';
import {
  InputPlaceholder,
  WhiteBox
} from 'components/WriteMemo';
import { InputSet, SaveButton } from 'components/Shared';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uiActions from 'modules/ui';
import * as memoActions from 'modules/memo';
import enhanceWithClickOutside from 'react-click-outside';

class WriteMemo extends Component {
  handleFocus = () => {
    const { focused, UIActions } = this.props;
    if (!focused) {
      UIActions.focusInput();
    }
  };

  handleClickOutside = () => {
    const { UIActions, focused, title, body } = this.props;

    if (focused) {
      if (title !== '' || body !== '') return;
      UIActions.blurInput();
    }
  };

  handleChange = e => {
    const { UIActions } = this.props;
    const { name, value } = e.target;
    UIActions.changeInput({ name, value });
  };

  handleCreate = () => {
    const {
      UIActions,
      MemoActions,
      title,
      body,
      cursor
    } = this.props;
    try {
      MemoActions.createMemo({
        title,
        body,
        cursor
      });

      UIActions.resetInput();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const {
      handleFocus,
      handleChange,
      handleCreate
    } = this;
    const { focused, title, body } = this.props;

    return focused ? (
      <WhiteBox>
        <InputSet
          onChange={handleChange}
          title={title}
          body={body}
        />
        <SaveButton onClick={handleCreate} />
      </WhiteBox>
    ) : (
      <WhiteBox onClick={handleFocus}>
        <InputPlaceholder />
      </WhiteBox>
    );
  }
}

const mapStateToProps = state => ({
  focused: state.ui.write.focused,
  title: state.ui.write.title,
  body: state.ui.write.body,
  cursor: state.memo.memoList[0]
    ? state.memo.memoList[0].id
    : 0
});

const mapDispatchToProps = dispatch => ({
  UIActions: bindActionCreators(uiActions, dispatch),
  MemoActions: bindActionCreators(memoActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(enhanceWithClickOutside(WriteMemo));
