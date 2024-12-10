import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import {
  getRoundedValue,
  getScaledFontSize,
} from "@/constants/globalConstants";
import { globalStyleDefinitions } from "@/constants/globalStyleDefinitions";
import imagePath from "@/constants/imagePath";
import Moment from "moment";
import React, { memo, useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { Bar, CartesianChart } from "victory-native";
import DetailsCard from "./DetailsCard";
import LineGraph from "./LineGraph";
const ApiHeaderData = require("../../../apiData/match-detail-header.json");

type HeaderData = {
  matchName: string;
  matchResult: string;
  matchScore: string;
  matchTime: string;
  matchDate: string;
  skillRating: number;
  averageSkill: number;
  skillGraph: Array<any>;
  placement: number;
  averagePlacement: number;
  placementGraph: Array<any>;
};

const Header = ({}) => {
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [headerData, setHeaderData] = useState<HeaderData>();

  useEffect(() => {
    getHeaderData();
  }, []);

  const getHeaderData = () => {
    try {
      let headerDataRes = { ...ApiHeaderData };
      let parsedHeaderData: HeaderData = {
        matchName: headerDataRes?.match_?.map_name,
        matchResult: headerDataRes?.match_?.my_result,
        matchScore: headerDataRes?.match_?.score,
        matchTime: Moment(headerDataRes?.match_?.created_at).format("HH:mm"),
        matchDate: Moment(headerDataRes?.match_?.created_at).format(
          "DD MMM YYYY"
        ),
        skillRating: getRoundedValue(ApiHeaderData?.user_rank?.total_rank),
        averageSkill: getRoundedValue(
          ApiHeaderData?.user_rank?.total_rank_average
        ),
        skillGraph: [...ApiHeaderData?.user_rank?.total_rank_history].map(
          (item, index) => {
            return {
              x: index,
              y: item,
            };
          }
        ),
        placement: [...ApiHeaderData?.user_rank?.players_positions].find(
          (item, index) => {
            return item.total_rank == headerDataRes?.user_rank?.total_rank;
          }
        )?.total_rank_position,
        averagePlacement: getRoundedValue(
          ApiHeaderData?.user_rank?.total_rank_position_average
        ),
        placementGraph: [...ApiHeaderData?.user_rank?.players_positions].map(
          (item, index) => {
            return {
              y: item?.total_rank,
              x: index,
            };
          }
        ),
      };
      setHeaderData(parsedHeaderData);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <ActivityIndicator size={"large"} color={colors.primary} />
  ) : (
    <ImageBackground
      source={imagePath.matchHeader}
      style={styles.imageContainer}
    >
      <View
        style={[styles.imageInnerView, { borderColor: theme.colors.outline }]}
      >
        <View style={globalStyleDefinitions.flexRow_centerItem}>
          <Image source={imagePath.ranking} style={styles.headerImage} />
          <Text style={[styles.headerText, { color: theme.colors.surface }]}>
            {headerData?.matchName} /{" "}
            <Text style={[styles.headerText, { color: theme.colors.primary }]}>
              {headerData?.matchResult} {headerData?.matchScore}
            </Text>
          </Text>
        </View>
        <View
          style={[
            globalStyleDefinitions.flexRow_centerItem,
            globalStyleDefinitions.mt_4,
          ]}
        >
          <Text
            style={[styles.headerSubText, { color: theme.colors.onSurface }]}
          >
            {headerData?.matchTime}
          </Text>
          <Text
            style={[
              styles.headerSubText,
              {
                marginLeft: globalStyleDefinitions.mt_16.marginTop,
                color: theme.colors.onSurface,
              },
            ]}
          >
            {headerData?.matchDate}
          </Text>
        </View>
        <View style={globalStyleDefinitions.mt_4}>
          <DetailsCard
            count={`${headerData?.skillRating}`}
            status={1}
            subText={`vs.your avg: ${headerData?.averageSkill}`}
            title="skill rating"
            imagePath={imagePath.rating}
            RightComponent={() => (
              <LineGraph
                data={headerData?.skillGraph || []}
                xKey="x"
                yKeys={["y"]}
                linearColor={[theme.colors.primary, theme.colors.background]}
              />
            )}
          />
          <DetailsCard
            count={`${headerData?.placement}`}
            status={1}
            subText={`vs.your avg: ${headerData?.averagePlacement}th`}
            title="placement"
            imagePath={imagePath.placement}
            RightComponent={() => (
              <CartesianChart
                data={headerData?.placementGraph || []}
                xKey="x"
                yKeys={["y"]}
                domainPadding={{ left: 5, right: 5, top: 5, bottom: 5 }}
                key={(Math.random() * 1000000)?.toString()}
              >
                {({ points, chartBounds }) => (
                  <>
                    {points.y.map((point, index) => {
                      return (
                        <>
                          <Bar
                            key={index?.toString()}
                            points={[point]}
                            chartBounds={chartBounds}
                            color={
                              point?.yValue == headerData?.skillRating
                                ? theme.colors.primary
                                : theme.colors.onSurface
                            }
                            animate={{ type: "spring" }}
                            roundedCorners={{
                              topLeft: 10,
                              topRight: 10,
                              bottomLeft: 10,
                              bottomRight: 10,
                            }}
                            barWidth={10}
                          />
                        </>
                      );
                    })}
                  </>
                )}
              </CartesianChart>
            )}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    borderRadius: globalStyleDefinitions.br_16.borderRadius,
    alignSelf: "center",
    overflow: "hidden",
    flex: 1,
    backgroundColor: colors.imageBackground,
  },
  imageInnerView: {
    opacity: 0.8,
    height: "100%",
    width: "100%",
    padding: globalStyleDefinitions.screenPadding.padding,
    borderWidth: 1,
    backgroundColor: colors.imageBackground,
  },
  headerImage: { height: 32, width: 32 },
  headerText: {
    fontFamily: fonts.unboundedBold,
    marginLeft: 10,
    fontSize: getScaledFontSize(18),
  },
  headerSubText: {
    fontFamily: fonts.sansMedium,
    fontSize: getScaledFontSize(12),
  },
});
