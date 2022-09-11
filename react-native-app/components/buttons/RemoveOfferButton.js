import { View,Text,TouchableNativeFeedback,StyleSheet } from "react-native";
import { localhost } from "../../globalVariables";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const RemoveOfferButton = ({offerId}) => {

    const navigation = useNavigation()

    //function to handle removal of offer from the DB
    const handleRemove = () => {
        
        axios({
            method:'POST',
            url:'http://'+localhost+':8000/api/offers/delete/'+offerId //offer id
        }).then((Response)=>{
            console.log(Response.data)
            navigation.navigate('MyJobsStack')
        })
    }

    return (
        <TouchableNativeFeedback
        onPress={handleRemove}>
            <View style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Remove Offer</Text>
            </View>
        </TouchableNativeFeedback>
    );
}
 
export default RemoveOfferButton;

const styles = StyleSheet.create({
    removeButton:{
        backgroundColor:'crimson',
        width:'80%',
        marginHorizontal:'10%',
        height:40,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    removeButtonText:{
        fontSize:21,
        fontWeight:'bold',
        color:'white'
    },
})