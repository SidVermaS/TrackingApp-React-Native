import React,{useState,useEffect,createRef} from 'react'
import { StyleSheet, Text, View, Image, } from 'react-native'
import MapView,{PROVIDER_GOOGLE,Marker,Callout} from 'react-native-maps'
import * as Location from 'expo-location'
import * as TaskManager from 'expo-task-manager'

import globalStyles, {width} from '../../utilities/globalStyles'
import {db,auth} from '../../firebase'


const LOCATION_TRACKING='LOCATION_TRACKING'
let latitude, longitude,prevLatitude, prevLongitude
TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
    if (error) {
      console.log('LOCATION_TRACKING task ERROR:', error);
      return
    }
    if (data) {
      const { locations } = data;
      latitude= locations[0].coords.latitude;
      longitude = locations[0].coords.longitude;

      console.log(
        `${new Date(Date.now()).toLocaleString()}: ${latitude},${longitude}`
      )
    
        if(latitude!==prevLatitude || longitude!==prevLongitude)    {
            db.collection('users').doc(auth?.currentUser?.uid).update({latitude,longitude}).then((result)=> {
            })
                // currentLocation={...currentLocation,latitude,longitude}
            
            prevLatitude=latitude
            prevLongitude=longitude
        }
    }
  });

const Home = ({navigation}) => {

    const mapRef=createRef()
    const [locationForegroundPermission,setLocationForegroundPermission]=useState(false)
    const [locationBackgroundPermission,setLocationBackgroundPermission]=useState(false)
    const [users,setUsers]=useState([])

    const [currentLocation,setCurrentLocation]=useState({latitude: 0, longitude: 0, latitudeDelta: 0.005, longitudeDelta: 0.005})
    useEffect(()=>  {
       
        (async ()=> {
            let locationStatus=await Location.requestForegroundPermissionsAsync()
            setLocationForegroundPermission(locationStatus.status==='granted')

            locationStatus=await Location.requestBackgroundPermissionsAsync()
            setLocationBackgroundPermission(locationStatus.status==='granted')

            if(locationBackgroundPermission && locationForegroundPermission)    {
                fetchCurrentLocation()
            }
        })()
        trackAllUsers()

        return async ()=>{
            await Location.stopLocationUpdatesAsync(LOCATION_TRACKING)
        }
    },[])
    useEffect(()=>  {
        mapRef.current?.animateToRegion(currentLocation)
    },[mapRef])
    const fetchCurrentLocation=async ()=>{
        TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING)

        await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 2000,
            distanceInterval: 50,
        })
        await Location.hasStartedLocationUpdatesAsync(
            LOCATION_TRACKING
        )
    }

    const trackAllUsers=async ()=>  {
        let currentUserLocation
        db.collection('users').get().then((snapshot)=>    {
            setUsers(snapshot.docs.map(doc=>{
                if(doc.id===auth.currentUser.uid)   {
                    currentUserLocation={latitude: doc.data().latitude, longitude: doc.data().longitude}
                }
                return {...doc.data(), id: doc.id,}
            }))
           setCurrentLocation({...currentLocation, latitude: currentUserLocation.latitude, longitude: currentUserLocation.longitude})
        })
    }
    if(locationBackgroundPermission && locationForegroundPermission)    {
        return (
            <View style={styles.container}>
                <MapView ref={mapRef}  provider={PROVIDER_GOOGLE} style={styles.container}>
                    {users.map((user)=><Marker key={user.id} coordinate={{latitude: user?.latitude, longitude: user?.longitude}}>
                      
                        <Image source={{uri: user.photoURL}} resizeMode='cover' style={user.id===auth.currentUser.uid?styles.selfProfilePhotoMarker:styles.profilePhotoMarker} />
                        <Callout onPress={()=>navigation.navigate('Profile', {user})} style={styles.callout}>
                                <Text style={styles.nameMarker}>
                                    {auth.currentUser.uid===user.id?'Me':user.name.split(' ')[0]}
                                </Text>
                        </Callout>
                    </Marker>)}
                </MapView>
            </View>
        )
    }
    return (<View style={globalStyles.Gcontainer}>
        <Text>Location permission required</Text>
    </View>)
}

export default Home

const profilePhotoMarker={
    width: 35,
    height: 35,
    borderRadius: 35/2,
}
const styles = StyleSheet.create({
    container:  {
        ...StyleSheet.absoluteFillObject
    },
    profilePhotoMarker:   {
        ...profilePhotoMarker,
        borderWidth: 1,
    },
    selfProfilePhotoMarker:   {        
        borderColor: 'blue',
        borderWidth: 3,
        ...profilePhotoMarker,  
    },
    nameMarker:   {
        fontSize: 15,
    },
    callout:    {
        position: 'relative'
    },
})
