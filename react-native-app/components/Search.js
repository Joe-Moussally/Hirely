import { Alert, Modal, StyleSheet, Text, TextInput, TouchableNativeFeedback, View } from "react-native";
import { Ionicons,AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const Search = ({setValue}) => {

    const [textInput,setTextInput] = useState('')

    //track if filter modal is visible or not
    const [modalVisible, setModalVisible] = useState(false);
    const [salaryPeriod,setSalaryPeriod] = useState('hour')

    return (
        <View style={styles.mainContainer}>

        {/* Filter search modal */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Filter by salary</Text>

                <View style={styles.periodContainer}>
                    <Text style={styles.pickerTitle}>Salary Period</Text>

                    <Picker
                    selectedValue={salaryPeriod}
                    onValueChange={setSalaryPeriod}
                    style={{width:'40%'}}
                    >
                        <Picker.item value="hour" label="Hour" />
                        <Picker.item value="month" label="Month" />
                        <Picker.item value="year" label="Year" />
                    </Picker>
                </View>

                <View style={styles.minMaxContainer}>

                    <View style={styles.minContainer}>
                        <Text style={styles.rateTitle}>Min. rate($/{salaryPeriod})</Text>
                        <TextInput/>
                    </View>

                    <View style={styles.maxContainer}>
                        <Text style={styles.rateTitle}>Max. rate($/{salaryPeriod})</Text>
                        <TextInput/>
                    </View>

                </View>

            </View>



            <View>

            </View>
        </Modal>

            <View style={styles.container}>

                    <Ionicons
                    name="search" size={30}
                    color="#969696" 
                    style={styles.icon}/>

                    <TextInput
                    placeholder="Search Jobs..."
                    onChangeText={input => {
                        setValue(input)
                        setTextInput(input)
                        }}
                    style={styles.input}
                    value={textInput}
                    />

                    {
                        textInput?
                        <AntDesign
                        name="close" 
                        size={30}
                        color="#6b6b6b"
                        style={styles.close}
                        onPress={()=>{
                            setTextInput('')
                            setValue('')
                        }}
                        />
                        :
                        <></>
                    }


            </View>

            {/* Filter Seach */}
            <TouchableNativeFeedback style={{width:30,height:30}} onPress={() => setModalVisible(true)}>
                <Ionicons name="filter" size={24} color="#4f4f4f" />
            </TouchableNativeFeedback>
            
        </View>
    );
}
 
export default Search;

const styles = StyleSheet.create({
    mainContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    container:{
        flexDirection:'row',
        backgroundColor:'#e6e6e6',
        borderRadius:10,
        margin:10,
        width:'85%',
        alignItems:'center'
    },
    input:{
        fontSize:17,
        padding:5,
        color:'#737373',
        width:'100%'
    },
    icon:{
        padding:5
    },
    close:{
        marginLeft:'auto',
        marginRight:5
    },
    modalContainer:{
        backgroundColor:'#fcfcfc',
        flex:1,
        marginVertical:'60%',
        marginHorizontal:'5%',
        borderRadius:20,
        shadowColor:'black',
        elevation:10,
        position:'absolute',
        alignSelf:'center'
    },
    modalTitle:{
        textAlign:'center',
        margin:10,
        fontWeight:'500',
        fontSize:22,
        color:'#34416e'
    },
    periodContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
    },
    pickerTitle:{
        margin:10,
        fontSize:16,
        textAlign:'center',
        color:'#7a7a7a'
    },

    //min max container
    minMaxContainer:{
        borderWidth:1,
        borderColor:'red',
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    minContainer:{
        borderWidth:1,
        borderColor:'blue',
        width:'40%',
    },
    maxContainer:{
        borderWidth:1,
        borderColor:'blue',
        width:'40%'
    },
    rateTitle:{
        fontWeight:'600',
        textAlign:'center',
        color:'#1b2c69'
    }
})