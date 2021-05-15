import React from 'react'
import { Image, StyleSheet, Text, View,Button } from 'react-native'
import globalStyles from '../../utilities/globalStyles'
import {auth} from '../../firebase'

const Profile = ({navigation, route}) => {  
    let user=route.params?.user
    return (
        <View style={globalStyles.Gcontainer}>
            <Image style={globalStyles.GprofilePhoto} source={{uri: user.photoURL}}  />
            <Text style={styles.name}>
                {user.name}
            </Text>
            {user.id===auth.currentUser.uid && <View style={globalStyles.GprimaryButtonView}>
                <Button title='Log out' onPress={()=>auth.signOut()} />
            </View>}
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    name:   {
        fontSize: 18,
        fontWeight: '800',
        marginTop: 10,
        marginBottom: 40,
    }
})
