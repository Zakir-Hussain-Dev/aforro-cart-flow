import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../theme/constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const getButtonStyle = () => {
    const baseStyle = styles.button;
    const typeStyle = styles[type];
    const sizeStyle = styles[size];
    return [baseStyle, typeStyle, sizeStyle, disabled && styles.disabled, style];
  };

  const getTextStyle = () => {
    const baseStyle = styles.text;
    const typeTextStyle = styles[`${type}Text` as keyof typeof styles];
    const sizeTextStyle = styles[`${size}Text` as keyof typeof styles];
    return [baseStyle, typeTextStyle, sizeTextStyle, disabled && styles.disabledText, textStyle];
  };

  return (
    <TouchableOpacity
      style={getButtonStyle() as any}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={type === 'outline' || type === 'ghost' ? COLORS.primary : COLORS.white} />
      ) : (
        <>
          {icon}
          <Text style={getTextStyle() as any}>{title}</Text>
        </>
      ) }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.md,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  sm: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
  },
  md: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  lg: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  disabled: {
    backgroundColor: COLORS.border,
    borderColor: COLORS.border,
  },
  text: {
    fontWeight: TYPOGRAPHY.weight.semiBold as any,
    textAlign: 'center',
  },
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.text,
  },
  outlineText: {
    color: COLORS.primary,
  },
  ghostText: {
    color: COLORS.primary,
  },
  smText: {
    fontSize: TYPOGRAPHY.size.sm,
  },
  mdText: {
    fontSize: TYPOGRAPHY.size.md,
  },
  lgText: {
    fontSize: TYPOGRAPHY.size.lg,
  },
  disabledText: {
    color: COLORS.textTertiary,
  },
});
