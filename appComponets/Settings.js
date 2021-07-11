import React from 'react'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
export default class Settings extends React.Component{
 render(){
     return(
         <View style={styles.settings}>
             <Text style={styles.text}>Settings</Text>
         </View>
     )
 }
}
const styles=StyleSheet.create({
settings:{
    flex:1,
    alignItems:"center"
},
text:{
    fontWeight:"bold",
    fontSize:24
}
})