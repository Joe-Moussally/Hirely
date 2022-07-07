import { StyleSheet } from "react-native";
import { Text, TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons';

const InterestButton = ({interested, offerId}) => {
    return (
        true?
        
        <TouchableOpacity
        style={styles.interested}
        onPress={() => console.log('Interest BUTTON', interested, offerId)}>
            <Text style={styles.interestText}>
                <Entypo name="check" size={24} color="#22e000" />
                Profile Sent
            </Text> 
        </TouchableOpacity>

        :

        <TouchableOpacity
        style={styles.interested}
        onPress={() => console.log('Interest BUTTON', interested, offerId)}>
            <Text style={styles.interestText}>Send Your Profile</Text> 
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
        borderColor:'#22e000',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    interestText: {
        color:'#22e000',
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