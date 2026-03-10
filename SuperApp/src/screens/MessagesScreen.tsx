import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const CHATS = [
  { id: '1', name: 'Rahul Dev', lastMsg: 'Bhai app bahut acchi bani!', time: '2m', unread: 2, online: true },
  { id: '2', name: 'Priya Singh', lastMsg: 'Kab milenge?', time: '15m', unread: 0, online: true },
  { id: '3', name: 'Amit Kumar', lastMsg: 'Code bhej do yaar', time: '1h', unread: 5, online: false },
  { id: '4', name: 'Neha Sharma', lastMsg: 'Thanks! 😊', time: '3h', unread: 0, online: false },
];

export default function MessagesScreen() {
  const [search, setSearch] = useState('');
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');

  const filtered = CHATS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const openChat = (chat: any) => {
    setSelectedChat(chat);
    setChatMessages([
      { id: '1', text: chat.lastMsg, mine: false, time: chat.time },
      { id: '2', text: 'Haan bilkul! 😊', mine: true, time: 'now' },
    ]);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setChatMessages(prev => [...prev, { id: Date.now().toString(), text: input, mine: true, time: 'now' }]);
    setInput('');
    // Auto reply
    setTimeout(() => {
      setChatMessages(prev => [...prev, { id: (Date.now()+1).toString(),
        text: 'Message mila! 👍', mine: false, time: 'now' }]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>💬 Messages</Text>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={24} color="#6C63FF" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#999" />
        <TextInput style={styles.searchInput} placeholder="Search messages..."
          value={search} onChangeText={setSearch} />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem} onPress={() => openChat(item)}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name[0]}</Text>
              </View>
              {item.online && <View style={styles.onlineDot} />}
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.chatTop}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <Text style={[styles.lastMsg, item.unread > 0 && { fontWeight: '600', color: '#333' }]}
                numberOfLines={1}>{item.lastMsg}</Text>
            </View>
            {item.unread > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />

      <Modal visible={!!selectedChat} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
          <View style={styles.chatHeader}>
            <TouchableOpacity onPress={() => setSelectedChat(null)}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <View style={styles.avatarWrap}>
              <View style={[styles.avatar, { width: 38, height: 38, borderRadius: 19 }]}>
                <Text style={[styles.avatarText, { fontSize: 15 }]}>{selectedChat?.name[0]}</Text>
              </View>
              {selectedChat?.online && <View style={styles.onlineDot} />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.chatName}>{selectedChat?.name}</Text>
              <Text style={{ fontSize: 12, color: selectedChat?.online ? '#4CAF50' : '#999' }}>
                {selectedChat?.online ? '● Online' : '● Offline'}
              </Text>
            </View>
            <Ionicons name="call-outline" size={22} color="#6C63FF" style={{ marginRight: 12 }} />
            <Ionicons name="videocam-outline" size={22} color="#6C63FF" />
          </View>

          <FlatList data={chatMessages} keyExtractor={item => item.id}
            contentContainerStyle={{ padding: 16, gap: 8 }}
            renderItem={({ item }) => (
              <View style={{ alignItems: item.mine ? 'flex-end' : 'flex-start' }}>
                <View style={[styles.bubble, item.mine ? styles.myBubble : styles.theirBubble]}>
                  <Text style={item.mine ? styles.myText : styles.theirText}>{item.text}</Text>
                </View>
                <Text style={styles.msgTime}>{item.time}</Text>
              </View>
            )}
          />

          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.inputRow}>
              <TouchableOpacity style={styles.attachBtn}>
                <Ionicons name="add" size={22} color="#6C63FF" />
              </TouchableOpacity>
              <TextInput style={styles.input} value={input} onChangeText={setInput}
                placeholder="Type a message..." />
              <TouchableOpacity style={[styles.sendBtn, !input.trim() && { backgroundColor: '#ddd' }]}
                onPress={sendMessage} disabled={!input.trim()}>
                <Ionicons name="send" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff',
    borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  logo: { fontSize: 22, fontWeight: '800', color: '#6C63FF' },
  searchBox: { flexDirection: 'row', alignItems: 'center', margin: 12,
    backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10,
    gap: 8, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  searchInput: { flex: 1, fontSize: 15 },
  chatItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    marginHorizontal: 12, marginBottom: 6, borderRadius: 14, padding: 14, gap: 12,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  avatarWrap: { position: 'relative' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#6C63FF',
    justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  onlineDot: { position: 'absolute', bottom: 0, right: 0, width: 12, height: 12,
    borderRadius: 6, backgroundColor: '#4CAF50', borderWidth: 2, borderColor: '#fff' },
  chatTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  name: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },
  time: { fontSize: 12, color: '#999' },
  lastMsg: { fontSize: 13, color: '#666' },
  badge: { backgroundColor: '#6C63FF', borderRadius: 12, minWidth: 22,
    height: 22, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  chatHeader: { flexDirection: 'row', alignItems: 'center', padding: 14,
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0', gap: 10 },
  chatName: { fontSize: 16, fontWeight: '700', color: '#333' },
  bubble: { maxWidth: '78%', padding: 12, borderRadius: 18 },
  myBubble: { backgroundColor: '#6C63FF', borderBottomRightRadius: 4 },
  theirBubble: { backgroundColor: '#fff', borderBottomLeftRadius: 4,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  myText: { color: '#fff', fontSize: 15 },
  theirText: { color: '#333', fontSize: 15 },
  msgTime: { fontSize: 11, color: '#bbb', marginTop: 3, marginHorizontal: 4 },
  inputRow: { flexDirection: 'row', padding: 12, backgroundColor: '#fff',
    borderTopWidth: 1, borderTopColor: '#f0f0f0', gap: 8, alignItems: 'center' },
  attachBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f0efff',
    justifyContent: 'center', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 24,
    paddingHorizontal: 16, paddingVertical: 8, fontSize: 15, backgroundColor: '#f9f9f9' },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#6C63FF',
    justifyContent: 'center', alignItems: 'center' },
});