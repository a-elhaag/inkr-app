import * as Haptics from 'expo-haptics';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { GlassButton, GlassCard } from '@/components/glass/GlassComponents';
import { Colors, Spacing, Theme, Typography } from '@/constants/DesignSystem';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatMemoryScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to Inkr! I\'m here to help you remember everything. What\'s on your mind today?',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        isUser: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      setIsTyping(true);
      
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'I\'ve saved that to your memory. Is there anything specific you\'d like me to help you remember about this?',
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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
          <GlassCard style={styles.headerCard}>
            <Text style={styles.headerTitle}>Always in Memory</Text>
            <Text style={styles.headerSubtitle}>Your AI memory companion</Text>
          </GlassCard>
        </MotiView>

        {/* Messages */}
        <ScrollView 
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message, index) => (
            <MotiView
              key={message.id}
              from={{ opacity: 0, translateY: 20, scale: 0.9 }}
              animate={{ opacity: 1, translateY: 0, scale: 1 }}
              transition={{
                type: 'spring',
                damping: 15,
                stiffness: 100,
                delay: index * 100,
              }}
              style={[
                styles.messageContainer,
                message.isUser ? styles.userMessageContainer : styles.aiMessageContainer
              ]}
            >
              <GlassCard 
                style={message.isUser ? styles.userMessage : styles.aiMessage}
              >
                <Text style={[
                  styles.messageText,
                  message.isUser ? styles.userMessageText : styles.aiMessageText
                ]}>
                  {message.text}
                </Text>
                <Text style={[
                  styles.messageTime,
                  message.isUser ? styles.userMessageTime : styles.aiMessageTime
                ]}>
                  {formatTime(message.timestamp)}
                </Text>
              </GlassCard>
            </MotiView>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <MotiView
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={styles.typingContainer}
            >
              <GlassCard style={styles.typingCard}>
                <View style={styles.typingDots}>
                  <MotiView
                    from={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      loop: true,
                      type: 'timing',
                      duration: 600,
                      delay: 0,
                    }}
                    style={styles.typingDot}
                  />
                  <MotiView
                    from={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      loop: true,
                      type: 'timing',
                      duration: 600,
                      delay: 200,
                    }}
                    style={styles.typingDot}
                  />
                  <MotiView
                    from={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      loop: true,
                      type: 'timing',
                      duration: 600,
                      delay: 400,
                    }}
                    style={styles.typingDot}
                  />
                </View>
              </GlassCard>
            </MotiView>
          )}
        </ScrollView>

        {/* Input Area */}
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 300 }}
          style={styles.inputContainer}
        >
          <GlassCard style={styles.inputCard}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="Share your thoughts..."
                placeholderTextColor={Colors.text.muted}
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
                onSubmitEditing={handleSendMessage}
                blurOnSubmit={false}
              />
              <GlassButton
                title="Send"
                onPress={handleSendMessage}
                variant="primary"
                size="sm"
                style={styles.sendButton}
                disabled={!inputText.trim()}
              />
            </View>
          </GlassCard>
        </MotiView>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
    paddingBottom: Spacing.md,
  },
  headerCard: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  headerTitle: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: Typography.size.md,
    color: Colors.text.secondary,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: Theme.layout.screen.paddingHorizontal,
  },
  messagesContent: {
    paddingVertical: Spacing.md,
    gap: Spacing.lg,
  },
  messageContainer: {
    maxWidth: '85%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  aiMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageCard: {
    padding: Spacing.lg,
  },
  userMessage: {
    backgroundColor: Colors.primary.blue + '20',
  },
  aiMessage: {
    backgroundColor: Colors.background.glass,
  },
  messageText: {
    fontSize: Typography.size.md,
    lineHeight: Typography.lineHeight.relaxed * Typography.size.md,
    marginBottom: Spacing.sm,
  },
  userMessageText: {
    color: Colors.text.primary,
  },
  aiMessageText: {
    color: Colors.text.primary,
  },
  messageTime: {
    fontSize: Typography.size.xs,
    textAlign: 'right',
  },
  userMessageTime: {
    color: Colors.text.secondary,
  },
  aiMessageTime: {
    color: Colors.text.muted,
  },
  typingContainer: {
    alignSelf: 'flex-start',
    maxWidth: '85%',
  },
  typingCard: {
    padding: Spacing.lg,
    backgroundColor: Colors.background.glass,
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.text.muted,
  },
  inputContainer: {
    padding: Theme.layout.screen.paddingHorizontal,
    paddingBottom: Spacing.lg,
  },
  inputCard: {
    padding: Spacing.md,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.md,
  },
  textInput: {
    flex: 1,
    fontSize: Typography.size.md,
    color: Colors.text.primary,
    maxHeight: 100,
    minHeight: 40,
    textAlignVertical: 'center',
    paddingVertical: Platform.OS === 'ios' ? Spacing.sm : 0,
  },
  sendButton: {
    minWidth: 60,
    paddingHorizontal: Spacing.md,
  },
});
