import { LinearGradient, vec } from "@shopify/react-native-skia";
import React, { memo } from "react";
import { View, ViewStyle } from "react-native";
import { Area, CartesianChart, Line } from "victory-native";

const LineGraph = ({
  data,
  xKey,
  yKeys,
  customStyle,
  linearColor,
}: {
  data: any[];
  xKey: string;
  yKeys: string[];
  customStyle?: ViewStyle;
  linearColor: any[];
}) => {
  return (
    <View style={[customStyle, { height: "100%", flex: 1 }]}>
      <CartesianChart
        data={data}
        xKey={xKey}
        yKeys={yKeys}
        domainPadding={{ left: 5, right: 5, top: 5, bottom: 5 }}
      >
        {({ points, chartBounds }) => {
          return (
            <>
              <Area
                points={points[yKeys[0]]}
                y0={chartBounds.bottom}
                curveType="bumpX"
                animate={{ type: "spring" }}
              >
                <LinearGradient
                  start={vec(0, 0)}
                  end={vec(0, 50)}
                  colors={linearColor}
                />
              </Area>

              <Line
                points={points[yKeys[0]]}
                color={linearColor[0]}
                strokeWidth={1}
                curveType="bumpX"
                animate={{ type: "spring" }}
              />
            </>
          );
        }}
      </CartesianChart>
    </View>
  );
};

export default memo(LineGraph);
