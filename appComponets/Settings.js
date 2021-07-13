import { Picker } from '@react-native-community/picker'
import React from 'react'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
export default class Settings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            buses: this.props.buses,//ARRAY
            selectedValue: ''
        }
        this.handleSelectBus = this.handleSelectBus.bind(this);
    }
    //REQUEST METHOD COMES HERE
    handleSelectBus(selectedValue) {
        this.setState({ selectedValue: selectedValue })
    }
    render() {
        return (
            <View style={styles.settings}>
                <Text style={styles.text}>Settings</Text>
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
    }

})