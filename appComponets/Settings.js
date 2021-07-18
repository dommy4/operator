import { Picker } from '@react-native-community/picker'
import axios from 'axios'
import React from 'react'
import { Text, TextInput, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import getHost from './Host'
export default class Settings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accountID: '',
            buses: [],
            selectedValue: ''
        }
        this.handleSelectBus = this.handleSelectBus.bind(this);
        this.getBuses = this.getBuses.bind(this);
        this.changeHandler = this.changeHandler.bind(this);

    }

    changeHandler(name) {
        return (text) => this.setState({ [name]: text })
    }

    getBuses() {
        axios.get(`${getHost()}/buses/${this.state.accountID}`)
            .then((res) => {
                this.setState({ buses: res.data })
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    //REQUEST METHOD COMES HERE
    handleSelectBus(selectedValue) {
        this.setState({ selectedValue: selectedValue })
    }
    render() {
        return (
            <View style={styles.settings}>
                <Text style={styles.text}>Settings</Text>
                <TextInput style={styles.input} onChangeText={this.changeHandler('accountID')} keyboardType="numeric" placeholder="Account Registered" />
                <TouchableOpacity style={styles.save1} onPress={this.getBuses}>
                    <Text style={styles.saveText1}>Get buses</Text>
                </TouchableOpacity>

                <View style={styles.picker}>
                    <Picker
                        selectedValue={this.state.selectedValue}
                        onValueChange={this.handleSelectBus}
                        mode="dropdown">
                        {this.state.buses.map((bus, index) => (<Picker.Item key={index} label={bus.regNo} value={bus.regNo} />))}
                    </Picker>
                </View>
                <View style={styles.selectedValue}>
                    <Text style={styles.selectedText}>Selected Bus</Text>
                    <Text style={styles.selectedText}>{this.state.selectedValue}</Text>
                </View>
                <TouchableOpacity style={styles.save}>
                    <Text style={styles.saveText}>save</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    settings: {
        flex: 1,
        alignItems: "center",
        width: "100%"
    },
    text: {
        fontWeight: "bold",
        fontSize: 24
    },
    picker: {
        width: "90%",
        borderColor: "#698ebd",
        borderStyle: "solid",
        marginTop: 10,
        borderWidth: 2,
        borderRadius: 5
    },
    selectedValue: {
        width: "90%",
        borderColor: "#698ebd",
        borderStyle: "solid",
        marginTop: 10,
        borderWidth: 2,
        borderRadius: 5,
        alignItems: "center",
        padding: 15
    },
    selectedText: {
        fontSize: 20,
    },
    input: {
        width: "90%",
        fontSize: 20,
        borderWidth: 2,
        borderColor: "#698ebd",
        borderStyle: "solid",
        borderRadius: 5,
        marginTop: 10,
        padding: 10
    },
    save: {
        width: "90%",
        padding: 10,
        alignItems: "center",
        backgroundColor: "#0866e0",
        marginTop: 20,
        borderRadius: 5
    },
    save1: {
        width: "90%",
        padding: 10,
        alignItems: "center",
        backgroundColor: "white",
        borderWidth:2,
        borderColor:"#0866e0",
        marginTop: 20,
        borderRadius: 5
    },
    saveText: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold"
    },
    saveText1: {
        fontSize: 20,
        color: "#0866e0",
        fontWeight: "bold"
    }
})