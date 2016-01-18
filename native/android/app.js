import React, { Component } from 'react-native';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux/native';
import thunk from 'redux-thunk';


import {fieldForceReducer} from '../../src/reducers/fieldForceReducer';
import FieldForceAppAndroid from './fieldForceAppAndroid';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers({fieldForceReducer});

function configureStore(initialState){
  var store = createStoreWithMiddleware(reducer, initialState);
  
  return store;
}

var store;
    store = configureStore();
    
export default class FieldForceApp extends Component {
  // update 
  
  render() {
    return (
      <Provider store={store}>
        {
            () => <FieldForceAppAndroid /> 
        }
      </Provider>
    )
  }
}