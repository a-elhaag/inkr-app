import * as Haptics from 'expo-haptics';
import { MotiView } from 'moti';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { FloatingActionButton, GlassButton, GlassCard } from '@/components/glass/GlassComponents';
import { Colors, Spacing, Theme, Typography } from '@/constants/DesignSystem';

export default function HomeDashboard() {
  const handleNewNote = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Navigation logic will go here
    console.log('New note pressed');
  };

  const handleNotePress = (noteId: string) => {
    Haptics.selectionAsync();
    console.log('Note pressed:', noteId);
  };

  // Sample note data
  const recentNotes = [
    { id: '1', title: 'Morning Thoughts', preview: 'Today feels like a good day to...', time: '2 hours ago' },
    { id: '2', title: 'Meeting Notes', preview: 'Key points from today\'s discussion...', time: '5 hours ago' },
    { id: '3', title: 'Inspiration', preview: 'Sometimes the best ideas come when...', time: '1 day ago' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Background */}
      <View style={styles.background} />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Welcome Header */}
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600, delay: 200 }}
            style={styles.headerSection}
          >
            <GlassCard style={styles.welcomeCard}>
              <Text style={styles.welcomeTitle}>Good Morning</Text>
              <Text style={styles.welcomeSubtitle}>Ready to capture your thoughts?</Text>
            </GlassCard>
          </MotiView>

          {/* Quick Actions */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600, delay: 400 }}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionButtons}>
              <GlassButton
                title="New Note"
                onPress={handleNewNote}
                variant="primary"
                withOrangeGlow
                style={styles.actionButton}
              />
              <GlassButton
                title="Voice Memo"
                onPress={() => console.log('Voice memo')}
                variant="secondary"
                style={styles.actionButton}
              />
            </View>
          </MotiView>

          {/* Recent Notes */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600, delay: 600 }}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>Recent Notes</Text>
            {recentNotes.map((note, index) => (
              <MotiView
                key={note.id}
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  type: 'spring', 
                  damping: 15, 
                  stiffness: 100,
                  delay: 700 + (index * 100)
                }}
                style={styles.noteCardContainer}
              >
                <GlassCard
                  onPress={() => handleNotePress(note.id)}
                  style={styles.noteCard}
                >
                  <View style={styles.noteContent}>
                    <Text style={styles.noteTitle}>{note.title}</Text>
                    <Text style={styles.notePreview}>{note.preview}</Text>
                    <Text style={styles.noteTime}>{note.time}</Text>
                  </View>
                </GlassCard>
              </MotiView>
            ))}
          </MotiView>

          {/* Stats Overview */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600, delay: 1000 }}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>Today's Progress</Text>
            <GlassCard style={styles.statsCard}>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>3</Text>
                  <Text style={styles.statLabel}>Notes</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>12</Text>
                  <Text style={styles.statLabel}>Minutes</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>5</Text>
                  <Text style={styles.statLabel}>Ideas</Text>
                </View>
              </View>
            </GlassCard>
          </MotiView>

          {/* Bottom spacing for FAB */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>

      {/* Floating Action Button */}
      <FloatingActionButton
        onPress={handleNewNote}
        withOrangeGlow
      />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Theme.layout.screen.paddingHorizontal,
    paddingTop: Spacing.lg,
  },
  headerSection: {
    marginBottom: Spacing.xxl,
  },
  welcomeCard: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  welcomeTitle: {
    fontSize: Typography.size.hero,
    fontWeight: Typography.weight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  welcomeSubtitle: {
    fontSize: Typography.size.lg,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: Spacing.xxl,
  },
  sectionTitle: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
    marginLeft: Spacing.xs,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  noteCardContainer: {
    marginBottom: Spacing.md,
  },
  noteCard: {
    padding: Spacing.lg,
  },
  noteContent: {
    gap: Spacing.sm,
  },
  noteTitle: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.semibold,
    color: Colors.text.primary,
  },
  notePreview: {
    fontSize: Typography.size.md,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.relaxed * Typography.size.md,
  },
  noteTime: {
    fontSize: Typography.size.sm,
    color: Colors.text.muted,
    marginTop: Spacing.xs,
  },
  statsCard: {
    padding: Spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: Typography.size.xxl,
    fontWeight: Typography.weight.bold,
    color: Colors.primary.blue,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.size.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.system.divider,
    marginHorizontal: Spacing.md,
  },
  bottomSpacing: {
    height: 100, // Space for floating action button
  },
});
