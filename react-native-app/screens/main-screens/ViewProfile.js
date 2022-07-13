import { useState } from "react";
import { Text, View,Image, StyleSheet, Dimensions, TouchableNativeFeedback } from "react-native";
import { globalStyles } from "../../styles/global";

const ViewProfile = ({route,navigation}) => {

    const [user,setUser] = useState(route.params.user)

    return (
        <View style={[globalStyles.container,{backgroundColor:'white'}]}>

            {
                user.picture?
                <Image
                style={globalStyles.profilePicture}
                source={{uri:user.picture}}/>:
                <Image
                style={globalStyles.profilePicture}
                source={require('../../assets/profile/default_picture.jpg')}/>
            }
            <Text style={styles.username}>{user.name}</Text>

            <TouchableNativeFeedback onPress={() => {
                navigation.pop()
                navigation.pop()
                navigation.navigate('ChatStack',{contactId:route.params.user.id})
                }}>
                <View style={globalStyles.outlineButton}>
                    <Text style={globalStyles.outlineButtonText}>Message</Text>
                </View>
            </TouchableNativeFeedback>

        </View>
    );
}
 
export default ViewProfile;

const styles = StyleSheet.create({
    username:{
        fontSize:26,
        fontWeight:'600',
        alignSelf:'center',
        margin:20
    }
})