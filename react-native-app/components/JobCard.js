import { Text, View } from "react-native";

const JobCard = ({ job }) => {
    return (
        <View>
            <Text>{job.position}</Text>
        </View>
    );
}
 
export default JobCard;