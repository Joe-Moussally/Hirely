import axios from "axios";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { localhost } from '../../globalVariables'

const ContactCard = ({id}) => {

    const [contact,setContact] = useState('')

    useEffect(()=>{
        
        //get contact's info from id
        axios({
            method:'GET',
            url:'http://'+localhost+':8000/api/users/'+id,
        }).then(res => {
            setContact(res.data.contact)
            console.log(res.data.contact[0].name)
        })
        
    },[])

    return (
        <View style={styles.cardContainer}>
            <Text style={styles.contactName}>{contact.name}</Text>
        </View>
    );
}
 
export default ContactCard;

const styles = StyleSheet.create({
    picture:{
        width:65,
        height:65
    },
    cardContainer:{
        width:'100%',
        height:60
    },
    contactName:{
        fontSize:24
    }
})