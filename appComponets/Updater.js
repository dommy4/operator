import React, { createRef } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';
import axios from 'axios';
import getHost from './Host';

export default class Updater extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accountID:this.props.accountID,
            fare: 0,
            from: '',
            to: '',
            busRegNo: this.props.bus,
            routes: []//FROM SERVER
        }
        this.textInputRef=React.createRef()
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSelectFrom = this.handleSelectFrom.bind(this);
        this.handleSelectTo = this.handleSelectTo.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }
    componentDidMount() {
        axios.get(`${getHost()}/${this.state.accountID}/plyroutes`)
            .then((res) => {
                this.setState({ routes: res.data })
            })
            .catch((err) => {
                alert(err.message)
            })
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
        const { fare, to, from, busRegNo } = this.state;
        if (fare !== 0 && to !== '' && from !== '') {
            axios.post(`${getHost()}/newtrip`,
                {
                    fare: fare,
                    from: from,
                    to: to,
                    busRegNo: busRegNo
                }
            )
                .then((res) => {
                    this.textInputRef.current.clear();
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
                        {this.state.routes.map((r, i) => (<Picker.Item key={i} label={r} value={r} />))}
                    </Picker>
                </View>
                <View style={styles.picker}>
                    <Text style={styles.text}>To:</Text>
                    <Picker
                        selectedValue={this.state.to}
                        onValueChange={this.handleSelectTo}
                        mode="dropdown">
                        {this.state.routes.map((r, i) => (<Picker.Item key={i} label={r} value={r} />))}
                    </Picker>
                </View>
                <TextInput onChangeText={this.changeHandler('fare')} ref={ this.textInputRef} style={styles.input} keyboardType="numeric" placeholder="Fare amount" />
                <TouchableOpacity style={styles.save} onPress={this.saveChanges}>
                    <Text style={styles.saveText}>save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.back} onPress={this.props.showTrips}>
                    <Text style={styles.backText}>back</Text>
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
    },
    back: {
        width: "90%",
        padding: 10,
        alignItems: "center",
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "#0866e0",
        marginTop: 20,
        borderRadius: 5
    },
    backText: {
        fontSize: 20,
        color: "#0866e0",
        fontWeight: "bold"
    }



})