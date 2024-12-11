import BottomTab from "@/components/BottomTab";
import CommonHeader from "@/components/CommonHeader";
import WrapperComponent from "@/components/WrapperComponent";
import { globalStyleDefinitions } from "@/constants/globalStyleDefinitions";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
} from "react-native";
import MatchDetailsHeader from "./components/MatchDetailsHeader";
import MatchDetailsContainer from "./components/MatchDetailsContainer";


const Profile = () => {
  return (
    <WrapperComponent>
      <CommonHeader title="match detail" />
      <ScrollView
        style={[
          globalStyleDefinitions.flexFull,
          globalStyleDefinitions.screenPadding,
        ]}
        contentContainerStyle={styles.scrollContainer}
      >
        <MatchDetailsHeader />
        <MatchDetailsContainer />
      </ScrollView>
      <BottomTab screen="profile" />
    </WrapperComponent>
  );
};

export default Profile;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 120,
  },
})
