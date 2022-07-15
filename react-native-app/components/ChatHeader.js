import { Image, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { localhost } from "../globalVariables";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ChatHeader = ({contactId}) => {

    //defining react navigation
    const navigation = useNavigation()

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
            <TouchableOpacity
            onPress={()=> navigation.navigate('ChatsStack')}>
                <Ionicons
                name="arrow-back"
                size={26}
                color="white"
                style={styles.backArrow}/>
                
            </TouchableOpacity>

            {
                contact.picture?
                <Image
                source={{uri:contact.picture}}
                style={styles.picture}/>:
                <Image
                style={styles.picture}
                source={require('../assets/profile/default_picture.jpg')}/>
            }


            <Text style={styles.name}>{contact.name}</Text>

        </View>
    );
}
 
export default ChatHeader;

const styles = StyleSheet.create({
    headerContainer:{
        height:65,
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:'gray',
        borderBottomWidth:.4,
        backgroundColor:'#1c99ff'
    },
    backArrow:{
        margin:10,
    },
    picture:{
        width:50,
        height:50,
        borderRadius:25,
        borderWidth:2,
        borderColor:'white'
    },
    name:{
         fontSize:21,
         fontWeight:'600',
         marginHorizontal:20,
         color:'white'
    }
})