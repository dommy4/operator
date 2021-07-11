import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default class Tripholder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            from: this.props.from,
            to: this.props.to,
            fare: this.props.fare,
            active: this.props.active
        }
        this.endTrip = this.endTrip.bind(this);
    }
    endTrip() {
        this.setState({ active: false })
    }
    render() {
        const { id, from, to, fare } = this.state;
        return (
            <View style={styles.bar}>
                <View style={styles.textHolders}>
                    <Text style={styles.text1}>TRIP</Text>
                    <Text style={styles.text}>{id}</Text>
                </View>
                <View style={styles.textHolders}>
                    <Text style={styles.text1}>FROM</Text>
                    <Text style={styles.text}>{from}</Text>
                </View>
                <View style={styles.textHolders}>
                    <Text style={styles.text1}>TO </Text>
                    <Text style={styles.text}>{to}</Text>
                </View>
                <View style={styles.textHolders}>
                    <Text style={styles.text1}>FARE </Text>
                    <Text style={styles.text}>{fare}</Text>
                </View>
                <TouchableOpacity style={{
                    width: "20%",
                    backgroundColor: (this.state.active ? "#ff4c56" : "#e4f5ff"),
                    alignItems: "center",
                    padding: 2,
                    flexDirection: "column",
                    justifyContent: "center",
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5
                }}
                    onPress={this.endTrip}>
                    <Text style={styles.text1}>{(this.state.active ? "END" : "ENDED")}</Text>
                </TouchableOpacity>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    bar: {
        width: "95%",
        borderRadius: 5,
        backgroundColor: '#e4f5ff',
        flexDirection: "row",
        borderColor: '#698ebd',
        marginTop: 10,
        height: 60,
        elevation: 5
    },
    textHolders: {
        width: "20%",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        padding: 3
    },
    // endButton: {
    //     width: "20%",
    //     backgroundColor:"#ff4c56",
    //     alignItems: "center",
    //     padding: 2,
    //     flexDirection:"column",
    //     justifyContent:"center",
    //     borderTopRightRadius:5,
    //     borderBottomRightRadius:5
    // },
    text1: {
        fontWeight: "bold"
    }
})