import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {auth} from './firebase.js'
import AppLoading from 'expo-app-loading'
import UnauthenticatedNavigator from './navigators/UnauthenticatedNavigator'
import AuthenticatedNavigator from './navigators/AuthenticatedNavigator'

const App = () => {
  
  const [loaded,setLoaded]=useState(false)
  const [loggedIn,setLoggedIn]=useState(false)

  auth.onAuthStateChanged((user)=>  {
    if(user)  {
      setLoggedIn(true)
    } else  {
      setLoggedIn(false)
    }
    setLoaded(true)
  })
  if(loaded)  {
    if(loggedIn)  {
      return <AuthenticatedNavigator  />
    }
    return <UnauthenticatedNavigator  />
  }
  return <AppLoading  />
 
}

export default App

const styles = StyleSheet.create({})
