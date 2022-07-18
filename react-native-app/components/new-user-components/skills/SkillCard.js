import { Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../../styles/global";
import { Ionicons } from '@expo/vector-icons';

//removable: if card can be removed when editing profile
const SkillCard = ({ skill,removable,removeSkill }) => {
    return (
        <View style={globalStyles.skillCard}>
            <Text style={globalStyles.skillText}>{skill}</Text>

            {
                removable?
                <TouchableOpacity
                onPress={removeSkill}>
                    <Ionicons name="close-circle" size={24} color="white" style={globalStyles.removeSkillIcon}/>
                </TouchableOpacity>:
                <></>
            }

        </View>
        
    );
}
 
export default SkillCard;