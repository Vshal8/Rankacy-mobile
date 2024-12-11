import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import {
    getRoundedValue,
    getScaledFontSize,
    SingleListItemType,
} from "@/constants/globalConstants";
import { globalStyleDefinitions } from "@/constants/globalStyleDefinitions";
import imagePath from "@/constants/imagePath";
import Moment from "moment";
import React, { memo, useCallback } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import ListCard from "../atoms/ListCard";
import ListHeader from "../atoms/ListHeader";

type StrengthContainerProps = {
    data: Array<SingleListItemType>;
}

const StrengthContainer = ({ data }: StrengthContainerProps) => {
    const theme = useTheme();

    const SingleListItem = useCallback(({ item, index }: any) => {
        return <ListCard item={item} status={'strength'} />
    }, [])

    const listItemExtractor = useCallback((item: any, index: any) => { return item?.title?.toString() }, [])

    return (
        <View style={styles.fullContainer}>
            <ListHeader title={"Strengths"} imageSource={imagePath.strengths} color={theme.colors.onSurface} />
            <FlatList
                data={data}
                renderItem={SingleListItem}
                contentContainerStyle={styles.listContainer}
                scrollEnabled={false}
                keyExtractor={listItemExtractor}
            />
        </View>

    );
};

export default memo(StrengthContainer);

const styles = StyleSheet.create({
    fullContainer: {
        marginTop: globalStyleDefinitions.mt_16.marginTop
    },
    listContainer: {
        marginTop: 10
    },
    image: {
        height: 24,
        width: 24,
        marginRight: 10
    },
    cardText: {
        fontFamily: fonts.unboundedMedium,
        fontSize: getScaledFontSize(14),
    },
});
