import axios from 'axios'
import React from 'react'
import {
    View, StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground
} from 'react-native'
import CheckBox from 'react-native-check-box'
import getHost from './Host'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: "",
            ukey: "",
            isChecked: false,
            errMessage: ""
        }
        this.showPassword = this.showPassword.bind(this);
        this.changHandler = this.changHandler.bind(this);
        this.verifyUser = this.verifyUser.bind(this);
    }
    changHandler(name) {
        return (text) => this.setState({ [name]: text });
    }
    verifyUser() {
        axios.post(`${getHost()}/verifyuser`, { user: this.state.user, ukey: this.state.ukey })
            .then((res) => {
                alert(res.data);
                //should update the redux store //to work on it yet
                this.props.setAllowed();
            })
            .catch((err) => {
                alert(err.message);
            })
    }
    showPassword() {
        (this.state.isChecked ?
            this.setState({ isChecked: false })
            :
            this.setState({ isChecked: true })
        )
    }
    render() {
        const { isChecked, user, ukey, errMessage } = this.state
        return (
            <ImageBackground source={require('../assets/mamba.png')} style={styles.main}>
                <View style={styles.container} >
                    <Text style={styles.topText}>MattApp</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput style={styles.input} onChangeText={this.changHandler('user')} placeholder='phone' keyboardType="numeric" />
                        <TextInput style={styles.input} onChangeText={this.changHandler('ukey')} secureTextEntry={!isChecked} placeholder='password' />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={{ color: "red" }}>{errMessage}</Text>
                    </View>

                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity style={{ width: "40%" }}>
                            <CheckBox
                                onClick={this.showPassword}
                                isChecked={this.state.isChecked}
                                leftText="show password"
                                style={{ width: "100%", justifyContent: "flex-start" }} />
                        </TouchableOpacity>
                        <TouchableOpacity><Text>Forgot?</Text></TouchableOpacity>
                    </View>

                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity style={styles.button} onPress={this.verifyUser}><Text style={styles.buttonText}>LOGIN</Text></TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }

}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        paddingTop: 100
    },
    container: {
        marginTop: 50,
        flexDirection: "column",
        alignItems: "center",
        width: "90%",
        borderRadius: 5,
        padding: 10,
        backgroundColor: "white",
        elevation: 5
    },
    input: {
        width: "90%",
        fontSize: 24,
        borderWidth: 2,
        borderColor: "#698ebd",
        borderStyle: "solid",
        borderRadius: 5,
        marginTop: 10,
        padding: 10
    },
    buttonWrapper: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 0,
        marginBottom: 30

    },
    inputWrapper: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 30

    },
    button: {
        backgroundColor: "#0455bf",
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
        width: "90%"
    },
    buttonText: {
        color: "white"
    },
    text: {
        fontSize: 20
    },
    topText: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#0455bf"
    }
});