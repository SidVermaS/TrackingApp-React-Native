import {StyleSheet, Dimensions} from 'react-native'

const width=Dimensions.get('window').width
const height=Dimensions.get('window').height
const globalStyles=StyleSheet.create({
    Gcontainer:  {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    GtextInput:  {
        width: width*0.9,
        borderColor: 'black',
        // borderWidth: 1,
        borderBottomWidth: 1,
        padding: 10,
        marginBottom: 10,
    },
    GprimaryButtonView:  {
        width: width*0.5,
    },
    GprimaryButton: {
       
    },
    GheadingText:    {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 20
    },
    GprofilePhoto:   {
        width: 150, 
        height: 150,
        borderRadius: 150/2,
        overflow: 'hidden'
    }
})


export default globalStyles
export  {
    width, height,
}