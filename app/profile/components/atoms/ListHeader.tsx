import { fonts } from "@/constants/fonts";
import { getScaledFontSize, SingleListItemType } from "@/constants/globalConstants";
import { globalStyleDefinitions } from "@/constants/globalStyleDefinitions";
import imagePath from "@/constants/imagePath";
import React, { memo } from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

type ListHeaderProps = {
    title: string;
    imageSource: ImageSourcePropType
    color: string;

}

const ListHeader = (props: ListHeaderProps) => {

    return (
        <View style={globalStyleDefinitions.flexRow_centerItem}>
            <Image source={props?.imageSource} style={styles.image} />
            <Text style={[styles.cardText, { color: props?.color }]}>
                {props?.title}
            </Text>
        </View>
    )
}

export default memo(ListHeader)

const styles = StyleSheet.create({
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
