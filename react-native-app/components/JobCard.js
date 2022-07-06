import { Text, View, Image, StyleSheet, TouchableNativeFeedback } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const JobCard = ({ job }) => {
    const navigation = useNavigation()

    const viewJob = () => {
        navigation.navigate('JobDetailsStack',{id:job.id})
    }

    return (

        <TouchableNativeFeedback onPress={viewJob}>
            {/* Flex Direction Row */}
            <View style={styles.jobCardContainer}>
                
                    {
                        job.user['picture']?
                        <Image
                        style={styles.jobCardPicture}
                        source={job.user['picture']}/>:
                        <Image
                        style={styles.jobCardPicture}
                        source={require('../assets/profile/default_picture.jpg')} />
                    }

                    {/* Flex Direction is Column */}
                    <View style={styles.jobCardInfoContainer}>

                        <Text style={styles.cardPosition}>{job.position}</Text>
                        <Text style={styles.cardPoster}>{job.user['name']}</Text>
                        {/* <View style={styles.cardLocationContainer}>
                                <MaterialIcons name="location-on" size={18} color="black" />
                                <Text style={styles.cardLocationText}>LOCATION</Text>
                        </View> */}
                         
                    </View>
                
            </View>
        </TouchableNativeFeedback>

    );
}

const styles = StyleSheet.create({
    jobCardContainer: {
        flexDirection:'row',
        marginVertical:17,
        marginHorizontal:'2.5%',
        padding:20,
        alignItems:'center',
        width: '95%',
        height: 130,
        backgroundColor: "white",
        borderRadius: 19,
        shadowColor: "rgba(0,0,0,0.72)",
        shadowOffset: {
            width: 0,
            height: 3
        },
        elevation: 10,
        shadowOpacity: 0.34,
        shadowRadius: 10,
    },
    jobCardPicture:{
        width:100,
        height:100,
        borderRadius:50,
        borderWidth:1,
        borderColor:'#c7c7c7'
    },
    jobCardInfoContainer:{
        margin:20,
        height:'100%',
        width:'67%'
    },
    cardPosition:{
        fontSize:23,
        fontWeight:'bold'
    },
    cardPoster:{
        marginVertical:10
    },
    // cardLocationContainer:{
    //     width:'100%',
    //     alignItems:'flex-end',
    // },
    // cardLocationText:{
    //     transform:[{translateY:-20},{translateX:-20}]
    // }
  });
 
export default JobCard;