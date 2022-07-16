import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { localhost } from '../../globalVariables'

const ContactCard = ({id,messages}) => {

    const navigation = useNavigation()
    const [user,setUser] = useState('')
    const [contact,setContact] = useState('')

    useEffect(()=>{
        
        AsyncStorage.getItem('user').then(obj => {
            setUser(JSON.parse(obj))
            console.log(user.id,id)
            if (user.id == id) return

            //get contact's info from id
            axios({
                method:'GET',
                url:'http://'+localhost+':8000/api/users/'+id,
            }).then(res => {
                setContact(res.data.contact[0])
            })
        })


        
    },[])

    //if user id == contact id -> do not render
    if (user.id == id) return <></>
    return (
        <TouchableNativeFeedback
        onPress={() => {navigation.navigate('ChatStack',{
            user:user,
            messages:messages,
            contact:contact
        })}}>
            <View style={styles.cardContainer}>
                {
                    contact.picture_base64?
                    <Image
                    style={styles.picture}
                    source={{uri:'data:image/png;base64,'+contact.picture_base64}}/>:
                    <Image
                    style={styles.picture}
                    source={require('../../assets/profile/default_picture.jpg')}/>
                }
                
                <Text style={styles.contactName}>{contact.name}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}
 
export default ContactCard;

const styles = StyleSheet.create({
    picture:{
        width:65,
        height:65,
        borderRadius:35,
        borderWidth:2,
        borderColor:'#0091ff',
        margin:10
    },
    cardContainer:{
        width:'100%',
        height:90,
        flexDirection:'row',
        borderBottomColor:'#f0f0f0',
        borderBottomWidth:1,
        alignItems:'center'
    },
    contactName:{
        fontSize:21,
        fontWeight:'500'
    }
})