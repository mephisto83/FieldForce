/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict'


import React from 'react-native';
import FieldForce from './native/android/app';
import {DEFAULT_URL} from './native/globals';
import {service} from './src/service/serviceCaller'

 
var {
  AppRegistry
} = React;

service.setDomain(DEFAULT_URL);

AppRegistry.registerComponent('FieldForce', () => FieldForce);