import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Login from '../screens/auth/Login'
import Register from '../screens/auth/Register'

const {Navigator, Screen}=createStackNavigator()
const UnauthenticatedNavigator=()=> {
return (
    <NavigationContainer>
        <Navigator initialRouteName='Login'>
            <Screen name='Login' component={Login} options={{headerShown: false}} />
            <Screen name='Register' component={Register} options={{headerShown: false}}    />
        </Navigator>
    </NavigationContainer>
)
}
export default UnauthenticatedNavigator