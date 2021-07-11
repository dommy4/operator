import React from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';
import axios from 'axios';

export default class Updater extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fare: 0,
            from: '',
            to: '',
            busRegNo: this.props.bus
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSelectFrom = this.handleSelectFrom.bind(this);
        this.handleSelectTo = this.handleSelectTo.bind(this);
    }
    changeHandler(name) {
        return (text) => this.setState({ [name]: text })
    }
    handleSelectFrom(selectedValue) {
        this.setState({ from: selectedValue })
    }
    handleSelectTo(selectedValue) {
        this.setState({ to: selectedValue })
    }

    saveChanges() {
        const { fare, to, from } = this.state;
        if (fare !== 0 && to !== '' && from !== '') {
            axios.post(`http://192.168.137.5:5000/fareupdate`, this.state)
                .then((res) => {
                    Alert.alert('RESPONSE', res.data);
                })
                .catch((err) => {
                    Alert.alert('ERROR', err.message);
                })
        } else {
            Alert.alert('OMISSION', 'From,to and fare required!');
        }

    }

    render() {
        return (
            <View style={styles.parent}>
                <View style={styles.picker}>
                    <Text style={styles.text}>FROM:</Text>
                    <Picker
                        selectedValue={this.state.from}
                        onValueChange={this.handleSelectFrom}
                        mode="dropdown">
                        <Picker.Item label="TOWN" value="TOWN" />
                        <Picker.Item label="ESTATE" value="ESTATE" />
                    </Picker>
                </View>
                <View style={styles.picker}>
                    <Text style={styles.text}>To:</Text>
                    <Picker
                        selectedValue={this.state.to}
                        onValueChange={this.handleSelectTo}
                        mode="dropdown">
                        <Picker.Item label="TOWN" value="TOWN" />
                        <Picker.Item label="ESTATE" value="ESTATE" />
                    </Picker>
                </View>
                <TextInput onChangeText={this.changeHandler('fare')} style={styles.input} keyboardType="numeric" placeholder="Fare amount" />
                <TouchableOpacity style={styles.save} onPress={this.props.showTrips}>
                    <Text style={styles.saveText}>save</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    parent: {
        flex: 1,
        paddingTop: 20,
        alignItems: "center",
        width: "100%"
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
    picker: {
        width: "90%",
        borderColor: "#698ebd",
        borderStyle: "solid",
        marginTop: 10,
        borderWidth: 2,
        borderRadius: 5,
    },
    save: {
        width: "90%",
        padding: 10,
        alignItems: "center",
        backgroundColor: "#0866e0",
        marginTop: 20,
        borderRadius: 5
    },
    saveText: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold"
    },
    text: {
        fontSize: 20,
        padding: 10,
        fontWeight: "bold"
    }

})