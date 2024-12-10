import { ImageSourcePropType } from "react-native";

type ImagePath = {
  matchHeader: ImageSourcePropType;
  ranking: ImageSourcePropType;
  aim: ImageSourcePropType;
  placement: ImageSourcePropType;
  rating: ImageSourcePropType;
  profile: ImageSourcePropType;
  matches: ImageSourcePropType;
  strengths: ImageSourcePropType;
  weaknesses: ImageSourcePropType;
  movement: ImageSourcePropType;
  dick: ImageSourcePropType;
  sense: ImageSourcePropType;
};

const imagePath: ImagePath = {
  matchHeader: require("../assets/images/matchHeader.png"),
  ranking: require("../assets/images/ranking.png"),
  aim: require("../assets/images/aim.png"),
  placement: require("../assets/images/placement.png"),
  rating: require("../assets/images/rating.png"),
  profile: require("../assets/images/profile.png"),
  matches: require("../assets/images/matches.png"),
  strengths: require("../assets/images/strength.png"),
  weaknesses: require("../assets/images/weaknesses.png"),
  movement: require("../assets/images/movement.png"),
  dick: require("../assets/images/dick.png"),
  sense: require("../assets/images/sense.png"),
};
export default imagePath;
