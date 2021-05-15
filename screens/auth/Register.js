import React, {useEffect,useState} from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native'
import {auth,db,} from '../../firebase'
import firebase from 'firebase'
require("firebase/firestore")
require("firebase/firebase-storage")

import globalStyles from '../../utilities/globalStyles'
import * as ImagePicker from 'expo-image-picker'
import uuid from 'react-native-uuid'

const Register = ({navigation}) => {
    const [image,setImage]=useState(null)
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const [hasGalleryPermission, setHasGalleryPermission]=useState(false)
    useEffect(()=>  {
        (async ()=> {
            const galleryStatus=await ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasGalleryPermission(galleryStatus.status==='granted')
        })()
    },[])

    const saveUser=async (photoURL)=>   {
        auth.currentUser.updateProfile({photoURL}).then(()=>{
            db.collection('users').doc(auth.currentUser.uid).set({name, email,photoURL, })
            navigation.navigate('Home')
        })
    }
    const uploadImage = async () => {
        const childPath =`users/${auth.currentUser.uid}/${uuid.v4()}`
        console.log(childPath)

        const response = await fetch(image);
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                saveUser(snapshot);
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const submit=async ()=> {
        auth.createUserWithEmailAndPassword(email,password).then((authUser)=>{
           
            authUser.user.updateProfile({
                displayName: name,
                email,
                password,
            }).then(()=>{          
                uploadImage()
            })
        }).catch((error)=>alert(error))
    }

    const pickImage=async ()=>  {
        let result=await ImagePicker.launchImageLibraryAsync({
            allowsMultipleSelection: false,
            allowsEditing: false,
        })
        if(!result.cancelled)   {
            setImage(result.uri)
        }
    }
    if(hasGalleryPermission)    {
        return (
            <View style={globalStyles.Gcontainer}>
                <Text style={{...globalStyles.GheadingText, ...styles.headingText}}>Register</Text>
                <TouchableOpacity onPress={pickImage}>
                    <Image style={globalStyles.GprofilePhoto} source={image?{uri: image}:require('../../assets/images/avatar.png')}  />
                </TouchableOpacity>
                <TextInput value={name} onChangeText={(value)=>setName(value)} placeholder='Enter name' keyboardType='default' style={globalStyles.GtextInput}  />
                <TextInput value={email} onChangeText={(value)=>setEmail(value)} placeholder='Enter email' keyboardType='email-address' style={globalStyles.GtextInput}  />
                <TextInput value={password} onChangeText={(value)=>setPassword(value)} placeholder='Enter password' keyboardType='default' secureTextEntry style={globalStyles.GtextInput}  />
                <View style={{...globalStyles.GprimaryButtonView, ...styles.primaryButtonView}}>
                    <Button onPress={submit} style={globalStyles.GprimaryButton} title='Sign up' />
                </View>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Text>Back to login</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (<View style={globalStyles.Gcontainer}><Text>Gallery Permission required</Text></View>)
}

export default Register

const styles = StyleSheet.create({
    primaryButtonView:  {
        marginTop: 20,
        marginBottom: 10,
    },
    headingText:    {
        marginBottom: 30
    }
})
