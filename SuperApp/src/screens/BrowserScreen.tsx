import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, SafeAreaView, Platform } from 'react-native';

export default function BrowserScreen() {
  const [url, setUrl] = useState('https://google.com');

  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.header}>🌐 Browser</Text>
        <iframe src={url} style={{ flex: 1, width: '100%', height: '100%', border: 'none' }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.header}>🌐 Browser</Text>
      <View style={styles.bar}>
        <TextInput
          style={styles.urlInput}
          value={url}
          onChangeText={setUrl}
          placeholder="Search or enter URL..."
          autoCapitalize="none"
        />
      </View>
      <Text style={{ padding: 20, color: '#666', textAlign: 'center' }}>
        Browser sirf web version mein kaam karta hai abhi. 🌐{'\n\n'}Web pe chalao: press W
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 22, fontWeight: 'bold', padding: 16, color: '#6C63FF' },
  bar: { flexDirection: 'row', padding: 8, backgroundColor: '#f5f5f5' },
  urlInput: { flex: 1, backgroundColor: '#fff', borderRadius: 20,
    paddingHorizontal: 16, height: 40, borderWidth: 1, borderColor: '#ddd' },
});