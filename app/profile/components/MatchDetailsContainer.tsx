import React, { memo, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import StatCard from "./atoms/StatCard";
import imagePath from "@/constants/imagePath";
import { globalStyleDefinitions } from "@/constants/globalStyleDefinitions";
import Entypo from "react-native-vector-icons/Entypo";
import { CartesianChart, Line } from "victory-native";
import { Circle } from "@shopify/react-native-skia";
import WeaknessContainer from "./molecules/WeaknessContainer";
import { getRoundedValue, getScaledFontSize, SingleListItemType } from "@/constants/globalConstants";
import StrengthContainer from "./molecules/StrengthContainer";
import TimeRangeSheet from "./atoms/TimeRangeSheet";
import CountWithStatus from "@/components/atoms/CountWithStatus";
import BottomText from "@/components/atoms/BottomText";
import LineGraph from "./atoms/LineGraph";
import { fonts } from "@/constants/fonts";

const DATA = Array.from({ length: 10 }, (_, i) => ({
    day: i,
    lowTmp: 20 + 10 * Math.random(),
    highTmp: 40 + 30 * Math.random(),
}));

const ApiDetailsData = require("../../../apiData/match-detail-detail.json");

type RankingDetails = {
    rank: number;
    averageRank: number;
}

type MatchDetailsData = {
    rankingDetails: {
        aim: RankingDetails,
        movement: RankingDetails,
        utility: RankingDetails,
        dickFactor: RankingDetails,
        gameSense: RankingDetails
    },
    strengths: Array<SingleListItemType>,
    weaknesses: Array<SingleListItemType>,
    skillHistoryGraphData: Array<any>,
    damageHistoryGraphData: Array<any>,
    kdRatio: number,
    averageKDRatio: number

}

const MatchDetailsContainer = ({ }) => {

    const theme = useTheme()

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [matchDetailsData, setMatchDetailsData] = useState<MatchDetailsData>({
        rankingDetails: {
            aim: {
                rank: 0,
                averageRank: 0,
            },
            movement: {
                rank: 0,
                averageRank: 0,
            },
            utility: {
                rank: 0,
                averageRank: 0,
            },
            dickFactor: {
                rank: 0,
                averageRank: 0,
            },
            gameSense: {
                rank: 0,
                averageRank: 0,
            }
        },
        strengths: new Array<SingleListItemType>(),
        weaknesses: new Array<SingleListItemType>(),
        skillHistoryGraphData: new Array<any>(),
        damageHistoryGraphData: new Array<any>(),
        kdRatio: 0,
        averageKDRatio: 0
    })

    const [selectedTimeRange, setSelectedTimeRange] =
        useState<string>("last 15 games");
    const [timeRangeModal, setTimeRangeModal] = useState<boolean>(false);

    useEffect(() => {
        getMatchDetailsData()
    }, [])

    const getListItemData = (arr: Array<any>) => {
        return arr?.map((item, index) => { return { title: item?.name, description: item?.description, value: `${getRoundedValue(item?.current)}${item?.unit == "percentage" ? "%" : ""}` } })
    }

    const getMatchDetailsData = async () => {
        try {
            const objMatchDetailsData = {
                ...ApiDetailsData
            }
            const parsedMatchDetailsData: MatchDetailsData = {
                rankingDetails: {
                    aim: {
                        rank: objMatchDetailsData?.ranking?.aim_rank,
                        averageRank: objMatchDetailsData?.ranking?.ranking_current_average?.aim_rank
                    },
                    movement: {
                        rank: objMatchDetailsData?.ranking?.movement_rank,
                        averageRank: objMatchDetailsData?.ranking?.ranking_current_average?.movement_rank
                    },
                    utility: {
                        rank: objMatchDetailsData?.ranking?.utility_rank,
                        averageRank: objMatchDetailsData?.ranking?.ranking_current_average?.utility_rank
                    },
                    dickFactor: {
                        rank: objMatchDetailsData?.ranking?.dick_factor_rank,
                        averageRank: objMatchDetailsData?.ranking?.ranking_current_average?.dick_factor_rank
                    },
                    gameSense: {
                        rank: objMatchDetailsData?.ranking?.sixth_sense_rank,
                        averageRank: objMatchDetailsData?.ranking?.ranking_current_average?.sixth_sense_rank
                    }
                },
                strengths: getListItemData(objMatchDetailsData?.strengths),
                weaknesses: getListItemData(objMatchDetailsData?.weaknesses),
                skillHistoryGraphData: [...objMatchDetailsData?.skill_rating_map_history].map((item, index) => {
                    return {
                        y: item?.total_rank,
                        x: index,
                    }
                }),
                damageHistoryGraphData: [...objMatchDetailsData?.avg_dmg_history].map((item, index) => {
                    return {
                        y: item,
                        x: index,
                    }
                }),
                kdRatio: objMatchDetailsData?.player_kill_death_stat?.kill_death_ratio.toFixed(2),
                averageKDRatio: objMatchDetailsData?.player_kill_death_stat?.player_kill_death_current_average_stat?.kill_death_ratio.toFixed(2)
            }
            setMatchDetailsData(parsedMatchDetailsData)
        }
        catch (err) {
            console.warn('Error fetching match details data', err)
        }
        finally {
            setIsLoading(false)
        }
    }




    const handleSelectRange = (match: string) => {
        setTimeRangeModal(false);
        setSelectedTimeRange(match);
    };

    return (
        <View>
            <View
                style={[styles.cardContainer,
                {
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.outline,
                },
                ]}>
                <View style={styles.rowContainer}>
                    <StatCard
                        avg={matchDetailsData?.rankingDetails?.aim?.averageRank}
                        imagePath={imagePath.aim}
                        status={1}
                        title={"Aim"}
                        val={matchDetailsData?.rankingDetails?.aim?.rank}
                    />
                    <StatCard
                        avg={matchDetailsData?.rankingDetails?.movement?.averageRank}
                        imagePath={imagePath.movement}
                        status={1}
                        title={"movement"}
                        val={matchDetailsData?.rankingDetails?.movement?.rank}
                    />
                </View>
                <View style={styles.rowContainer}>
                    <StatCard
                        avg={matchDetailsData?.rankingDetails?.utility?.averageRank}
                        imagePath={imagePath.movement}
                        status={1}
                        title={"utility"}
                        val={matchDetailsData?.rankingDetails?.utility?.rank}
                    />
                    <StatCard
                        avg={matchDetailsData?.rankingDetails?.dickFactor?.averageRank}
                        imagePath={imagePath.dick}
                        status={0}
                        title={"dick factor"}
                        val={matchDetailsData?.rankingDetails?.dickFactor?.rank}
                    />
                </View>
                <StatCard
                    avg={matchDetailsData?.rankingDetails?.gameSense?.averageRank}
                    imagePath={imagePath.sense}
                    status={1}
                    title={"game sense"}
                    val={matchDetailsData?.rankingDetails?.gameSense?.rank}
                    customStyle={{ width: '100%', marginBottom: 0 }}
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
                        Mirage Skill Rating Indicator
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            setTimeRangeModal(true);
                        }}
                        style={globalStyleDefinitions.flexRow_centerItem}
                    >
                        <Text style={[styles.cardSubtext, { color: theme.colors.surface }]}>
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
                        data={matchDetailsData?.skillHistoryGraphData}
                        xKey="x"
                        yKeys={["y"]}
                        domainPadding={{ left: 10, right: 10, top: 10, bottom: 10 }}
                        yAxis={[
                            {
                                lineColor: theme.colors.onSurface,
                                axisSide: "left",
                                yKeys: ["y"],
                            },
                        ]}
                    >
                        {({ points, chartBounds }) => {
                            console.log('Points are', points)
                            return <>
                                <Line
                                    points={points.y}
                                    color={theme.colors.onSurface}
                                    strokeWidth={2}
                                    curveType="bumpX"
                                    animate={{ type: "spring" }}
                                />
                                {points.y.map((point, index) => {
                                    console.log('P', point)
                                    return <>
                                        <Circle
                                            key={index}
                                            cx={point.x}
                                            cy={point.y}
                                            r={5}
                                            color={theme.colors.primary}
                                            layer
                                        />
                                    </>
                                })}
                            </>
                        }}
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
                        Avg. Dmg.
                    </Text>
                    <CountWithStatus title="16" />
                    <BottomText text="vs. your avg: 1,3" />
                </View>
                <LineGraph
                    data={matchDetailsData?.damageHistoryGraphData}
                    xKey="x"
                    yKeys={["y"]}
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
                        K/D Ratio
                    </Text>
                    <CountWithStatus title={`${matchDetailsData?.kdRatio}`} status={matchDetailsData?.kdRatio > matchDetailsData?.averageKDRatio ? 1 : 0} />
                    <BottomText text={`vs. your avg: ${matchDetailsData?.averageKDRatio}`} />
                    <View style={styles.graphContainer}>
                        <LineGraph
                            data={matchDetailsData?.damageHistoryGraphData}
                            xKey="x"
                            yKeys={["y"]}
                            linearColor={[matchDetailsData?.kdRatio > matchDetailsData?.averageKDRatio ? theme.colors.primary : theme.colors.secondary, theme.colors.background]}
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
                            data={matchDetailsData?.damageHistoryGraphData}
                            xKey="x"
                            yKeys={["y"]}
                            linearColor={[theme.colors.secondary, theme.colors.background]}
                        />
                    </View>
                </View>
            </View>
            <WeaknessContainer data={matchDetailsData?.weaknesses} />
            <StrengthContainer data={matchDetailsData?.strengths} />
            <TimeRangeSheet
                onSelect={handleSelectRange}
                visible={timeRangeModal}
                onClose={() => setTimeRangeModal(false)}
                selectedRange={selectedTimeRange}
            />
        </View >
    )
}

export default memo(MatchDetailsContainer)


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