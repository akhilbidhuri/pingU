import { createStore } from "redux";

import reducer from './reducer'

function configureStore(state = { data: [] }) {
    return createStore(reducer,state);
  }
  export default configureStore;