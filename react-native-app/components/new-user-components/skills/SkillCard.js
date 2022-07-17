import { Text, View } from "react-native";
import { globalStyles } from "../../../styles/global";

//removable: if card can be removed when editing profile
const SkillCard = ({ skill,removable,setSkills }) => {
    return (
        <View style={globalStyles.skillCard}>
            <Text style={globalStyles.skillText}>{skill}</Text>
        </View>
        
    );
}
 
export default SkillCard;