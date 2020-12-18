import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { animated, useSpring, useSprings } from 'react-spring';
import styled from 'styled-components';
import { useStrengthState, useTranslation } from 'positive-store';

import Div from 'components/Div';
import Flex from 'components/Flex';
import Text from 'components/Text';
import StrengthCountCircle from 'routes/SeeTheGood/Summary/Progress/StrengthCounts/StrengthCountCircle';
import useDebouncedComponentSize from 'utils/useDebouncedComponentSize';
import { SummaryContext } from 'context/SummaryContext/SummaryContext';
import { useMobileBreakpoint } from 'utils/useBreakpoint';
import { spacing, theme } from 'theme';
import { hexToRgbaString } from 'utils/helpers';

const SPRING_CONFIG = { mass: 1, tension: 64, friction: 16 };

const getCircleSizes = ({ latestCumulativeCounts, sizes }) => {
  const { minFontSize, maxFontSize, minArea, maxArea } = sizes;

  const totalCounts = Object.values(latestCumulativeCounts || {}).sort((a, b) => (a > b ? -1 : 1));

  const countMin = Math.min(...totalCounts, 1);
  const countMax = Math.max(...totalCounts, 1);

  return Array.from({ length: countMax + 1 }, (_, index) => {
    if (index === 0) return { diameter: 0, fontSize: 0 };

    const scale = (index - countMin) / Math.max(countMax - countMin, 1);

    const area = scale * (maxArea - minArea) + minArea;
    const fontSize = scale * (maxFontSize - minFontSize) + minFontSize;
    const diameter = Math.sqrt(area / Math.PI) * 2;

    return { diameter, fontSize };
  });
};

const getMaxMaximizedCountRight = ({ focusedCounts }) =>
  focusedCounts
    .filter(({ status }) => status === 'maximized')
    .reduce((accumulator, current) => Math.max(accumulator, current.right), 0);

const getAvailableMargin = ({ focusedCounts, sizes }) => {
  const { containerWidth, minimizedContainerWidth } = sizes;
  const minimizedCounts = focusedCounts.filter(({ status }) => status === 'minimized');
  const maxMaximizedCountRight = getMaxMaximizedCountRight({ focusedCounts });

  return (
    containerWidth - (minimizedCounts.length ? minimizedContainerWidth : 0) - maxMaximizedCountRight
  );
};

const getContainerSpringProps = ({ focusedCounts, sizes }) => {
  const availableMargin = getAvailableMargin({ focusedCounts, sizes });

  return {
    transform: `translateX(${availableMargin / 2}px)`,
    from: { transform: 'translateX(0px)' },
    config: SPRING_CONFIG,
  };
};

const getSpringProps = ({ focusedCounts, sizes }) => index => {
  const { status, right, diameter, fontSize } = focusedCounts[index];

  return {
    containerHeight: `${sizes.maxDiameter}px`,
    fontSize: `${fontSize}em`,
    diameter: `${diameter}px`,
    opacity: status !== 'hidden' ? 1 : 0,
    transform: `translateX(${right - diameter}px)`,
    from: { containerHeight: '0px', diameter: '0px', opacity: 0, transform: 'translateX(0px)' },
    config: SPRING_CONFIG,
  };
};

const StrengthCounts = ({ focusedIndex, ...props }) => {
  const { stgStrengths } = useStrengthState();
  const { strengthCounts, latestCumulativeCounts } = useContext(SummaryContext);

  const containerRef = useRef(undefined);

  const { t } = useTranslation();

  const isMobileBreakpoint = useMobileBreakpoint();

  const { width: containerWidth } = useDebouncedComponentSize(containerRef);

  const sizes = useMemo(() => {
    const minDiameter = 32;
    const maxDiameter = Math.max(containerWidth / 8, 64);

    return {
      containerWidth,
      containerHeight: maxDiameter + 40,
      minDiameter: 32,
      maxDiameter,
      minArea: (Math.PI / 4) * Math.pow(minDiameter, 2),
      maxArea: (Math.PI / 4) * Math.pow(maxDiameter, 2),
      minFontSize: Math.max(containerWidth / 944, 1.25),
      maxFontSize: Math.max(containerWidth / 472, 1.75),
      minimizedDiameter: Math.max(containerWidth / 60, 14),
      minimizedContainerWidth: Math.max(containerWidth / 12, 60),
    };
  }, [containerWidth]);

  const circleSizes = useMemo(() => {
    return getCircleSizes({ latestCumulativeCounts, sizes });
  }, [latestCumulativeCounts, sizes]);

  const counts = useMemo(() => {
    const { containerWidth, maxDiameter, minimizedDiameter, minimizedContainerWidth } = sizes;

    const maxDisplayedCounts = Math.floor(containerWidth / maxDiameter);

    return (strengthCounts || []).map(({ cumulative }) => {
      return [
        ...Object.entries(latestCumulativeCounts)
          .map(([slug, value]) => ({ slug, value }))
          // Sort entries from largest to smallest based on the latest counts
          .sort((a, b) => (a.value > b.value ? -1 : a.value < b.value ? 1 : 0))
          // ...and give entries final index and value
          .map(({ slug }, index) => ({ index, slug, value: cumulative[slug] || 0 }))
          // Sort entries from largest to smallest based on cumulatives of the day
          .sort((a, b) => (a.value > b.value ? -1 : a.value < b.value ? 1 : 0))
          // ...to set status based on value and maxDisplayedCounts
          .map((current, index) => ({
            ...current,
            status:
              maxDisplayedCounts && current.value > 0
                ? index < maxDisplayedCounts
                  ? 'maximized'
                  : 'minimized'
                : 'hidden',
          }))
          // ...and prevent having only one minimized count
          .map((current, index, array) => ({
            ...current,
            status:
              current.status !== 'minimized' ||
              array.filter(({ status }) => status === 'minimized').length > 1
                ? current.status
                : 'maximized',
          }))
          // ...and give entries strength and size info and z-index
          .map((current, index) => {
            const selectedStrength = stgStrengths.find(s => s.slug === current.slug);
            if (!selectedStrength) return;

            const { name, color } = selectedStrength;
            const { diameter, fontSize } = circleSizes[current.value];

            return (
              name &&
              color && {
                ...current,
                name,
                color,
                diameter: { maximized: diameter, minimized: minimizedDiameter, hidden: 0 }[
                  current.status
                ],
                fontSize,
                zIndex: index,
              }
            );
          })
          // Accumulate the total width of the circles
          .reduce(
            (accumulator, current, index) => [
              ...accumulator,
              {
                ...current,
                right:
                  (index ? accumulator[index - 1].right : 0) +
                  (current && current.status === 'maximized' ? current.diameter : 0),
              },
            ],
            []
          )
          // Distribute circles based on total width and available container width
          .reduce((accumulator, current, index, array) => {
            const maximizedCounts = array.filter(({ status }) => status === 'maximized');
            const availableMargin = getAvailableMargin({ focusedCounts: array, sizes });
            const margin = maximizedCounts.length
              ? availableMargin / (maximizedCounts.length * 2)
              : 0;
            const previousRight = index ? accumulator[index - 1].right : 0;
            const currentRight =
              current.status === 'maximized'
                ? previousRight + (index ? margin * 2 : 0) + current.diameter
                : previousRight;

            return [
              ...accumulator,
              {
                ...current,
                right: currentRight,
                margin,
              },
            ];
          }, [])
          // Distribute minimized circles
          .reduce((accumulator, current, index, array) => {
            if (current.status !== 'minimized') {
              return [...accumulator, { ...current }];
            }

            const minimizedCounts = array.filter(({ status }) => status === 'minimized');
            const minimizedCountsWidth = Math.min(
              (minimizedCounts.length * minimizedDiameter) / 2,
              minimizedContainerWidth
            );
            const containerOffset = (minimizedContainerWidth - minimizedCountsWidth) / 2;
            const countOffsetPercent = minimizedCounts.indexOf(current) / minimizedCounts.length;
            const countOffset = countOffsetPercent * minimizedCountsWidth;
            const maxMaximizedCountRight = getMaxMaximizedCountRight({ focusedCounts: array });
            const currentRight =
              maxMaximizedCountRight +
              current.margin +
              containerOffset +
              countOffset +
              minimizedDiameter;

            return [
              ...accumulator,
              {
                ...current,
                right: currentRight,
              },
            ];
          }, [])
          // Sort entries back based on the final index given earlier
          .sort((a, b) => (a.index < b.index ? -1 : 1)),
      ];
    });
  }, [stgStrengths, strengthCounts, latestCumulativeCounts, circleSizes, sizes]);

  const focusedCounts = useMemo(() => {
    return (counts && counts[focusedIndex]) || [];
  }, [counts, focusedIndex]);

  const minimizedCounts = useMemo(() => {
    return focusedCounts.filter(({ status }) => status === 'minimized');
  }, [focusedCounts]);

  const [containerSpring, setContainerSpring] = useSpring(() =>
    getContainerSpringProps({ focusedCounts, sizes })
  );

  const [springs, setSprings] = useSprings(
    focusedCounts.length,
    getSpringProps({ focusedCounts, sizes })
  );

  // const minimizedLabelSpring = useSpring({
  //   opacity: minimizedCounts.length > 1 ? 1 : 0,
  //   config: SPRING_CONFIG,
  // });

  useEffect(() => {
    setContainerSpring(getContainerSpringProps({ focusedCounts, sizes }));
  }, [focusedCounts]);

  useEffect(() => {
    setSprings(getSpringProps({ focusedCounts, sizes }));
  }, [focusedCounts]);

  return (
    <Div refKey={containerRef} relative {...props}>
      <animated.div
        style={{
          ...containerSpring,
          height: `${sizes.containerHeight}px`,
          willChange: 'transform',
        }}
      >
        {springs.map((springProps, index) => {
          return (
            <StrengthCountCircle
              key={focusedCounts[index].slug}
              data={focusedCounts[index]}
              springProps={springProps}
            />
          );
        })}
      </animated.div>

      {minimizedCounts.length > 1 && !isMobileBreakpoint && (
        <Flex absolute bottom="0" right="0" width={`${sizes.minimizedContainerWidth}px`} center>
          <OthersText forwardedAs="p" size="sm">
            {t('route.see_the_good.plus_others', {
              num: minimizedCounts.reduce((accumulator, current) => accumulator + current.value, 0),
            })}
          </OthersText>
        </Flex>
      )}
    </Div>
  );
};

const OthersText = styled(Text)`
  background: ${hexToRgbaString(theme.color.white, 0.9)};
  padding: 0 ${spacing('sm')};
  white-space: nowrap;
`;

export default StrengthCounts;
