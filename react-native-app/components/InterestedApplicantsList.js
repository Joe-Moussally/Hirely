import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { localhost } from "../globalVariables";
import axios from "axios";
import UserCard from "./UserCard";

const InterestedApplicantsList = ({offerId}) => {

    //array of  interested users
    const [users,setUsers] = useState([])

    useEffect(()=>{
        axios({
            method:'GET',
            url:'http://'+localhost+':8000/api/interests/'+offerId //offer id
        }).then((Response) => {
            console.log('INTERESTED LISTTTTTTT',Response.data.users)
            setUsers(Response.data.users)
        }).catch((err) => {
            console.log('INTERESTED LISTTTTTTT ERROR')
        })
    },[])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Interested Applicants</Text>
            <View style={styles.usersContainer}>
                {
                    users?
                    users.map((user) => (
                        <UserCard user={user}/>
                    )):
                    <></>
                }
            </View>

        </View>
        
    );
}
 
export default InterestedApplicantsList;

const styles  = StyleSheet.create({

    container:{
        alignSelf:'center',
        width:'100%',
        marginTop:35
    },
    title:{
        alignSelf:'center',
        borderWidth:1,
        borderBottomColor:'black',
        width:'110%',
        fontSize:22,
        textAlign:'center',
    },
    usersContainer:{
    }
})