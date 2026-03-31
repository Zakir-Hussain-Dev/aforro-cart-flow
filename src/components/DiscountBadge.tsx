import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../theme/constants';

interface DiscountBadgeProps {
  percentage: number;
  containerStyle?: any;
}

export const DiscountBadge: React.FC<DiscountBadgeProps> = ({ percentage, containerStyle }) => {
  const width = 45;
  const height = 55;
  const zigzagHeight = 8;
  const borderRadius = 12;

  // SVG Path for:
  // 1. Move to (borderRadius, 0)
  // 2. Line to (width, 0)
  // 3. Line to (width, height - zigzagHeight)
  // 4. Zigzag bottom:
  //    - Line to (width - width/3, height)
  //    - Line to (width - 2*width/3, height - zigzagHeight)
  //    - Line to (0, height)
  // 5. Line to (0, borderRadius)
  // 6. Arc to (borderRadius, 0)

  const d = `
    M ${borderRadius} 0 
    H ${width} 
    V ${height - zigzagHeight} 
    L ${width - (width / 4)} ${height} 
    L ${width - (2 * width / 4)} ${height - zigzagHeight} 
    L ${width - (3 * width / 4)} ${height} 
    L 0 ${height - zigzagHeight} 
    V ${borderRadius} 
    Q 0 0 ${borderRadius} 0 
    Z
  `;

  return (
    <View style={[styles.container, containerStyle]}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Path d={d} fill={COLORS.navTeal} />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.percentageText}>{percentage}%</Text>
        <Text style={styles.offText}>OFF</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    top: 6,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 16,
  },
  offText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 14,
  },
});
