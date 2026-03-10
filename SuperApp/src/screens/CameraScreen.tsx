import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function CameraScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>📷 Camera</Text>
      <View style={styles.body}>
        <Ionicons name="camera" size={80} color="#6C63FF" />
        <Text style={styles.title}>Photo & Video</Text>
        <Text style={styles.sub}>Take photos, record videos{'\n'}and share with your followers</Text>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="camera" size={22} color="#fff" />
          <Text style={styles.btnText}>Open Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn2}>
          <Ionicons name="images" size={22} color="#6C63FF" />
          <Text style={styles.btn2Text}>Choose from Gallery</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', padding: 16, color: '#6C63FF' },
  body: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginTop: 16 },
  sub: { fontSize: 15, color: '#999', textAlign: 'center', marginTop: 8, marginBottom: 32 },
  btn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#6C63FF',
    borderRadius: 24, paddingHorizontal: 32, paddingVertical: 14, gap: 8, marginBottom: 12, width: '100%', justifyContent: 'center' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  btn2: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#6C63FF',
    borderRadius: 24, paddingHorizontal: 32, paddingVertical: 14, gap: 8, width: '100%', justifyContent: 'center' },
  btn2Text: { color: '#6C63FF', fontSize: 16, fontWeight: '600' },
});