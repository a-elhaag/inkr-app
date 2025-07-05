import { MotiView } from 'moti';
import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { GlassCard } from '@/components/glass/GlassComponents';
import { Colors, Spacing, Theme, Typography } from '@/constants/DesignSystem';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Background */}
      <View style={styles.background} />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Coming Soon</Text>
        </MotiView>

        {/* Content */}
        <View style={styles.content}>
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 100, delay: 300 }}
          >
            <GlassCard style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>Customize Your Experience</Text>
              <Text style={styles.emptySubtitle}>
                Settings and preferences will be available here soon. We're working on making Inkr fully customizable.
              </Text>
            </GlassCard>
          </MotiView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.background.primary,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: Theme.layout.screen.paddingHorizontal,
    paddingTop: Spacing.lg,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: Typography.size.hero,
    fontWeight: Typography.weight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: Typography.size.md,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: Theme.layout.screen.paddingHorizontal,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyTitle: {
    fontSize: Typography.size.xxl,
    fontWeight: Typography.weight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: Typography.size.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.relaxed * Typography.size.md,
  },
});
