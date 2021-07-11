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
            active: this.props.active,
            showBanner: false
        }
        this.endTrip = this.endTrip.bind(this);
        this.toggleBanner = this.toggleBanner.bind(this);
    }
    endTrip() {
        this.setState({ active: false })
    }
    toggleBanner() {
        (this.state.showBanner ?
            this.setState({ showBanner: false })
            :
            this.setState({ showBanner: true })
        )
    }
    render() {
        const { id, from, to, fare } = this.state;
        return (
            <>
                <TouchableOpacity style={styles.bar} onPress={this.toggleBanner}>
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
                        backgroundColor: (this.state.active ? "#ff4c56" : "#e2fff0"),
                        alignItems: "center",
                        padding: 2,
                        flexDirection: "column",
                        justifyContent: "center",
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5
                    }}
                        onPress={this.endTrip}>
                        <Text style={{
                            color: (this.state.active ? "white" : "#7dcb8d"),
                            fontWeight: "bold"
                        }}>{(this.state.active ? "END" : "ENDED")}</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
                {(this.state.showBanner ?
                    <View style={styles.dropContainer}>
                        <View style={styles.textWrapper}>
                            <Text style={styles.textBold}>CASH</Text>
                            <Text style={styles.text}>20.00</Text>
                        </View>
                        <View style={styles.textWrapper}>
                            <Text style={styles.textBold}>MPESA</Text>
                            <Text style={styles.text}>13.00</Text>
                        </View>
                    </View>
                    :
                    null
                )}
            </>
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
    text1: {
        fontWeight: "bold"
    },
    dropContainer: {
        width: "95%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "#e4f5ff",
        padding: 3
    },
    textWrapper: {
        alignItems: "center"
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 18
    },
    text: {
        fontSize: 16,
        
    }
})