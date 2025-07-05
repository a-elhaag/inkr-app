import * as Haptics from 'expo-haptics';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { GlassButton, GlassCard } from '@/components/glass/GlassComponents';
import { BorderRadius, Colors, Spacing, Theme, Typography } from '@/constants/DesignSystem';

interface Note {
  id: string;
  title: string;
  preview: string;
  date: Date;
  category: string;
}

export default function LibraryScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Sample notes data
  const allNotes: Note[] = [
    { id: '1', title: 'Morning Thoughts', preview: 'Today feels like a good day to start something new...', date: new Date('2024-01-15'), category: 'Personal' },
    { id: '2', title: 'Meeting Notes', preview: 'Key points from today\'s discussion about the new project...', date: new Date('2024-01-14'), category: 'Work' },
    { id: '3', title: 'Recipe Ideas', preview: 'Trying out new pasta recipes for the weekend...', date: new Date('2024-01-13'), category: 'Food' },
    { id: '4', title: 'Book Insights', preview: 'Fascinating concepts from the latest psychology book...', date: new Date('2024-01-12'), category: 'Learning' },
    { id: '5', title: 'Travel Plans', preview: 'Planning the summer vacation to Japan...', date: new Date('2024-01-11'), category: 'Travel' },
    { id: '6', title: 'Workout Progress', preview: 'Tracking my fitness journey and new goals...', date: new Date('2024-01-10'), category: 'Health' },
  ];

  const categories = ['All', 'Personal', 'Work', 'Food', 'Learning', 'Travel', 'Health'];

  const filteredNotes = allNotes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         note.preview.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleNotePress = (noteId: string) => {
    Haptics.selectionAsync();
    console.log('Note pressed:', noteId);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
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
          <Text style={styles.headerTitle}>Your Library</Text>
          <Text style={styles.headerSubtitle}>{filteredNotes.length} notes</Text>
        </MotiView>

        {/* Search Bar */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 100, delay: 200 }}
          style={styles.searchSection}
        >
          <GlassCard style={styles.searchCard}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search your notes..."
              placeholderTextColor={Colors.text.muted}
              value={searchText}
              onChangeText={setSearchText}
            />
          </GlassCard>
        </MotiView>

        {/* Category Filter */}
        <MotiView
          from={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: 'timing', duration: 500, delay: 400 }}
          style={styles.categorySection}
        >
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category, index) => (
              <MotiView
                key={category}
                from={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  type: 'spring', 
                  damping: 15, 
                  stiffness: 100,
                  delay: 500 + (index * 100)
                }}
              >
                <GlassButton
                  title={category}
                  onPress={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? 'primary' : 'ghost'}
                  size="sm"
                  style={styles.categoryButton}
                />
              </MotiView>
            ))}
          </ScrollView>
        </MotiView>

        {/* Notes Grid */}
        <ScrollView 
          style={styles.notesContainer}
          contentContainerStyle={styles.notesContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredNotes.map((note, index) => (
            <MotiView
              key={note.id}
              from={{ opacity: 0, translateY: 50, scale: 0.9 }}
              animate={{ opacity: 1, translateY: 0, scale: 1 }}
              transition={{
                type: 'spring',
                damping: 15,
                stiffness: 100,
                delay: 600 + (index * 100),
              }}
              style={styles.noteContainer}
            >
              <GlassCard
                onPress={() => handleNotePress(note.id)}
                style={styles.noteCard}
              >
                <View style={styles.noteHeader}>
                  <Text style={styles.noteCategory}>{note.category}</Text>
                  <Text style={styles.noteDate}>{formatDate(note.date)}</Text>
                </View>
                <Text style={styles.noteTitle}>{note.title}</Text>
                <Text style={styles.notePreview}>{note.preview}</Text>
              </GlassCard>
            </MotiView>
          ))}

          {filteredNotes.length === 0 && (
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'timing', duration: 500, delay: 800 }}
              style={styles.emptyState}
            >
              <GlassCard style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>No notes found</Text>
                <Text style={styles.emptySubtitle}>
                  {searchText ? 'Try adjusting your search' : 'Start creating your first note!'}
                </Text>
              </GlassCard>
            </MotiView>
          )}

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
  },
  searchSection: {
    padding: Theme.layout.screen.paddingHorizontal,
    paddingVertical: Spacing.lg,
  },
  searchCard: {
    padding: Spacing.md,
  },
  searchInput: {
    fontSize: Typography.size.md,
    color: Colors.text.primary,
    height: 40,
  },
  categorySection: {
    paddingLeft: Theme.layout.screen.paddingHorizontal,
    marginBottom: Spacing.lg,
  },
  categoriesContainer: {
    paddingRight: Theme.layout.screen.paddingHorizontal,
    gap: Spacing.sm,
  },
  categoryButton: {
    paddingHorizontal: Spacing.lg,
  },
  notesContainer: {
    flex: 1,
    paddingHorizontal: Theme.layout.screen.paddingHorizontal,
  },
  notesContent: {
    gap: Spacing.lg,
  },
  noteContainer: {
    width: '100%',
  },
  noteCard: {
    padding: Spacing.lg,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  noteCategory: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
    color: Colors.primary.blue,
    backgroundColor: Colors.primary.blue + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
  },
  noteDate: {
    fontSize: Typography.size.sm,
    color: Colors.text.muted,
  },
  noteTitle: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  notePreview: {
    fontSize: Typography.size.md,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.relaxed * Typography.size.md,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    width: '100%',
  },
  emptyTitle: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontSize: Typography.size.md,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 120, // Space for tab bar
  },
});
