import React from 'react';
import styled from 'styled-components';
import { media } from 'lib/style-utils';

import Memo from './Memo';

const Wrapper = styled.div`
  display: block;
  margin-top: 0.5rem;
  font-size: 0px; /* inline-block 위아래 사이에 생기는 여백을 제거합니다 */

  ${media.mobile`
        margin-top: 0.25rem;
    `}
`;

const MemoList = ({ memos, onOpen }) => {
  const memoList = memos.map(memo => (
    <Memo key={memo.id} memo={memo} onOpen={onOpen} />
  ));
  return <Wrapper>{memoList}</Wrapper>;
};

export default MemoList;
