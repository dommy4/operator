import React from 'react'
import { View, StyleSheet,Text,TextInput,TouchableOpacity} from 'react-native'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.login}>
                <Text>OPERATOR APP</Text>
                 
                <View>
                <TextInput style={styles.fields} keyboardType="ascii-capable" placeholder="fields"/>
                <TextInput style={styles.fields} secureTextEntry={true} placeholder="fields"/>

                <TouchableOpacity style={styles.TouchableOpacity}><Text>LOGIN</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    login: {
        flex: 1,
        padding:20,
        width:"100%",
        alignItems:"center",
        backgroundColor:"#4969"
    },
    fields:{
        padding:10,
        textAlign:"center",
        fontSize:23,
        borderRadius:5,
        borderWidth:2,
        width:"70%"
    },
    TouchableOpacity:{
        alignItems:"center",
        backgroundColor:"#698ebd",
        width:"70%",
        padding:10
    }
})