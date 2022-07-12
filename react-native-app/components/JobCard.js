import { Text, View, Image, StyleSheet, TouchableNativeFeedback } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { MaterialIcons } from "@expo/vector-icons";

const JobCard = ({ job }) => {
    const navigation = useNavigation()
    const route = useRoute();

    //track the address of the job
    const [address, setAdress] = useState('')

    //routing to the c
    const viewJob = () => {
        if(route.name == 'MyJobsStack'){
            navigation.navigate('MyJobDetailsStack',{id:job.id,address:address})
            return
        }
        if(route.name == 'JobsStack') {
            navigation.navigate('JobDetailsStack',{id:job.id,address:address})
        }
        
    }

    useEffect(()=>{
        
        const getCityName = async () => {
            let addressInfo = await Location.reverseGeocodeAsync({
                latitude:Number(job.user.lat),
                longitude:Number(job.user.lng)
            })

            setAdress(addressInfo[0].city)
        }
        getCityName()
        
    },[])

    return (

        <TouchableNativeFeedback onPress={viewJob}>
            {/* Flex Direction Row */}
            <View style={styles.jobCardContainer}>
                
                    {
                        job.user.picture?
                        <Image
                        style={styles.jobCardPicture}
                        source={{uri:job.user.picture}}/>:
                        <Image
                        style={styles.jobCardPicture}
                        source={require('../assets/profile/default_picture.jpg')} />
                    }

                    {/* Flex Direction is Column */}
                    <View style={styles.jobCardInfoContainer}>

                        <Text style={styles.cardPosition}>{job.position}</Text>
                        <Text style={styles.cardPoster}>{job.user['name']}</Text>

                        <View style={styles.cardLocationContainer}>
                                <MaterialIcons name="location-on" size={18} color="crimson" />
                                <Text style={styles.cardLocationText}>{address}</Text>
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
        // marginHorizontal:'5%',
        padding:20,
        alignItems:'center',
        width:'90%',
        alignSelf:'center',
        height: 125,
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
        width:'67%'
    },
    cardPosition:{
        fontSize:23,
        fontWeight:'bold'
    },
    cardPoster:{
        marginVertical:10,
        fontSize:17
    },
    cardLocationContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:'auto',
    },
    cardLocationText:{

    }
  });
 
export default JobCard;