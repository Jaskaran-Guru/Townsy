import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const TRENDING = [
  { id: '1', tag: '#SuperApp', posts: '12.5K', emoji: '🚀', desc: 'People are talking about the new SuperApp!' },
  { id: '2', tag: '#ReactNative', posts: '8.2K', emoji: '⚛️', desc: 'Latest React Native updates and tips.' },
  { id: '3', tag: '#AI', posts: '45.1K', emoji: '🤖', desc: 'Artificial Intelligence is changing the world.' },
  { id: '4', tag: '#India', posts: '102K', emoji: '🇮🇳', desc: 'Trending topics from across India.' },
  { id: '5', tag: '#Technology', posts: '33.4K', emoji: '💻', desc: 'Latest in tech and innovation.' },
  { id: '6', tag: '#Programming', posts: '19.8K', emoji: '👨‍💻', desc: 'Coding tips, tricks and tutorials.' },
];

const PEOPLE = [
  { id: '1', name: 'Rahul Dev', handle: '@rahul_dev', followers: '12.4K' },
  { id: '2', name: 'Priya Singh', handle: '@priya_singh', followers: '8.1K' },
  { id: '3', name: 'Amit Kumar', handle: '@amit_kumar', followers: '5.6K' },
];

export default function ExploreScreen() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<any>(null);
  const [tab, setTab] = useState<'trending' | 'people'>('trending');

  const filteredTrends = TRENDING.filter(t => t.tag.toLowerCase().includes(search.toLowerCase()));
  const filteredPeople = PEOPLE.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🔍 Explore</Text>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#999" />
        <TextInput style={styles.searchInput} placeholder="Search topics, people..."
          value={search} onChangeText={setSearch} />
        {search ? <TouchableOpacity onPress={() => setSearch('')}>
          <Ionicons name="close-circle" size={18} color="#999" />
        </TouchableOpacity> : null}
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, tab === 'trending' && styles.activeTab]}
          onPress={() => setTab('trending')}>
          <Text style={[styles.tabText, tab === 'trending' && styles.activeTabText]}>🔥 Trending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, tab === 'people' && styles.activeTab]}
          onPress={() => setTab('people')}>
          <Text style={[styles.tabText, tab === 'people' && styles.activeTabText]}>👥 People</Text>
        </TouchableOpacity>
      </View>

      {tab === 'trending' ? (
        <FlatList data={filteredTrends} keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.trendCard} onPress={() => setSelected(item)}>
              <View style={styles.trendRank}>
                <Text style={styles.rankNum}>{index + 1}</Text>
              </View>
              <Text style={styles.trendEmoji}>{item.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.tag}>{item.tag}</Text>
                <Text style={styles.postCount}>{item.posts} posts</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#ccc" />
            </TouchableOpacity>
          )}
        />
      ) : (
        <FlatList data={filteredPeople} keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.peopleCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name[0]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.peopleName}>{item.name}</Text>
                <Text style={styles.peopleHandle}>{item.handle} · {item.followers} followers</Text>
              </View>
              <TouchableOpacity style={styles.followBtn}>
                <Text style={styles.followText}>Follow</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <Modal visible={!!selected} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSelected(null)}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selected?.tag}</Text>
            <View style={{ width: 40 }} />
          </View>
          <ScrollView style={{ padding: 16 }}>
            <View style={styles.topicBanner}>
              <Text style={styles.topicEmoji}>{selected?.emoji}</Text>
              <Text style={styles.topicTag}>{selected?.tag}</Text>
              <Text style={styles.topicDesc}>{selected?.desc}</Text>
              <Text style={styles.topicPosts}>📊 {selected?.posts} posts</Text>
            </View>
            {[1, 2, 3].map(i => (
              <View key={i} style={styles.dummyPost}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>U</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.dummyName}>User {i}</Text>
                  <Text style={styles.dummyText}>Post about {selected?.tag} — yeh topic bahut trending hai! 🔥</Text>
                  <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
                    <Text style={{ color: '#999', fontSize: 12 }}>❤️ {i * 12}</Text>
                    <Text style={{ color: '#999', fontSize: 12 }}>💬 {i * 3}</Text>
                  </View>
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
  header: { paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff',
    borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  logo: { fontSize: 22, fontWeight: '800', color: '#6C63FF' },
  searchBox: { flexDirection: 'row', alignItems: 'center', margin: 12,
    backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10,
    gap: 8, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  searchInput: { flex: 1, fontSize: 15, color: '#333' },
  tabs: { flexDirection: 'row', marginHorizontal: 12, marginBottom: 8, backgroundColor: '#fff',
    borderRadius: 12, padding: 4 },
  tab: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 10 },
  activeTab: { backgroundColor: '#6C63FF' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  trendCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    marginHorizontal: 12, marginBottom: 8, borderRadius: 14, padding: 14, gap: 12,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  trendRank: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#f0efff',
    justifyContent: 'center', alignItems: 'center' },
  rankNum: { fontSize: 13, fontWeight: '700', color: '#6C63FF' },
  trendEmoji: { fontSize: 22 },
  tag: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },
  postCount: { fontSize: 12, color: '#999', marginTop: 2 },
  peopleCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    marginHorizontal: 12, marginBottom: 8, borderRadius: 14, padding: 14, gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#6C63FF',
    justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  peopleName: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },
  peopleHandle: { fontSize: 12, color: '#999', marginTop: 2 },
  followBtn: { backgroundColor: '#6C63FF', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6 },
  followText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  topicBanner: { backgroundColor: '#fff', borderRadius: 16, padding: 20, alignItems: 'center',
    marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  topicEmoji: { fontSize: 48, marginBottom: 8 },
  topicTag: { fontSize: 24, fontWeight: '800', color: '#6C63FF', marginBottom: 6 },
  topicDesc: { fontSize: 15, color: '#555', textAlign: 'center', marginBottom: 8 },
  topicPosts: { fontSize: 13, color: '#999' },
  dummyPost: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 14,
    padding: 14, marginBottom: 10, gap: 12, shadowColor: '#000', shadowOpacity: 0.04, elevation: 1 },
  dummyName: { fontWeight: '700', color: '#333', fontSize: 14 },
  dummyText: { color: '#555', fontSize: 13, marginTop: 4, lineHeight: 18 },
});