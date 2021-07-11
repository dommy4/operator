import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements'

export default class Account extends React.Component {
    render() {
        return (
            <View style={styles.account}>
                <View style={styles.profileImage}>
                    <Icon name='user' type="font-awesome" color="#2d6dc0" size={100} />
                </View>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.textBold}>Name:</Text>
                        <Text style={styles.text}>WASHINGTON OMONDI</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.textBold}>Bus:</Text>
                        <Text style={styles.text}>KCM648R</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.textBold}>National ID:</Text>
                        <Text style={styles.text}>36837700</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.textBold}>Role:</Text>
                        <Text style={styles.text}>conductor</Text>
                    </View>
                    <TouchableOpacity style={styles.logout}>
                        <Text>Logout</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    account: {
        flex: 1,
        width: "100%",
        paddingTop: 100,
        alignItems: "center"
    },
    profileImage: {
        width: "40%",
        borderRadius: 100,
        alignItems: "center",
        padding: 20,
        backgroundColor: "#94a6be",
        marginBottom: 20
    },
    container: {
        width: "90%",
        borderRadius: 5,
        elevation: 5,
        alignItems:"center",
        padding:5

    },
    row: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    textBold: {
        fontWeight: "bold",
        width: "30%",
        padding: 10
    },
    text: {
        width: "65%",
        padding: 10
    },
    logout:{
        backgroundColor:"#ff4c56",
        width:"90%",
        padding:10,
        alignItems:"center",
        borderRadius:5
    }
})