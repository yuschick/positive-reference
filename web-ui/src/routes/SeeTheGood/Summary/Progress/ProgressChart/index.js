import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { Area, AreaChart, CartesianGrid, Label, ReferenceLine, XAxis, YAxis } from 'recharts';
import { isFirstDayOfMonth } from 'date-fns';
import {
  useSettingsState,
  useStrengthState,
  useStrengthActions,
  useTranslation,
} from 'positive-store';

import Div from 'components/Div';
import useDebouncedComponentSize from 'utils/useDebouncedComponentSize';
import { SummaryContext } from 'context/SummaryContext/SummaryContext';
import { formatDate } from 'api/StrengthCount';
import { theme } from 'theme';

// Keep verticalAnchor and visibleTicksCount in props so they don't flow to text component
const CustomTick = ({ payload, verticalAnchor, visibleTicksCount, ...props }) => (
  <text {...props} className="bar-chart-tick" fill={theme.color.grey}>
    {payload.value}
  </text>
);

const CustomReferenceLabel = ({ count, date, viewBox }) => {
  const width = 92;
  const height = 52;

  return (
    <g
      transform={`translate(${viewBox.x - width / 2}, ${-height - 6})`}
      width={width}
      height={height}
    >
      <rect
        x={width / 2}
        y={height - 20}
        width={20}
        height={20}
        transform={`rotate(45, ${width / 2}, ${height - 20})`}
        fill={theme.color.white}
        strokeWidth={1}
        stroke={theme.color.green}
      />

      <rect
        width={width}
        height={height}
        rx="2"
        fill={theme.color.white}
        strokeWidth={1}
        stroke={theme.color.green}
      />

      <rect
        x={width / 2}
        y={height - 20}
        width={19}
        height={19}
        transform={`rotate(45, ${width / 2}, ${height - 20})`}
        fill={theme.color.white}
      />

      <text
        x={width / 2}
        y={24}
        textAnchor="middle"
        className="recharts-reference-count"
        fill={theme.color.black}
      >
        {count}
      </text>

      <text
        x={width / 2}
        y={41}
        textAnchor="middle"
        className="recharts-reference-date"
        fill={theme.color.grey}
      >
        {date}
      </text>
    </g>
  );
};

const ProgressChart = ({ focusedIndex, onFocusedIndexChange, ...props }) => {
  const { language, locale } = useSettingsState();
  const { strengths } = useStrengthState();
  const { fetchStrengths } = useStrengthActions();
  const { strengthCounts, latestCumulativeCounts } = useContext(SummaryContext);

  const { t } = useTranslation();

  const containerRef = useRef(undefined);
  const { width: containerWidth } = useDebouncedComponentSize(containerRef);

  useEffect(() => {
    if (strengths.length) return;
    fetchStrengths();
  }, [strengths, fetchStrengths]);

  const chartData = useMemo(
    () =>
      strengthCounts &&
      strengthCounts.map((count, index, array) => {
        const date = formatDate({ date: count.date, language, locale, localize: t });
        const tickDate =
          index === 0 || index === array.length - 1 || isFirstDayOfMonth(count.date)
            ? date
            : undefined;

        return {
          date,
          tickDate,
          referenceDate: formatDate({
            date: count.date,
            language,
            locale,
            localize: t,
            useAsTick: false,
          }),
          totalCount: Object.values(count.cumulative).reduce((a, b) => a + b, 0),
          ...count.cumulative,
        };
      }),
    [strengthCounts, locale]
  );

  const chartStrengths = useMemo(
    () =>
      latestCumulativeCounts &&
      strengths.length &&
      Object.entries(latestCumulativeCounts)
        .map(([slug, value]) => ({
          slug,
          name: strengths.find(s => s.slug === slug).name,
          value,
          color: strengths.find(s => s.slug === slug).color,
        }))
        .sort((a, b) => (a.value < b.value ? 1 : a.value > b.value ? -1 : 0)),
    [latestCumulativeCounts]
  );

  useEffect(() => {
    if (chartData && chartStrengths && focusedIndex === -1) {
      onFocusedIndexChange(chartData.length - 1);
    }
  }, [chartData, chartStrengths]);

  return chartData && chartStrengths ? (
    <Div refKey={containerRef} {...props}>
      <AreaChart
        width={containerWidth}
        height={Math.max(containerWidth / 3.75, 200)}
        data={chartData}
        margin={{ top: 0, right: 0, left: 0, bottom: 10 }}
        onMouseMove={props => {
          props && onFocusedIndexChange(props.activeTooltipIndex);
        }}
      >
        <CartesianGrid vertical={false} stroke={theme.color.lightGrey} />

        <XAxis
          dataKey="date"
          interval={'preserveStartEnd'}
          ticks={chartData.filter(({ tickDate }) => !!tickDate).map(({ tickDate }) => tickDate)}
          tickLine={false}
          axisLine={false}
          tick={<CustomTick dy={15} />}
        />

        <YAxis axisLine={false} tickLine={false} tick={<CustomTick />} />

        {chartStrengths.map(strength => (
          <Area
            key={strength.slug}
            dataKey={strength.slug}
            name={strength.name}
            type="basis"
            stackId="1"
            stroke="none"
            fill={strength.color}
            fillOpacity="1"
            isAnimationActive={false}
          />
        ))}

        {focusedIndex > -1 && (
          <ReferenceLine
            x={chartData[focusedIndex].date}
            stroke={theme.color.green}
            strokeWidth={1}
          >
            <Label
              content={<CustomReferenceLabel />}
              date={chartData[focusedIndex].referenceDate}
              count={chartData[focusedIndex].totalCount}
            />
          </ReferenceLine>
        )}
      </AreaChart>
    </Div>
  ) : null;
};

export default ProgressChart;
