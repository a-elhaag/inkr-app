import * as Haptics from 'expo-haptics';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    View,
} from 'react-native';

import { GlassCard } from '@/components/glass/GlassComponents';
import { Colors, Spacing, Theme, Typography } from '@/constants/DesignSystem';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  type: 'toggle' | 'button' | 'info';
  value?: boolean;
  action?: () => void;
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => console.log('Logged out') },
      ]
    );
  };

  const handleExportData = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log('Export data');
  };

  const handleDeleteAllData = () => {
    Alert.alert(
      'Delete All Data',
      'This action cannot be undone. All your notes and memories will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete All', 
          style: 'destructive', 
          onPress: () => console.log('All data deleted') 
        },
      ]
    );
  };

  const settingSections = [
    {
      title: 'Preferences',
      items: [
        {
          id: 'notifications',
          title: 'Notifications',
          subtitle: 'Receive reminders and updates',
          type: 'toggle' as const,
          value: notifications,
          action: () => setNotifications(!notifications),
        },
        {
          id: 'darkMode',
          title: 'Dark Mode',
          subtitle: 'Use dark theme (coming soon)',
          type: 'toggle' as const,
          value: darkMode,
          action: () => setDarkMode(!darkMode),
        },
        {
          id: 'haptic',
          title: 'Haptic Feedback',
          subtitle: 'Feel vibrations for interactions',
          type: 'toggle' as const,
          value: hapticFeedback,
          action: () => setHapticFeedback(!hapticFeedback),
        },
      ],
    },
    {
      title: 'Sync & Backup',
      items: [
        {
          id: 'autoSync',
          title: 'Auto Sync',
          subtitle: 'Automatically sync across devices',
          type: 'toggle' as const,
          value: autoSync,
          action: () => setAutoSync(!autoSync),
        },
        {
          id: 'export',
          title: 'Export Data',
          subtitle: 'Download your notes and memories',
          type: 'button' as const,
          action: handleExportData,
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          id: 'profile',
          title: 'Profile',
          subtitle: 'user@example.com',
          type: 'info' as const,
        },
        {
          id: 'storage',
          title: 'Storage Used',
          subtitle: '2.3 MB of 1 GB',
          type: 'info' as const,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help & FAQ',
          type: 'button' as const,
          action: () => console.log('Help pressed'),
        },
        {
          id: 'feedback',
          title: 'Send Feedback',
          type: 'button' as const,
          action: () => console.log('Feedback pressed'),
        },
        {
          id: 'privacy',
          title: 'Privacy Policy',
          type: 'button' as const,
          action: () => console.log('Privacy pressed'),
        },
      ],
    },
    {
      title: 'Danger Zone',
      items: [
        {
          id: 'logout',
          title: 'Sign Out',
          type: 'button' as const,
          action: handleLogout,
        },
        {
          id: 'delete',
          title: 'Delete All Data',
          subtitle: 'Permanently remove all notes and memories',
          type: 'button' as const,
          action: handleDeleteAllData,
        },
      ],
    },
  ];

  const renderSettingItem = (item: SettingItem, sectionIndex: number, itemIndex: number) => {
    const isDangerZone = sectionIndex === settingSections.length - 1;
    
    const itemStyle = isDangerZone ? 
      { ...styles.settingItem, ...styles.dangerItem } : 
      styles.settingItem;
    
    return (
      <MotiView
        key={item.id}
        from={{ opacity: 0, translateX: 50 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 100,
          delay: 300 + (sectionIndex * 200) + (itemIndex * 100),
        }}
        style={styles.settingItemContainer}
      >
        <GlassCard
          onPress={item.type === 'button' ? item.action : undefined}
          style={itemStyle}
        >
          <View style={styles.settingContent}>
            <View style={styles.settingTextContainer}>
              <Text style={[
                styles.settingTitle,
                isDangerZone && styles.dangerText,
              ]}>
                {item.title}
              </Text>
              {item.subtitle && (
                <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
              )}
            </View>
            {item.type === 'toggle' && (
              <Switch
                value={item.value}
                onValueChange={() => {
                  if (hapticFeedback) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                  item.action?.();
                }}
                trackColor={{ 
                  false: Colors.text.muted, 
                  true: Colors.primary.blue + '40' 
                }}
                thumbColor={item.value ? Colors.primary.blue : Colors.background.secondary}
              />
            )}
            {item.type === 'button' && (
              <Text style={styles.chevron}>›</Text>
            )}
          </View>
        </GlassCard>
      </MotiView>
    );
  };

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
          <Text style={styles.headerSubtitle}>Customize your Inkr experience</Text>
        </MotiView>

        {/* Profile Card */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 100, delay: 200 }}
          style={styles.profileSection}
        >
          <GlassCard style={styles.profileCard}>
            <View style={styles.profileContent}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>A</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Anonymous User</Text>
                <Text style={styles.profileEmail}>Using Inkr since Jan 2024</Text>
              </View>
            </View>
          </GlassCard>
        </MotiView>

        {/* Settings Sections */}
        <ScrollView 
          style={styles.settingsContainer}
          contentContainerStyle={styles.settingsContent}
          showsVerticalScrollIndicator={false}
        >
          {settingSections.map((section, sectionIndex) => (
            <View key={section.title} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.items.map((item, itemIndex) => 
                renderSettingItem(item, sectionIndex, itemIndex)
              )}
            </View>
          ))}

          {/* App Version */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 500, delay: 2000 }}
            style={styles.versionContainer}
          >
            <Text style={styles.versionText}>Inkr v1.0.0</Text>
          </MotiView>

          {/* Bottom spacing for tab bar */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
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
  profileSection: {
    padding: Theme.layout.screen.paddingHorizontal,
    paddingVertical: Spacing.lg,
  },
  profileCard: {
    padding: Spacing.lg,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: Typography.size.xxl,
    fontWeight: Typography.weight.bold,
    color: Colors.text.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  profileEmail: {
    fontSize: Typography.size.md,
    color: Colors.text.secondary,
  },
  settingsContainer: {
    flex: 1,
    paddingHorizontal: Theme.layout.screen.paddingHorizontal,
  },
  settingsContent: {
    gap: Spacing.xxl,
  },
  section: {
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.semibold,
    color: Colors.text.primary,
    marginLeft: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  settingItemContainer: {
    marginBottom: Spacing.sm,
  },
  settingItem: {
    padding: Spacing.lg,
  },
  dangerItem: {
    backgroundColor: Colors.primary.orange + '10',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingTextContainer: {
    flex: 1,
    marginRight: Spacing.md,
  },
  settingTitle: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.medium,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  dangerText: {
    color: Colors.primary.orange,
  },
  settingSubtitle: {
    fontSize: Typography.size.sm,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.normal * Typography.size.sm,
  },
  chevron: {
    fontSize: Typography.size.xl,
    color: Colors.text.muted,
    fontWeight: Typography.weight.light,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  versionText: {
    fontSize: Typography.size.sm,
    color: Colors.text.muted,
  },
  bottomSpacing: {
    height: 120, // Space for tab bar
  },
});
