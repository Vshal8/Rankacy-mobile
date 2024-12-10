import BottomTab from "@/components/BottomTab";
import CommonHeader from "@/components/CommonHeader";
import WrapperComponent from "@/components/WrapperComponent";
import BottomText from "@/components/atoms/BottomText";
import CountWithStatus from "@/components/atoms/CountWithStatus";
import { fonts } from "@/constants/fonts";
import { getScaledFontSize, windowWidth } from "@/constants/globalConstants";
import { globalStyleDefinitions } from "@/constants/globalStyleDefinitions";
import imagePath from "@/constants/imagePath";
import { Circle } from "@shopify/react-native-skia";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import Entypo from "react-native-vector-icons/Entypo";
import { CartesianChart, Line } from "victory-native";
import Header from "./component/Header";
import LineGraph from "./component/LineGraph";
import ListCard from "./component/ListCard";
import StatCard from "./component/StatCard";
import TimeRangeSheet from "./component/TimeRangeSheet";

const DATA = Array.from({ length: 10 }, (_, i) => ({
  day: i,
  lowTmp: 20 + 10 * Math.random(),
  highTmp: 40 + 30 * Math.random(),
}));

const stats = [
  { icon: imagePath.aim, title: "aim", value: 16, status: 1, avg: 74 },
  {
    icon: imagePath.movement,
    title: "movement",
    value: 16,
    status: 0,
    avg: 74,
  },
  {
    icon: imagePath.movement,
    title: "utility",
    value: 16,
    status: 1,
    avg: 74,
  },
  {
    icon: imagePath.dick,
    title: "dick factor",
    value: 16,
    status: 0,
    avg: 74,
  },
  {
    icon: imagePath.sense,
    title: "game sense",
    value: 45,
    status: 1,
    avg: 100,
  },
];

const ApiDetailsData = require("../../apiData/match-detail-detail.json");

const Profile = () => {
  const theme = useTheme();

  const [selectedTimeRange, setSelectedTimeRange] =
    useState<string>("last 15 games");
  const [timeRangeModal, setTimeRangeModal] = useState<boolean>(false);

  const handleSelectRange = (match: string) => {
    setTimeRangeModal(false);
    setSelectedTimeRange(match);
  };

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
        <Header />
        <View
          style={[
            styles.cardContainer,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.outline,
            },
          ]}
        >
          <View style={styles.rowContainer}>
            <StatCard
              avg={74}
              count={"16"}
              imagePath={imagePath.aim}
              status={1}
              title={"aim"}
              val={16}
            />
            <StatCard
              avg={74}
              count={"16"}
              imagePath={imagePath.movement}
              status={1}
              title={"movement"}
              val={16}
            />
          </View>
          <View style={styles.rowContainer}>
            <StatCard
              avg={74}
              count={"16"}
              imagePath={imagePath.movement}
              status={1}
              title={"utility"}
              val={16}
            />
            <StatCard
              avg={74}
              count={"16"}
              imagePath={imagePath.dick}
              status={0}
              title={"dick factor"}
              val={16}
            />
          </View>
          <StatCard
            avg={90}
            count={"45"}
            imagePath={imagePath.sense}
            status={1}
            title={"game sense"}
            val={16}  customStyle={{width:'100%',marginBottom:0}}
          />
        </View>

        <View
          style={[
            styles.cardContainer,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.outline,
            },
          ]}
        >
          <View
            style={[
              globalStyleDefinitions.flexRow_centerItem,
              { justifyContent: "space-between" },
            ]}
          >
            <Text
              style={[styles.cardHeader, { color: theme.colors.onSurface }]}
            >
              mirage skill rating indicator
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setTimeRangeModal(true);
              }}
              style={globalStyleDefinitions.flexRow_centerItem}
            >
              <Text
                style={[styles.cardSubtext, { color: theme.colors.surface }]}
              >
                {selectedTimeRange}
              </Text>
              <Entypo
                name="chevron-small-down"
                color={theme.colors.surface}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.mapContainer}>
            <CartesianChart
              data={DATA}
              xKey="day"
              yKeys={["lowTmp", "highTmp"]}
              domainPadding={{ left: 10, right: 10, top: 10, bottom: 10 }}
              yAxis={[
                {
                  lineColor: theme.colors.onSurface,
                  axisSide: "left",
                  yKeys: ["highTmp"],
                },
              ]}
            >
              {({ points, chartBounds }) => (
                <>
                  <Line
                    points={points.highTmp}
                    color={theme.colors.onSurface}
                    strokeWidth={2}
                    curveType="bumpX"
                    animate={{ type: "spring" }}
                  />
                  {points.highTmp.map((point, index) => (
                    <>
                      <Circle
                        key={index}
                        cx={point.x}
                        cy={point?.y || 0}
                        r={5}
                        color={theme.colors.primary}
                        layer
                      />
                    </>
                  ))}
                </>
              )}
            </CartesianChart>
          </View>
        </View>

        <View
          style={[
            styles.rowCardContainer,
            styles.cardContainer,
            { borderWidth: 0, backgroundColor: theme.colors.background },
          ]}
        >
          <View style={styles.cardSubContainer}>
            <Text style={[styles.cardText, { color: theme.colors.onSurface }]}>
              avg dmg
            </Text>
            <CountWithStatus title="16" />
            <BottomText text="vs. your avg: 1,3" />
          </View>
          <LineGraph
            data={DATA}
            xKey="day"
            yKeys={["highTmp"]}
            linearColor={[theme.colors.primary, theme.colors.background]}
          />
        </View>
        <View
          style={[
            globalStyleDefinitions.flexRow_centerItem,
            globalStyleDefinitions.flexFull,
          ]}
        >
          <View
            style={[
              styles.cardContainer,
              globalStyleDefinitions.flexFull,
              {
                marginRight: globalStyleDefinitions.mt_16.marginTop,
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.outline,
              },
            ]}
          >
            <Text style={[styles.cardText, { color: theme.colors.onSurface }]}>
              k/d ratio
            </Text>
            <CountWithStatus title="16" status={1} />
            <BottomText text="vs. your avg: 24" />
            <View style={styles.graphContainer}>
              <LineGraph
                data={DATA}
                xKey="day"
                yKeys={["highTmp"]}
                linearColor={[theme.colors.primary, theme.colors.background]}
              />
            </View>
          </View>
          <View
            style={[
              styles.cardContainer,
              globalStyleDefinitions.flexFull,
              {
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.outline,
              },
            ]}
          >
            <Text style={[styles.cardText, { color: theme.colors.onSurface }]}>
              h/s %
            </Text>
            <CountWithStatus title="20%" status={0} />
            <BottomText text="vs. your avg: 45%" />
            <View style={styles.graphContainer}>
              <LineGraph
                data={DATA}
                xKey="day"
                yKeys={["highTmp"]}
                linearColor={[theme.colors.secondary, theme.colors.background]}
              />
            </View>
          </View>
        </View>
        <View
          style={[
            globalStyleDefinitions.flexRow_centerItem,
            { marginTop: globalStyleDefinitions.mt_16.marginTop },
          ]}
        >
          <Image source={imagePath.weaknesses} style={styles.image} />
          <Text style={[styles.cardText, { color: theme.colors.onSurface }]}>
            weaknesses
          </Text>
        </View>
        <FlatList
          data={ApiDetailsData?.weaknesses}
          renderItem={({ item }) => <ListCard item={item} status={0} />}
          contentContainerStyle={styles.flatlistContainer}
          scrollEnabled={false}
        />

        <View
          style={[
            globalStyleDefinitions.flexRow_centerItem,
            { marginTop: globalStyleDefinitions.mt_16.marginTop },
          ]}
        >
          <Image source={imagePath.strengths} style={styles.image} />
          <Text style={[styles.cardText, { color: theme.colors.onSurface }]}>
            strengths
          </Text>
        </View>
        <FlatList
          data={ApiDetailsData?.strengths}
          renderItem={({ item }) => <ListCard item={item} status={1} />}
          contentContainerStyle={styles.flatlistContainer}
          scrollEnabled={false}
        />
      </ScrollView>
      <TimeRangeSheet
        onSelect={handleSelectRange}
        visible={timeRangeModal}
        onClose={() => setTimeRangeModal(false)}
        selectedRange={selectedTimeRange}
      />
      <BottomTab screen="profile" />
    </WrapperComponent>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 120,
  },
  cardContainer: {
    marginTop: globalStyleDefinitions.mt_16.marginTop,
    borderRadius: globalStyleDefinitions.br_16.borderRadius,
    padding: globalStyleDefinitions.screenPadding.padding,
    borderWidth: 1,
  },
  rowContainer: {
    ...globalStyleDefinitions.flexRow_centerItem,
    ...globalStyleDefinitions.flexFull,
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardHeader: {
    fontFamily: fonts.sansMedium,
    fontSize: getScaledFontSize(12),
  },
  cardSubtext: {
    fontFamily: fonts.sansMedium,
    fontSize: getScaledFontSize(13),
  },
  mapContainer: { height: 200, marginTop: 10 },
  rowCardContainer: {
    ...globalStyleDefinitions.flexFull,
    ...globalStyleDefinitions.flexRow_centerItem,
  },
  cardSubContainer: { marginRight: 30 },
  cardText: {
    fontFamily: fonts.unboundedMedium,
    fontSize: getScaledFontSize(14),
  },
  graphContainer: { height: 50, marginTop: 10 },
  image: { height: 24, width: 24, marginRight: 10 },
  flatlistContainer: { marginTop: 10 },
});

export default Profile;
