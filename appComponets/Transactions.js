import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
export default class Transactions extends React.Component {
    render() {
        return (
            <>
                <Text style={styles.headText}>Transactions</Text>
                <ScrollView>
                    {this.props.data.map((t, i) => (<Wrapper key={i} id={t.id} name={t.name} seat={t.seat} amount={t.amount} ttime={t.ttime} />))}
                </ScrollView>
            </>
        )

    }
}

const Wrapper = (props) => {
    const { id, name, seat, amount, ttime } = props;
    return (
        <View style={styles.transactions}>
            <TouchableOpacity style={styles.bar}>
                <View style={styles.textHolders}>
                    <Text style={styles.text1}>Transaction</Text>
                    <Text style={styles.text}>{id}</Text>
                </View>
                <View style={styles.textHolders}>
                    <Text style={styles.text1}>Name</Text>
                    <Text style={styles.text}>{name}</Text>
                </View>
                <View style={styles.textHolders2}>
                    <Text style={styles.text1}>Seat</Text>
                    <Text style={styles.text}>{amount}</Text>
                </View>
                <View style={styles.textHolders2}>
                    <Text style={styles.text1}>Amount</Text>
                    <Text style={styles.text}>{amount}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

}
const styles = StyleSheet.create({
    transactions: {
        flex: 1,
        alignItems: "center",
        width: "100%"
    },
    headText: {
        fontWeight: "bold",
        fontSize: 24,
        marginBottom:20
    },
    bar: {
        width: "98%",
        borderRadius: 5,
        backgroundColor: '#e4f5ff',
        flexDirection: "row",
        borderColor: '#698ebd',
        marginTop: 10,
        height: 60,
        elevation: 5
    },
    textHolders: {
        width: "30%",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        padding: 3
    },
    textHolders2: {
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