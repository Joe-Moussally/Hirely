import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { localhost } from "../globalVariables";
import axios from "axios";

const InterestedApplicantsList = ({offerId}) => {

    //array of  interested users
    const [users,setUser] = useState([])

    useEffect(()=>{
        axios({
            method:'GET',
            url:'http://'+localhost+':8000/api/interests/'+offerId //offer id
        }).then((Response) => {
            console.log('INTERESTED LISTTTTTTT',Response.data.users)
        }).catch((err) => {
            console.log('INTERESTED LISTTTTTTT ERROR')
        })
    },[])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Interested Applicants</Text>
        </View>
        
    );
}
 
export default InterestedApplicantsList;

const styles  = StyleSheet.create({
    
    container:{
        borderWidth:1,
        borderColor:'black',
        alignSelf:'center',
        width:'114%',
        marginTop:20
    },
    title:{
        fontSize:22,
        textAlign:'center',
    }
})