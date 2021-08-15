import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import { Header } from 'react-native/Libraries/NewAppScreen'
export default class Transactions extends React.Component {
    render() {
        return (
            <>
                <Text style={styles.headText}>Transactions</Text>
                <ScrollView>
                    <TitleLabel />
                    {this.props.data.map((t, i) => (
                        (t.mpesaReceiptNo ?
                            <Wrapper key={i} id={t.mpesaReceiptNo} name={t.phone} amount={t.amount} ttime={t.transactionDate} />
                            :
                            null
                        )
                    ))}
                </ScrollView>
            </>
        )

    }
}

const Wrapper = (props) => {
    const { id, name, amount, ttime } = props;
    return (
        <View style={styles.transactions}>
            <TouchableOpacity style={styles.bar}>
                <View style={styles.textHolders}>
                    <Text style={styles.text}>{id}</Text>
                </View>
                <View style={styles.textHolders}>
                    <Text style={styles.text}>{name}</Text>
                </View>
                <View style={styles.textHolders2}>
                    <Text style={styles.text}>{amount}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

}
const TitleLabel = () => {
    return (
        <View style={styles.transactions}>
            <View style={styles.titleBar}>
                <View style={styles.textHolders}>
                    <Text style={styles.text1}>Receipt</Text>
                </View>
                <View style={styles.textHolders}>
                    <Text style={styles.text1}>Phone</Text>
                </View>
                <View style={styles.textHolders2}>
                    <Text style={styles.text1}>Amount</Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    Sview: {
        flex: 1,
        height: "100%"
    },
    transactions: {
        flex: 1,
        alignItems: "center",
        width: "100%"
    },
    headText: {
        fontWeight: "bold",
        fontSize: 24,
        marginBottom: 20
    },
    titleBar: {
        width: "95%",
        backgroundColor: '#e4f5ff',
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderColor: '#698ebd',
        marginTop: 1,
        marginBottom: 5,
        elevation: 5,
        padding: 10
    },
    bar: {
        width: "95%",
        borderRadius: 5,
        backgroundColor: '#e9f2ff',
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderColor: '#698ebd',
        marginTop: 1,
        marginBottom: 0,
        padding: 5
    },
    textHolders: {
        width: "33%",
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
        fontWeight: "bold",
        padding: 2,
        alignContent: "stretch"
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