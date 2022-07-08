import { Text } from "react-native";

const ViewProfile = ({route}) => {
    return (
        <Text>{route.params.id}</Text>
    );
}
 
export default ViewProfile;