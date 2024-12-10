import BottomTab from "@/components/BottomTab";
import CommonHeader from "@/components/CommonHeader";
import WrapperComponent from "@/components/WrapperComponent";
import React from "react";

const Matches = () => {
  return (
    <WrapperComponent>
      <CommonHeader title="matches" />

      <BottomTab screen="matches" />
    </WrapperComponent>
  );
};

export default Matches;
