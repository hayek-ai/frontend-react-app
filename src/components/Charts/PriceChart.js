import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import dayjs from "dayjs";

import { useTheme } from "@material-ui/core/styles";
import { STOCK_GREEN, STOCK_RED } from "../../util/theme";
import { LightenDarkenColor } from "../../util/utils";

const PriceChart = ({ chartInfo, color }) => {
  const theme = useTheme();
  const strokeColor = color === "green" ? STOCK_GREEN : STOCK_RED;
  const fillColor = lightenDarkenColor(strokeColor, 10);

  return (
    <div style={{ margin: "auto" }}>
      <AreaChart
        width={340}
        height={250}
        data={chartInfo}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis
          dataKey="date"
          stroke={theme.palette.text.primary}
          tickFormatter={(timeStr) => dayjs(timeStr).format("MMM")}
        />
        <YAxis stroke={theme.palette.text.primary} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="close"
          stroke={strokeColor}
          fill={fillColor}
        />
      </AreaChart>
    </div>
  );
};

export default PriceChart;
