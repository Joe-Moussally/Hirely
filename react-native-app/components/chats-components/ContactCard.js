import axios from "axios";
import { useEffect } from "react";
import { Text } from "react-native";
import { localhost } from '../../globalVariables'

const ContactCard = ({id}) => {

    useEffect(()=>{
        
        //get contact's info from id
        axios({
            method:'GET',
            url:'http://'+localhost+':8000/api/users/'+id,
        }).then(res => {
            console.log(res.data)
        })
        
    },[])

    return (
        <Text>{id}</Text>
    );
}
 
export default ContactCard;