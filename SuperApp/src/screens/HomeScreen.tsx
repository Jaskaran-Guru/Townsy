import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const DUMMY_POSTS = [
  { id: '1', username: 'rahul_dev', handle: '@rahul_dev', content: 'Hello SuperApp! 🎉 Yeh app bahut amazing hai!', likes: 12, comments: 3, time: '2m', liked: false },
  { id: '2', username: 'Priya Singh', handle: '@priya_singh', content: 'Yeh app bahut acchi hai! 😍 Sab kuch ek jagah!', likes: 25, comments: 7, time: '15m', liked: false },
  { id: '3', username: 'Amit Kumar', handle: '@amit_kumar', content: 'Testing 1 2 3 📱 SuperApp is live!', likes: 8, comments: 2, time: '1h', liked: false },
  { id: '4', username: 'Neha Sharma', handle: '@neha_sharma', content: 'Kya features hain yaar! AI bhi hai aur browser bhi! 🚀', likes: 41, comments: 9, time: '2h', liked: false },
];

export default function HomeScreen() {
  const [posts, setPosts] = useState(DUMMY_POSTS);
  const [newPost, setNewPost] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const likePost = (id: string) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  const addPost = () => {
    if (!newPost.trim()) return;
    const post = { id: Date.now().toString(), username: 'Aap Ka Naam', handle: '@username',
      content: newPost, likes: 0, comments: 0, time: 'now', liked: false };
    setPosts(prev => [post, ...prev]);
    setNewPost('');
    setShowCompose(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>✨ SuperApp</Text>
        <TouchableOpacity style={styles.composeBtn} onPress={() => setShowCompose(true)}>
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.username[0]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.handle}>{item.handle} · {item.time}</Text>
              </View>
              <Ionicons name="ellipsis-horizontal" size={18} color="#999" />
            </View>
            <Text style={styles.content}>{item.content}</Text>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.action} onPress={() => setSelectedPost(item)}>
                <Ionicons name="chatbubble-outline" size={20} color="#666" />
                <Text style={styles.actionText}>{item.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.action} onPress={() => likePost(item.id)}>
                <Ionicons name={item.liked ? 'heart' : 'heart-outline'} size={20} color={item.liked ? '#e0245e' : '#666'} />
                <Text style={[styles.actionText, item.liked && { color: '#e0245e' }]}>{item.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.action}>
                <Ionicons name="share-outline" size={20} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.action}>
                <Ionicons name="bookmark-outline" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Compose Post Modal */}
      <Modal visible={showCompose} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowCompose(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>New Post</Text>
            <TouchableOpacity style={styles.postBtn} onPress={addPost}>
              <Text style={styles.postBtnText}>Post</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.composeArea}>
            <View style={styles.composeAvatar}>
              <Text style={styles.avatarText}>A</Text>
            </View>
            <TextInput style={styles.composeInput} placeholder="Kya soch rahe ho?"
              value={newPost} onChangeText={setNewPost} multiline autoFocus />
          </View>
        </SafeAreaView>
      </Modal>

      {/* Comment Modal */}
      <Modal visible={!!selectedPost} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSelectedPost(null)}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Post</Text>
            <View style={{ width: 60 }} />
          </View>
          <ScrollView style={{ padding: 16 }}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{selectedPost?.username[0]}</Text>
                </View>
                <View>
                  <Text style={styles.username}>{selectedPost?.username}</Text>
                  <Text style={styles.handle}>{selectedPost?.handle}</Text>
                </View>
              </View>
              <Text style={styles.content}>{selectedPost?.content}</Text>
            </View>
            <Text style={styles.commentsTitle}>💬 Comments</Text>
            {[1, 2].map(i => (
              <View key={i} style={styles.commentItem}>
                <View style={[styles.avatar, { width: 32, height: 32, borderRadius: 16 }]}>
                  <Text style={[styles.avatarText, { fontSize: 13 }]}>U</Text>
                </View>
                <View style={styles.commentBubble}>
                  <Text style={styles.commentUser}>User {i}</Text>
                  <Text style={styles.commentText}>Bahut accha post hai! 👍</Text>
                </View>
              </View>
            ))}
          </ScrollView>
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
  composeBtn: { backgroundColor: '#6C63FF', borderRadius: 20, width: 36, height: 36,
    justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', marginHorizontal: 12, marginTop: 10,
    borderRadius: 16, padding: 16, shadowColor: '#000', shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#6C63FF',
    justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  username: { fontWeight: '700', color: '#1a1a1a', fontSize: 15 },
  handle: { fontSize: 12, color: '#999', marginTop: 1 },
  content: { fontSize: 15, color: '#333', lineHeight: 22, marginBottom: 12 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8,
    borderTopWidth: 1, borderTopColor: '#f5f5f5' },
  action: { flexDirection: 'row', alignItems: 'center', gap: 5, padding: 4 },
  actionText: { fontSize: 13, color: '#666' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  modalTitle: { fontSize: 17, fontWeight: '700', color: '#333' },
  cancelText: { color: '#999', fontSize: 16 },
  postBtn: { backgroundColor: '#6C63FF', borderRadius: 20, paddingHorizontal: 18, paddingVertical: 7 },
  postBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  composeArea: { flexDirection: 'row', padding: 16, gap: 12 },
  composeAvatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#6C63FF',
    justifyContent: 'center', alignItems: 'center' },
  composeInput: { flex: 1, fontSize: 16, color: '#333', minHeight: 100 },
  commentsTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginVertical: 12 },
  commentItem: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  commentBubble: { flex: 1, backgroundColor: '#f5f5f5', borderRadius: 12, padding: 10 },
  commentUser: { fontWeight: '600', color: '#333', fontSize: 13 },
  commentText: { color: '#555', fontSize: 14, marginTop: 2 },
});