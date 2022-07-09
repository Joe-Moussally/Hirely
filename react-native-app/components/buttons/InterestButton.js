import { StyleSheet } from "react-native";
import { Text, TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { localhost } from "../../globalVariables";
import { useEffect, useState } from "react";

const InterestButton = ({interested, offerId}) => {

    const [isInterested,setIsIntersted] = useState(interested)

    //function to submit user's profile
    const handleSubmit = () => {
        //get user's token and send it with the request
        AsyncStorage.getItem('token').then((token) => {
            axios({
                headers:{'Authorization':'Bearer '+token},
                method:'POST',
                url:'http://'+localhost+':8000/api/interests/'+offerId,
            }).then(()=>{
                setIsIntersted(true)
            }).catch((err)=>{
                console.log("ERROR INTEREST BUTTON",err)
            })
        })
    }

    return (
        interested?
        
        <TouchableOpacity
        style={styles.interested}>
            <Text style={styles.interestText}>
                <Entypo name="check" size={24} color="#22e000" />
                Profile Sent
            </Text> 
        </TouchableOpacity>

        :

        <TouchableOpacity
        style={styles.notInterested}
        onPress={handleSubmit}>
            <Text style={styles.notInterestText}>Send Your Profile</Text> 
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
        marginHorizontal:'10%',
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