import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import { BorderRadius, Colors, Shadows, Spacing, Theme, Typography } from '../../constants/DesignSystem';

// Glass Card Component
interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  onPress?: () => void;
  animated?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  intensity = Theme.blur.medium,
  onPress,
  animated = true,
}) => {
  const handlePress = () => {
    if (onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  };

  const CardContent = animated ? (
    <MotiView
      from={{ scale: 1, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'timing' as const,
        duration: Theme.animation.normal,
      }}
      style={[styles.glassCard, style]}
    >
      <BlurView intensity={intensity} style={styles.blurContainer}>
        {children}
      </BlurView>
    </MotiView>
  ) : (
    <View style={[styles.glassCard, style]}>
      <BlurView intensity={intensity} style={styles.blurContainer}>
        {children}
      </BlurView>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        {CardContent}
      </TouchableOpacity>
    );
  }

  return CardContent;
};

// Glass Button Component
interface GlassButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  withOrangeGlow?: boolean;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  style,
  textStyle,
  disabled = false,
  withOrangeGlow = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    if (!disabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onPress();
    }
  };

  const getButtonStyle = (): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [styles.glassButton];
    
    // Size styles
    if (size === 'sm') baseStyles.push(styles.buttonSm);
    if (size === 'md') baseStyles.push(styles.buttonMd);
    if (size === 'lg') baseStyles.push(styles.buttonLg);
    
    // Variant styles
    if (variant === 'primary') baseStyles.push(styles.buttonPrimary);
    if (variant === 'secondary') baseStyles.push(styles.buttonSecondary);
    if (variant === 'ghost') baseStyles.push(styles.buttonGhost);
    
    // Additional styles
    if (withOrangeGlow) baseStyles.push(styles.buttonOrangeGlow);
    if (disabled) baseStyles.push(styles.buttonDisabled);
    if (style) baseStyles.push(style);
    
    return baseStyles;
  };

  const getTextStyle = (): TextStyle[] => {
    const baseStyles: TextStyle[] = [styles.buttonText];
    
    // Size styles
    if (size === 'sm') baseStyles.push(styles.buttonTextSm);
    if (size === 'md') baseStyles.push(styles.buttonTextMd);
    if (size === 'lg') baseStyles.push(styles.buttonTextLg);
    
    // Variant styles
    if (variant === 'primary') baseStyles.push(styles.buttonTextPrimary);
    if (variant === 'secondary') baseStyles.push(styles.buttonTextSecondary);
    if (variant === 'ghost') baseStyles.push(styles.buttonTextGhost);
    
    // Additional styles
    if (disabled) baseStyles.push(styles.buttonTextDisabled);
    if (textStyle) baseStyles.push(textStyle);
    
    return baseStyles;
  };

  return (
    <MotiView
      from={{ scale: 1 }}
      animate={{ scale: isPressed ? 0.96 : 1 }}
      transition={{ type: 'timing' as const, duration: 150 }}
    >
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        disabled={disabled}
        style={getButtonStyle()}
        activeOpacity={0.8}
      >
        <BlurView intensity={Theme.blur.light} style={styles.buttonBlur}>
          <Text style={getTextStyle()}>{title}</Text>
        </BlurView>
      </TouchableOpacity>
    </MotiView>
  );
};

// Floating Action Button
interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: React.ReactNode;
  style?: ViewStyle;
  withOrangeGlow?: boolean;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon,
  style,
  withOrangeGlow = true,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onPress();
  };

  const getFabStyle = (): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [styles.fab];
    if (withOrangeGlow) baseStyles.push(styles.fabOrangeGlow);
    if (style) baseStyles.push(style);
    return baseStyles;
  };

  return (
    <MotiView
      from={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: isPressed ? 0.9 : 1, 
        opacity: 1 
      }}
      transition={{ type: 'spring' as const, damping: 15, stiffness: 150 }}
      style={getFabStyle()}
    >
      <TouchableOpacity 
        onPress={handlePress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        style={styles.fabTouchable}
      >
        <BlurView intensity={Theme.blur.medium} style={styles.fabBlur}>
          {icon || <Text style={styles.fabIcon}>+</Text>}
        </BlurView>
      </TouchableOpacity>
    </MotiView>
  );
};

// Glass Input Component
interface GlassInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  style?: ViewStyle;
  multiline?: boolean;
  numberOfLines?: number;
}

export const GlassInput: React.FC<GlassInputProps> = ({
  placeholder,
  value,
  onChangeText,
  style,
  multiline = false,
  numberOfLines = 1,
}) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: Theme.animation.normal }}
      style={[styles.inputContainer, style]}
    >
      <BlurView intensity={Theme.blur.light} style={styles.inputBlur}>
        <View style={styles.inputWrapper}>
          {/* This is a placeholder for TextInput - you'll need to import TextInput */}
          <Text style={styles.inputPlaceholder}>{placeholder}</Text>
        </View>
      </BlurView>
    </MotiView>
  );
};

// Glass Navigation Bar
interface GlassTabBarProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const GlassTabBar: React.FC<GlassTabBarProps> = ({ children, style }) => {
  return (
    <MotiView
      from={{ translateY: 100, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      style={[styles.tabBar, style]}
    >
      <BlurView intensity={Theme.blur.heavy} style={styles.tabBarBlur}>
        {children}
      </BlurView>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  // Glass Card Styles
  glassCard: {
    borderRadius: BorderRadius.glass.card,
    overflow: 'hidden',
    backgroundColor: Colors.background.glass,
    ...Shadows.glass.medium,
  },
  blurContainer: {
    flex: 1,
    padding: Spacing.lg,
  },

  // Glass Button Styles
  glassButton: {
    borderRadius: BorderRadius.glass.button,
    overflow: 'hidden',
    backgroundColor: Colors.background.glass,
    ...Shadows.button,
  },
  buttonBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSm: {
    height: Theme.dimensions.button.height.sm,
    minWidth: Theme.dimensions.button.minWidth * 0.8,
  },
  buttonMd: {
    height: Theme.dimensions.button.height.md,
    minWidth: Theme.dimensions.button.minWidth,
  },
  buttonLg: {
    height: Theme.dimensions.button.height.lg,
    minWidth: Theme.dimensions.button.minWidth * 1.2,
  },
  buttonPrimary: {
    backgroundColor: Colors.background.glass,
  },
  buttonSecondary: {
    backgroundColor: Colors.background.glassSecondary,
  },
  buttonGhost: {
    backgroundColor: 'transparent',
    ...Shadows.glass.light,
  },
  buttonOrangeGlow: {
    ...Shadows.orangeGlow,
  },
  buttonDisabled: {
    opacity: 0.5,
  },

  // Button Text Styles
  buttonText: {
    fontWeight: Typography.weight.medium,
    textAlign: 'center',
  },
  buttonTextSm: {
    fontSize: Typography.size.sm,
  },
  buttonTextMd: {
    fontSize: Typography.size.md,
  },
  buttonTextLg: {
    fontSize: Typography.size.lg,
  },
  buttonTextPrimary: {
    color: Colors.primary.blue,
  },
  buttonTextSecondary: {
    color: Colors.text.primary,
  },
  buttonTextGhost: {
    color: Colors.text.secondary,
  },
  buttonTextDisabled: {
    color: Colors.text.muted,
  },

  // Floating Action Button Styles
  fab: {
    width: Theme.dimensions.fab.size,
    height: Theme.dimensions.fab.size,
    borderRadius: Theme.dimensions.fab.borderRadius,
    position: 'absolute',
    bottom: Spacing.xxxl,
    right: Spacing.lg,
    ...Shadows.glass.deep,
  },
  fabOrangeGlow: {
    ...Shadows.orangeGlow,
  },
  fabTouchable: {
    width: '100%',
    height: '100%',
    borderRadius: Theme.dimensions.fab.borderRadius,
    overflow: 'hidden',
  },
  fabBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background.glass,
  },
  fabIcon: {
    fontSize: Typography.size.xxl,
    fontWeight: Typography.weight.light,
    color: Colors.primary.blue,
  },

  // Input Styles
  inputContainer: {
    borderRadius: BorderRadius.glass.input,
    overflow: 'hidden',
    backgroundColor: Colors.background.glass,
    ...Shadows.glass.light,
  },
  inputBlur: {
    flex: 1,
  },
  inputWrapper: {
    padding: Spacing.md,
    minHeight: Theme.dimensions.input.height,
    justifyContent: 'center',
  },
  inputPlaceholder: {
    fontSize: Typography.size.md,
    color: Colors.text.muted,
  },

  // Tab Bar Styles
  tabBar: {
    position: 'absolute',
    bottom: Spacing.lg,
    left: Spacing.lg,
    right: Spacing.lg,
    height: Theme.dimensions.tabBar.height,
    borderRadius: Theme.dimensions.tabBar.borderRadius,
    overflow: 'hidden',
    backgroundColor: Colors.background.glass,
    ...Shadows.glass.deep,
  },
  tabBarBlur: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.lg,
  },
});
