import { Image, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { localhost } from "../globalVariables";
import axios from "axios";

const ChatHeader = ({contactId}) => {

    const [contact,setContact] = useState('')

    useEffect(()=>{
        //get the user's information
        axios({
            method:'GET',
            url:'http://'+localhost+':8000/api/users/'+contactId,
        }).then((res) => {
            setContact(res.data.contact)
        })
    },[])

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity>
                <Ionicons
                name="arrow-back"
                size={26}
                color="black"
                style={styles.backArrow}/>
                
            </TouchableOpacity>

            {
                contact.picture?
                <Image
                source={{uri:contact.picture}}
                style={styles.picture}/>:
                <Image
                source={require('../assets/profile/default_picture.jpg')}/>
            }


            <Text>{contact.name}</Text>

        </View>
    );
}
 
export default ChatHeader;

const styles = StyleSheet.create({
    headerContainer:{
        height:55,
        width:'100%',
        backgroundColor:'red',
        flexDirection:'row',
        alignItems:'center'
    },
    backArrow:{
        margin:10,
    },
    picture:{
        width:20,
        height:20
    }
})