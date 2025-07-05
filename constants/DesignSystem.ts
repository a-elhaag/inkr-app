/**
 * Inkr Design System
 * Inspired by Apple's iOS glass widgets with light mode as default
 */

// Base scaling factor for responsive design
const BASE_SCALE = 1;

// Scaling functions
export const scale = (size: number): number => size * BASE_SCALE;
export const moderateScale = (size: number, factor = 0.5): number => 
  size + (scale(size) - size) * factor;

// Color Palette
export const Colors = {
  // Primary Colors
  primary: {
    blue: '#1A73E8',        // Blue Modern
    orange: '#FF4500',      // Shadow Orange (for glows only)
  },
  
  // Background Colors
  background: {
    primary: '#F5F5F5',     // Cloud White
    secondary: '#FFFFFF',   // Pure White
    glass: 'rgba(255, 255, 255, 0.85)', // Glass overlay
    glassSecondary: 'rgba(255, 255, 255, 0.65)',
  },
  
  // Text Colors
  text: {
    primary: '#2C2E33',     // Deep Gray
    secondary: '#737373',   // Neutral Gray
    muted: '#B0B7C3',       // Mist Gray
    white: '#FFFFFF',
  },
  
  // System Colors
  system: {
    border: '#B0B7C3',      // Mist Gray
    divider: 'rgba(176, 183, 195, 0.3)',
    shadow: 'rgba(0, 0, 0, 0.08)',
    shadowDeep: 'rgba(0, 0, 0, 0.15)',
    orangeGlow: 'rgba(255, 69, 0, 0.2)',
  },
  
  // Theme variants
  light: {
    background: '#F5F5F5',
    surface: 'rgba(255, 255, 255, 0.85)',
    text: '#2C2E33',
    textSecondary: '#737373',
  },
  
  dark: {
    background: '#1C1C1E',
    surface: 'rgba(28, 28, 30, 0.85)',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
  }
} as const;

// Spacing Scale (based on 4px grid)
export const Spacing = {
  xs: scale(4),      // 4px
  sm: scale(8),      // 8px
  md: scale(12),     // 12px
  lg: scale(16),     // 16px
  xl: scale(20),     // 20px
  xxl: scale(24),    // 24px
  xxxl: scale(32),   // 32px
  
  // Padding variants
  padding: {
    xs: scale(4),
    sm: scale(8),
    md: scale(12),
    lg: scale(16),
    xl: scale(20),
    xxl: scale(24),
    xxxl: scale(32),
  },
  
  // Margin variants
  margin: {
    xs: scale(4),
    sm: scale(8),
    md: scale(12),
    lg: scale(16),
    xl: scale(20),
    xxl: scale(24),
    xxxl: scale(32),
  }
} as const;

// Border Radius Scale
export const BorderRadius = {
  xs: scale(4),      // 4px
  sm: scale(8),      // 8px
  md: scale(12),     // 12px
  lg: scale(16),     // 16px
  xl: scale(20),     // 20px
  xxl: scale(24),    // 24px
  pill: scale(50),   // Pill shape
  circle: scale(999), // Perfect circle
  
  // Glass component specific
  glass: {
    card: scale(16),
    button: scale(12),
    input: scale(14),
    widget: scale(20),
  }
} as const;

// Typography Scale
export const Typography = {
  size: {
    xs: moderateScale(10),    // 10px
    sm: moderateScale(12),    // 12px
    md: moderateScale(14),    // 14px
    lg: moderateScale(16),    // 16px
    xl: moderateScale(18),    // 18px
    xxl: moderateScale(20),   // 20px
    xxxl: moderateScale(24),  // 24px
    title: moderateScale(28), // 28px
    hero: moderateScale(34),  // 34px
  },
  
  weight: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  }
} as const;

// Shadow Presets
export const Shadows = {
  // Light shadows for glass elements
  glass: {
    light: {
      shadowColor: Colors.system.shadow,
      shadowOffset: { width: 0, height: scale(2) },
      shadowOpacity: 0.08,
      shadowRadius: scale(8),
      elevation: 2,
    },
    medium: {
      shadowColor: Colors.system.shadow,
      shadowOffset: { width: 0, height: scale(4) },
      shadowOpacity: 0.12,
      shadowRadius: scale(12),
      elevation: 4,
    },
    deep: {
      shadowColor: Colors.system.shadowDeep,
      shadowOffset: { width: 0, height: scale(8) },
      shadowOpacity: 0.15,
      shadowRadius: scale(16),
      elevation: 8,
    }
  },
  
  // Orange glow for accent elements
  orangeGlow: {
    shadowColor: Colors.primary.orange,
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.3,
    shadowRadius: scale(12),
    elevation: 6,
  },
  
  // Button shadows
  button: {
    shadowColor: Colors.system.shadow,
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(6),
    elevation: 3,
  }
} as const;

// Animation Durations
export const AnimationDuration = {
  fast: 150,
  normal: 250,
  slow: 350,
  verySlow: 500,
} as const;

// Haptic Feedback Types
export const HapticTypes = {
  light: 'light' as const,
  medium: 'medium' as const,
  heavy: 'heavy' as const,
  selection: 'selection' as const,
  impactLight: 'impactLight' as const,
  impactMedium: 'impactMedium' as const,
  impactHeavy: 'impactHeavy' as const,
} as const;

// Blur Intensities
export const BlurIntensity = {
  light: 10,
  medium: 20,
  heavy: 40,
  extraHeavy: 60,
} as const;

// Component Dimensions
export const Dimensions = {
  // Navigation
  tabBar: {
    height: scale(80),
    borderRadius: BorderRadius.xxl,
    margin: Spacing.lg,
  },
  
  // Buttons
  button: {
    height: {
      sm: scale(36),
      md: scale(44),
      lg: scale(52),
    },
    minWidth: scale(120),
  },
  
  // Input fields
  input: {
    height: scale(48),
    borderRadius: BorderRadius.glass.input,
  },
  
  // Cards
  card: {
    minHeight: scale(120),
    borderRadius: BorderRadius.glass.card,
    padding: Spacing.lg,
  },
  
  // Floating action button
  fab: {
    size: scale(56),
    borderRadius: BorderRadius.circle,
  }
} as const;

// Layout Constants
export const Layout = {
  screen: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  
  container: {
    maxWidth: scale(400),
    padding: Spacing.lg,
  },
  
  section: {
    marginBottom: Spacing.xxl,
  }
} as const;

// Export default theme
export const Theme = {
  colors: Colors.light,
  spacing: Spacing,
  typography: Typography,
  borderRadius: BorderRadius,
  shadows: Shadows,
  dimensions: Dimensions,
  layout: Layout,
  animation: AnimationDuration,
  haptic: HapticTypes,
  blur: BlurIntensity,
} as const;

export type ThemeType = typeof Theme;
