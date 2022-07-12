import { useState } from "react";
import { Text, View,Image, StyleSheet, Dimensions } from "react-native";
import { globalStyles } from "../../styles/global";

const ViewProfile = ({route}) => {

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