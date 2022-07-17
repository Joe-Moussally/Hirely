import { Text } from "react-native";

//removable: if card can be removed when editing profile
const SkillCard = ({ skill,removable,setSkills }) => {
    return (
        <Text>{skill}</Text>
    );
}
 
export default SkillCard;