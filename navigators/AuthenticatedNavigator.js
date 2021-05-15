import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {MaterialCommunityIcons} from 'react-native-vector-icons'
import Home from '../screens/main/Home'
import Profile from '../screens/main/Profile'
import { NavigationContainer } from '@react-navigation/native'

import {auth} from '../firebase'

const {Navigator, Screen}=createBottomTabNavigator()

const AuthenticatedNavigator = () => {
    return (
        <NavigationContainer>
            <Navigator
                initialRouteName="Home"
                tabBarOptions={{
                    activeTintColor: '#1e90ff',
                    showLabel: true,
                }}>
                <Screen
                    name="Home"
                    component={Home}
                    options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),}}
                />
                 <Screen
                        name="Profile"
                        component={Profile}
                        options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account" color={color} size={size} />
                        ),
                        
                        }}
                        listeners={({ navigation, route }) =>{ 
                                return ({
                              tabPress: () => navigation.setParams({ user: {id: auth.currentUser.uid, name: auth.currentUser.displayName, photoURL: auth.currentUser.photoURL} })                                
                            })}}
                    />
                 {/* listeners={({ navigation, route }) =>{ 
                //     return ({
                //   tabPress: () => navigation.setParams({ user: {id: auth.currentUser.uid, name: auth.currentUser.displayName, photoURL: auth.currentUser.photoURL} }),
                    
                // })}}
                // /> */}
            </Navigator>
        </NavigationContainer>
    )
}

export default AuthenticatedNavigator
