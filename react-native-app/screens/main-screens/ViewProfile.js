import { Text, View,Image, StyleSheet } from "react-native";
import { globalStyles } from "../../styles/global";

const ViewProfile = ({route}) => {
    return (
        <View style={[globalStyles.container,{backgroundColor:'white'}]}>

            {
                route.params.user.picture?
                <Image
                style={styles.picture}
                source={user.picture}/>:
                <Image
                style={styles.picture}
                source={require('../../assets/profile/default_picture.jpg')}/>
            }

        </View>
    );
}
 
export default ViewProfile;

const styles = StyleSheet.create({
    picture:{
        width:180,
        height:180,
        borderRadius:90,
        borderWidth:2,
        borderColor:'#0096ed',
        alignSelf:'center'
    }
})