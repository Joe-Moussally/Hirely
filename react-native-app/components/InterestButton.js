import { StyleSheet } from "react-native";
import { Text, TouchableOpacity } from "react-native";

const InterestButton = ({interested, offerId}) => {
    return (
        <TouchableOpacity
        style={styles.interested}
        onPress={() => console.log('PRESSED')}>
            <Text style={styles.interestText}>Send Profile</Text> 
        </TouchableOpacity>
    );
}
 
export default InterestButton;

const styles = StyleSheet.create({
    interested: {
        backgroundColor:'white',
        width:'80%',
        marginHorizontal:'10%',
        height:50,
        borderRadius:10,
        borderWidth:4,
        borderColor:'#00a6ff',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    interestText: {
        color:'#00a6ff',
        fontWeight:"bold",
        fontSize:25,
    },
    notInterested: {
        backgroundColor:'white',
        width:'80%',
        height:50,
        borderRadius:10,
        borderWidth:4,
        borderColor:'#00a6ff',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    notInterestText: {
        color:'#00a6ff',
        fontWeight:"bold",
        fontSize:25,
    },
})