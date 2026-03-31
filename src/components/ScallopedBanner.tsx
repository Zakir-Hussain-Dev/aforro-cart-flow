import React from 'react';
import { View, Text, StyleSheet, ViewStyle, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS, SPACING } from '../theme/constants';

interface ScallopedBannerProps {
  message: string;
  style?: ViewStyle;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * A component that renders a banner with a decorative scalloped (wavy) top edge.
 */
export const ScallopedBanner: React.FC<ScallopedBannerProps> = ({ message, style }) => {
  // Scallop pattern settings matching the Figma curves
  const scallopWidth = 36;
  const scallopHeight = 14;
  const numberOfScallops = Math.ceil(SCREEN_WIDTH / scallopWidth) + 1;

  // Create path for the scalloped top edge with smoother curves
  let d = `M 0 ${scallopHeight} `;
  for (let i = 0; i < numberOfScallops; i++) {
    const x = i * scallopWidth;
    // Quadratic Bézier curve for perfectly rounded scallops
    d += `Q ${x + scallopWidth / 2} -6, ${x + scallopWidth} ${scallopHeight} `;
  }
  // Complete the bottom part of the rectangle
  d += `V 120 H 0 Z`;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.svgContainer}>
        <Svg height={scallopHeight + 6} width={SCREEN_WIDTH} viewBox={`0 0 ${SCREEN_WIDTH} ${scallopHeight + 6}`}>
          <Path
            d={d}
            fill="#D6F4F4" // Exact Figma teal highlight
          />
        </Svg>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    // marginTop: -8, // Overlap slightly to avoid gaps
  },
  svgContainer: {
    height: 18,
    width: '100%',
  },
  content: {
    backgroundColor: '#D6F4F4',
    paddingBottom: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#0C748C',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
});
