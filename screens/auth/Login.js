import React,{useState} from 'react'
import { StyleSheet, Text, View,TextInput, Button } from 'react-native'
import globalStyles from '../../utilities/globalStyles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {auth} from '../../firebase'
const Login = ({navigation}) => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const submit=async ()=>   {
    auth.signInWithEmailAndPassword(email,password).then((result)=>{
        console.log(result)
        navigation.navigate('')
    }).catch(error=>alert(error))
    }

    return (
        <View style={globalStyles.Gcontainer}>
            <Text style={globalStyles.GheadingText}>Login</Text>
            <TextInput onChangeText={(value)=>setEmail(value)} style={globalStyles.GtextInput} placeholder='Enter email' keyboardType='email-address'  />
            <TextInput onChangeText={(value)=>setPassword(value)} style={globalStyles.GtextInput} placeholder='Enter password' keyboardType='default' secureTextEntry />
            <View style={{...globalStyles.GprimaryButtonView, ...styles.primaryButtonView}}>
                <Button onPress={submit} style={globalStyles.GprimaryButton} title='Sign in' />
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
                <Text>Already signed up? Register</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    primaryButtonView:  {
        marginTop: 20,
        marginBottom: 10,
    }
})
