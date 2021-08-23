import React,{useEffect} from 'react'
import { View, Text } from 'react-native'
import Todos from './src/Screens/Todos';

import { Provider } from 'react-redux';
import {store} from './src/redux/store';

import SplashScreen from 'react-native-splash-screen';

export default function App() {

  useEffect(()=>{
    // SplashScreen.show()
    setTimeout(()=>{
      SplashScreen.hide()
    },1000)
  },[])


  return (
    <Provider store={store}>
      <Todos />
    </Provider>
  )
}
