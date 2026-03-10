import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AIScreen() {
  const [messages, setMessages] = useState<any[]>([
    { role: 'assistant', content: 'Namaste! Kuch bhi poochho! 🤖' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
      const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [...messages, userMsg].map(m => ({
              role: m.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: m.content }]
            })),
          }),
        }
      );
      const json = await response.json();
      const aiMsg = {
        role: 'assistant',
        content: json.candidates[0].content.parts[0].text
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error aa gaya, dobara try karo!' }]);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🤖 AI Assistant</Text>
      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.aiBubble]}>
            <Text style={item.role === 'user' ? styles.userText : styles.aiText}>
              {item.content}
            </Text>
          </View>
        )}
      />
      {loading && <ActivityIndicator color="#6C63FF" style={{ margin: 8 }} />}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Kuch bhi poochho..."
            multiline
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Text style={styles.sendText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', padding: 16, color: '#6C63FF' },
  bubble: { marginVertical: 4, padding: 12, borderRadius: 16, maxWidth: '80%' },
  userBubble: { backgroundColor: '#6C63FF', alignSelf: 'flex-end' },
  aiBubble: { backgroundColor: '#f0f0f0', alignSelf: 'flex-start' },
  userText: { color: '#fff', fontSize: 15 },
  aiText: { color: '#333', fontSize: 15 },
  inputRow: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderTopColor: '#eee' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 24,
    paddingHorizontal: 16, paddingVertical: 8, marginRight: 8, maxHeight: 100 },
  sendBtn: { backgroundColor: '#6C63FF', borderRadius: 24, width: 44, height: 44,
    justifyContent: 'center', alignItems: 'center' },
  sendText: { color: '#fff', fontSize: 18 },
});
