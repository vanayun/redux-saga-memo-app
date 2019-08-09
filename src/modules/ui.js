import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const FOCUS_INPUT = '@ui/write/FOCUS_INPUT';
const BLUR_INPUT = '@ui/write/BLUR_INPUT';
const CHANGE_INPUT = '@ui/write/CHANGE_INPUT';
const RESET_INPUT = '@ui/write/RESET_INPUT';

export const focusInput = createAction(FOCUS_INPUT);
export const blurInput = createAction(BLUR_INPUT);
export const changeInput = createAction(CHANGE_INPUT);
export const resetInput = createAction(RESET_INPUT);

const initialState = {
  write: {
    focused: false,
    title: '',
    body: ''
  }
};

export default handleActions(
  {
    [FOCUS_INPUT]: (state, action) =>
      produce(state, draft => {
        console.log(draft);
        draft.write.focused = true;
      }),
    [BLUR_INPUT]: (state, action) =>
      produce(state, draft => {
        draft.write.focused = false;
      }),
    [CHANGE_INPUT]: (state, action) =>
      produce(state, draft => {
        const { name, value } = action.payload;
        draft.write[name] = value;
      }),
    [RESET_INPUT]: (state, action) =>
      produce(state, draft => {
        draft.write = initialState.write;
      })
  },
  initialState
);
