import React from 'react'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
export default class Transactions extends React.Component{
 render(){
     return(
         <View style={styles.transactions}>
             <Text style={styles.text}>Transactions</Text>
         </View>
     )
 }
}
const styles=StyleSheet.create({
transactions:{
    flex:1,
    alignItems:"center"
},
text:{
    fontWeight:"bold",
    fontSize:24
}
})