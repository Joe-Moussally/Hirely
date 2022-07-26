import { Alert, Modal, StyleSheet, Text, TextInput, TouchableNativeFeedback, View } from "react-native";
import { Ionicons,AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const Search = ({setValue,setMinValue,setMaxValue}) => {

    const [textInput,setTextInput] = useState('')

    //track if filter modal is visible or not
    const [modalVisible, setModalVisible] = useState(false);
    const [salaryPeriod,setSalaryPeriod] = useState('hour')

    const [min,setMin] = useState(0)
    const [max,setMax] = useState(null)


    //function to calculate the ralary rate filtered and set it to parent component
    const handleFilter = () => {
        //calcutate the job rate for filtering per day to compare all salarie with different salary periods
        let minJobRate
        let maxJobRate
        if(salaryPeriod == 'hour') {
            minJobRate = min*24
            maxJobRate = max*24
        } else if (salaryPeriod == 'month') {
            minJobRate = min/30
            maxJobRate = max/30
        } else {
            minJobRate = min/365
            maxJobRate = max/365
        }
        setMinValue(minJobRate)
        setMaxValue(maxJobRate)
        setModalVisible(false)
    }

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
                        <TextInput style={styles.filterInput} placeholder="ex: 0" onChangeText={setMin} keyboardType='number-pad' value={min}/>
                    </View>

                    <View style={styles.maxContainer}>
                        <Text style={styles.rateTitle}>Max. rate($/{salaryPeriod})</Text>
                        <TextInput style={styles.filterInput} placeholder="ex: 2000" onChangeText={setMax} keyboardType='number-pad' value={max}/>
                    </View>

                </View>

                <View style={styles.filterButtonsContainer}>

                    <TouchableNativeFeedback onPress={() => {
                        setMin(0)
                        setMax(null)
                        setMaxValue(null)
                        setMinValue(0)
                    }}>
                        <View style={styles.outlineButton}>
                            <Text style={styles.outlineButtonText}>Clear</Text>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={handleFilter}>
                        <View style={styles.filledButton}>
                            <Text style={styles.filledButtonText}>Apply</Text>
                        </View>
                    </TouchableNativeFeedback>

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
        marginVertical:'30%',
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
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    minContainer:{
        width:'40%',
    },
    maxContainer:{
        width:'40%'
    },
    rateTitle:{
        fontWeight:'600',
        textAlign:'center',
        color:'#1b2c69'
    },
    filterInput:{
        borderWidth:2,
        borderColor:'#384c5e',
        margin:0,
        paddingHorizontal:5,
        paddingVertical:4,
        borderRadius:10
    },
    // Modal buttons
    filterButtonsContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20
    },
    outlineButton:{
        borderWidth:2,
        borderColor:'#009dff',
        width:'26%',
        paddingHorizontal:15,
        paddingVertical:5,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    outlineButtonText:{
        textAlign:'center',
        fontWeight:'800',
        color:'#009dff'
    },
    filledButton:{
        backgroundColor:'#009dff',
        width:'26%',
        paddingHorizontal:15,
        paddingVertical:5,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    filledButtonText:{
        textAlign:'center',
        color:'white',
        fontWeight:'800'
    }
})