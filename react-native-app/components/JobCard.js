import { Text, View, Image, StyleSheet, TouchableNativeFeedback } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons,FontAwesome5 } from "@expo/vector-icons";

const JobCard = ({ job }) => {
    const navigation = useNavigation()
    const route = useRoute();

    const viewJob = () => {
        if(route.name == 'MyJobsStack'){
            navigation.navigate('MyJobDetailsStack',{id:job.id,address:job.user.city,position:job.position})
            return
        }
        if(route.name == 'JobsStack') {
            navigation.navigate('JobDetailsStack',{id:job.id,address:job.user.city,position:job.position})
        }
        
    }

    if (!job.user) return <></>

    return (

        <TouchableNativeFeedback onPress={viewJob}>
            {/* Flex Direction Row */}
            <View style={styles.jobCardContainer}>
                
                    {
                        job.user.picture_base64?
                        <Image
                        style={styles.jobCardPicture}
                        source={{uri:'data:image/png;base64,'+job.user.picture_base64}}/>:
                        <Image
                        style={styles.jobCardPicture}
                        source={require('../assets/profile/default_picture.jpg')} />
                    }

                    {/* Flex Direction is Column */}
                    <View style={styles.jobCardInfoContainer}>

                        <Text style={styles.cardPosition}>{job.position}</Text>
                        <Text style={styles.cardPoster}>{job.user['name']}</Text>

                        {
                            job.salary?
                            <Text style={styles.salaryText}>
                                <FontAwesome5 name="dollar-sign" size={14} color="#00cf45" /> {job.salary} $/{job.salary_period}
                            </Text>:<></>
                        }


                        <View style={styles.cardLocationContainer}>
                                <MaterialIcons name="location-on" size={18} color="crimson" />
                                <Text style={styles.cardLocationText}>{job.user.city}</Text>
                        </View>
                         
                    </View>
                
            </View>
        </TouchableNativeFeedback>

    );
}

const styles = StyleSheet.create({
    jobCardContainer: {
        flexDirection:'row',
        marginVertical:12,
        paddingHorizontal:20,
        paddingVertical:10,
        alignItems:'center',
        width:'90%',
        alignSelf:'center',
        height: 137,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "rgba(0,0,0,0.72)",
        shadowOffset: {
            width: 0,
            height: 20
        },
        elevation: 4,
        shadowOpacity: 0.001,
        shadowRadius: 10,
    },
    jobCardPicture:{
        width:'30%',
        aspectRatio:1/1,
        borderRadius:50,
        borderWidth:2,
        borderColor:'#0096ed'
    },
    jobCardInfoContainer:{
        margin:20,
        height:'100%',
        width:'67%',
        justifyContent:'space-between'
    },
    cardPosition:{
        fontSize:23,
        fontWeight:'bold'
    },
    cardPoster:{
        marginVertical:10,
        fontSize:18,
    },
    cardLocationContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:'auto',
    },
    salaryText:{
        fontStyle:'italic',
        color:'#4d4d4d'
    },
    cardLocationText:{

    }
  });
 
export default JobCard;