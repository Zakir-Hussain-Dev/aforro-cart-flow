import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Info, AlertCircle, Sparkles } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme/constants';

type BannerVariant = 'info' | 'warning' | 'error' | 'success';

interface InfoBannerProps {
  message: string;
  variant?: BannerVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const InfoBanner: React.FC<InfoBannerProps> = ({
  message,
  variant = 'info',
  style,
  textStyle,
  icon,
}) => {
  const getStyles = () => {
    switch (variant) {
      case 'warning':
        return {
          container: styles.warningContainer,
          text: styles.warningText,
          icon: <AlertCircle size={18} color={COLORS.warningYellowText} />
        };
      case 'error':
        return {
          container: styles.errorContainer,
          text: styles.errorText,
          icon: <AlertCircle size={18} color={COLORS.error} />
        };
      case 'success':
        return {
          container: styles.successContainer,
          text: styles.successText,
          icon: <Sparkles size={18} color={COLORS.primary} />
        };
      case 'info':
      default:
        return {
          container: styles.infoContainer,
          text: styles.infoText,
          icon: <Sparkles size={18} color={COLORS.infoBlueText} />
        };
    }
  };

  const currentStyles = getStyles();

  return (
    <View style={[styles.container, currentStyles.container, style]}>
      {/* <View style={styles.iconArea}>
        {icon || currentStyles.icon}
      </View> */}
      <Text style={[styles.text, currentStyles.text, textStyle]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 4,
    alignSelf: 'center',
  },
  iconArea: {
    marginRight: SPACING.sm,
  },
  text: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.semiBold as any,
    flex: 1,
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: COLORS.infoBlue,
  },
  infoText: {
    color: COLORS.infoBlueText,
  },
  warningContainer: {
    backgroundColor: COLORS.warningYellow,
    borderWidth: 1,
    borderColor: '#FFEEBA', // Slightly darker yellow
  },
  warningText: {
    color: COLORS.warningYellowText,
  },
  errorContainer: {
    backgroundColor: COLORS.promoRed,
    borderWidth: 1,
    borderColor: '#F5C6CB',
  },
  errorText: {
    color: COLORS.error,
  },
  successContainer: {
    backgroundColor: COLORS.lightGreen,
  },
  successText: {
    color: COLORS.primary,
  },
});
