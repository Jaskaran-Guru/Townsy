import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const [editModal, setEditModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [privacyModal, setPrivacyModal] = useState(false);
  const [notifModal, setNotifModal] = useState(false);
  const [helpModal, setHelpModal] = useState(false);
  const [profile, setProfile] = useState({
    name: "Aap Ka Naam",
    username: "username",
    bio: "React Native Developer 🚀 | India 🇮🇳",
  });
  const [temp, setTemp] = useState(profile);
  const [activeTab, setActiveTab] = useState<"posts" | "liked" | "saved">(
    "posts",
  );
  const [notifs, setNotifs] = useState({
    likes: true,
    comments: true,
    messages: true,
    updates: false,
  });
  const [privacy, setPrivacy] = useState({
    privateAccount: false,
    showOnline: true,
    readReceipts: true,
  });

  const MENU = [
    {
      icon: "settings-outline",
      label: "Settings",
      color: "#6C63FF",
      onPress: () => setSettingsModal(true),
    },
    {
      icon: "shield-checkmark-outline",
      label: "Privacy",
      color: "#4CAF50",
      onPress: () => setPrivacyModal(true),
    },
    {
      icon: "notifications-outline",
      label: "Notifications",
      color: "#FF9800",
      onPress: () => setNotifModal(true),
    },
    {
      icon: "help-circle-outline",
      label: "Help & Support",
      color: "#2196F3",
      onPress: () => setHelpModal(true),
    },
    {
      icon: "log-out-outline",
      label: "Logout",
      color: "#f44336",
      onPress: () =>
        Alert.alert("Logout", "Kya aap logout karna chahte hain?", [
          { text: "Cancel", style: "cancel" },
          {
            text: "Logout",
            style: "destructive",
            onPress: () =>
              Alert.alert("👋 Logged Out!", "Aap successfully logout ho gaye!"),
          },
        ]),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cover} />
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{profile.name[0]}</Text>
            </View>
            <TouchableOpacity style={styles.cameraBtn}>
              <Ionicons name="camera" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => {
              setTemp(profile);
              setEditModal(true);
            }}
          >
            <Ionicons name="pencil" size={14} color="#6C63FF" />
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.username}>@{profile.username}</Text>
          <Text style={styles.bio}>{profile.bio}</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNum}>128</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNum}>4.2K</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNum}>312</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabs}>
          {(["posts", "liked", "saved"] as const).map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.tab, activeTab === t && styles.activeTab]}
              onPress={() => setActiveTab(t)}
            >
              <Ionicons
                name={
                  t === "posts"
                    ? "grid-outline"
                    : t === "liked"
                      ? "heart-outline"
                      : "bookmark-outline"
                }
                size={18}
                color={activeTab === t ? "#6C63FF" : "#999"}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === t && styles.activeTabText,
                ]}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.emptyState}>
          <Ionicons name="grid-outline" size={48} color="#ddd" />
          <Text style={styles.emptyText}>Koi {activeTab} nahi hai abhi</Text>
        </View>

        <View style={styles.menuSection}>
          {MENU.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View
                style={[
                  styles.menuIcon,
                  { backgroundColor: item.color + "15" },
                ]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={item.color}
                />
              </View>
              <Text
                style={[
                  styles.menuLabel,
                  item.label === "Logout" && { color: "#f44336" },
                ]}
              >
                {item.label}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color="#ccc"
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={editModal} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setEditModal(false)}>
              <Text style={{ color: "#999", fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TouchableOpacity
              onPress={() => {
                setProfile(temp);
                setEditModal(false);
              }}
            >
              <Text
                style={{ color: "#6C63FF", fontSize: 16, fontWeight: "700" }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ padding: 20 }}>
            <View style={{ alignItems: "center", marginBottom: 24 }}>
              <View style={styles.avatar}>
                <Text style={[styles.avatarText, { fontSize: 32 }]}>
                  {temp.name[0] || "A"}
                </Text>
              </View>
              <Text
                style={{ color: "#6C63FF", marginTop: 8, fontWeight: "600" }}
              >
                Change Photo
              </Text>
            </View>
            {[
              { label: "Full Name", key: "name" },
              { label: "Username", key: "username" },
              { label: "Bio", key: "bio", multi: true },
            ].map((f) => (
              <View key={f.key} style={{ marginBottom: 16 }}>
                <Text style={styles.fieldLabel}>{f.label}</Text>
                <TextInput
                  style={[styles.fieldInput, f.multi && { height: 80 }]}
                  value={(temp as any)[f.key]}
                  onChangeText={(t) => setTemp({ ...temp, [f.key]: t })}
                  multiline={f.multi}
                />
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Settings Modal */}
      <Modal visible={settingsModal} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSettingsModal(false)}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>⚙️ Settings</Text>
            <View style={{ width: 40 }} />
          </View>
          <ScrollView style={{ padding: 16 }}>
            {/* Account */}
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => {
                setSettingsModal(false);
                setTimeout(() => {
                  setTemp(profile);
                  setEditModal(true);
                }, 300);
              }}
            >
              <Text style={styles.settingEmoji}>👤</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.settingTitle}>Account</Text>
                <Text style={styles.settingDesc}>
                  Username, email, password
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </TouchableOpacity>

            {/* Dark Mode */}
            <View style={styles.settingItem}>
              <Text style={styles.settingEmoji}>🎨</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.settingTitle}>Dark Mode</Text>
                <Text style={styles.settingDesc}>Coming soon</Text>
              </View>
              <Switch value={false} disabled trackColor={{ true: "#6C63FF" }} />
            </View>

            {/* Language */}
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() =>
                Alert.alert("Language", "Kaunsi language choose karein?", [
                  { text: "Hindi" },
                  { text: "English" },
                  { text: "Cancel" },
                ])
              }
            >
              <Text style={styles.settingEmoji}>🌐</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.settingTitle}>Language</Text>
                <Text style={styles.settingDesc}>Hindi, English</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </TouchableOpacity>

            {/* Clear Cache */}
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() =>
                Alert.alert("Cache Clear", "Cache clear ho gaya! ✅")
              }
            >
              <Text style={styles.settingEmoji}>🗑️</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.settingTitle}>Clear Cache</Text>
                <Text style={styles.settingDesc}>Free up storage</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </TouchableOpacity>

            {/* About */}
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() =>
                Alert.alert(
                  "SuperApp",
                  "Version 1.0.0\nMade with ❤️ in India\n\n© 2026 SuperApp",
                )
              }
            >
              <Text style={styles.settingEmoji}>ℹ️</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.settingTitle}>About</Text>
                <Text style={styles.settingDesc}>Version 1.0.0</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </TouchableOpacity>

            {/* Logout Button */}
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() =>
                Alert.alert("Logout", "Kya aap logout karna chahte hain?", [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Logout",
                    style: "destructive",
                    onPress: () => {
                      setSettingsModal(false);
                      Alert.alert(
                        "👋 Logged Out!",
                        "Aap successfully logout ho gaye!",
                      );
                    },
                  },
                ])
              }
            >
              <Ionicons name="log-out-outline" size={20} color="#fff" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Privacy Modal */}
      <Modal visible={privacyModal} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setPrivacyModal(false)}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>🔒 Privacy</Text>
            <View style={{ width: 40 }} />
          </View>
          <ScrollView style={{ padding: 16 }}>
            {[
              {
                key: "privateAccount",
                title: "Private Account",
                desc: "Sirf followers aapke posts dekh sakte hain",
              },
              {
                key: "showOnline",
                title: "Online Status",
                desc: "Doosre dekh sakte hain ki aap online hain",
              },
              {
                key: "readReceipts",
                title: "Read Receipts",
                desc: "Messages padhe ki receipt dikhao",
              },
            ].map((item) => (
              <View key={item.key} style={styles.toggleItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingDesc}>{item.desc}</Text>
                </View>
                <Switch
                  value={(privacy as any)[item.key]}
                  onValueChange={(v) =>
                    setPrivacy({ ...privacy, [item.key]: v })
                  }
                  trackColor={{ true: "#6C63FF" }}
                />
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Notifications Modal */}
      <Modal visible={notifModal} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setNotifModal(false)}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>🔔 Notifications</Text>
            <View style={{ width: 40 }} />
          </View>
          <ScrollView style={{ padding: 16 }}>
            {[
              {
                key: "likes",
                title: "Likes",
                desc: "Jab koi aapki post like kare",
              },
              {
                key: "comments",
                title: "Comments",
                desc: "Jab koi comment kare",
              },
              {
                key: "messages",
                title: "Messages",
                desc: "Naye messages ki notification",
              },
              {
                key: "updates",
                title: "App Updates",
                desc: "Naye features ki jaankari",
              },
            ].map((item) => (
              <View key={item.key} style={styles.toggleItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingDesc}>{item.desc}</Text>
                </View>
                <Switch
                  value={(notifs as any)[item.key]}
                  onValueChange={(v) => setNotifs({ ...notifs, [item.key]: v })}
                  trackColor={{ true: "#6C63FF" }}
                />
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Help Modal */}
      <Modal visible={helpModal} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setHelpModal(false)}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>❓ Help & Support</Text>
            <View style={{ width: 40 }} />
          </View>
          <ScrollView style={{ padding: 16 }}>
            {[
              {
                q: "App kaise use karein?",
                a: "Home pe posts dekhein, AI se baat karein, Messages mein chat karein!",
              },
              {
                q: "Password bhool gaya?",
                a: "Profile → Settings → Account → Change Password pe jaayein.",
              },
              {
                q: "Post kaise karein?",
                a: "Home screen pe + button dabao aur apna post likhо.",
              },
              {
                q: "Bug report karna hai?",
                a: "Settings → About → Report Bug pe jaayein.",
              },
            ].map((faq, i) => (
              <View key={i} style={styles.faqItem}>
                <Text style={styles.faqQ}>❓ {faq.q}</Text>
                <Text style={styles.faqA}>{faq.a}</Text>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  cover: { height: 120, backgroundColor: "#6C63FF", opacity: 0.15 },
  profileSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    marginTop: -30,
    marginBottom: 12,
  },
  avatarWrapper: { position: "relative" },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#6C63FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  avatarText: { color: "#fff", fontWeight: "bold", fontSize: 28 },
  cameraBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#6C63FF",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#6C63FF",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    gap: 4,
  },
  editText: { color: "#6C63FF", fontWeight: "600", fontSize: 13 },
  name: { fontSize: 22, fontWeight: "800", color: "#1a1a1a", marginBottom: 2 },
  username: { fontSize: 14, color: "#999", marginBottom: 6 },
  bio: { fontSize: 14, color: "#555", lineHeight: 20, marginBottom: 14 },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  stat: { flex: 1, alignItems: "center" },
  statNum: { fontSize: 20, fontWeight: "800", color: "#1a1a1a" },
  statLabel: { fontSize: 12, color: "#999", marginTop: 2 },
  statDivider: { width: 1, backgroundColor: "#f0f0f0" },
  tabs: { flexDirection: "row", backgroundColor: "#fff", marginBottom: 8 },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 6,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: { borderBottomColor: "#6C63FF" },
  tabText: { fontSize: 13, color: "#999", fontWeight: "600" },
  activeTabText: { color: "#6C63FF" },
  emptyState: { alignItems: "center", paddingVertical: 40, gap: 10 },
  emptyText: { color: "#ccc", fontSize: 14 },
  menuSection: {
    marginTop: 8,
    backgroundColor: "#fff",
    marginHorizontal: 12,
    borderRadius: 16,
    padding: 8,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 12,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  menuLabel: { fontSize: 15, color: "#333", fontWeight: "500" },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  modalTitle: { fontSize: 17, fontWeight: "700", color: "#333" },
  fieldLabel: {
    fontSize: 13,
    color: "#999",
    fontWeight: "600",
    marginBottom: 6,
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "#f9f9f9",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  settingEmoji: { fontSize: 22 },
  settingTitle: { fontSize: 15, fontWeight: "600", color: "#333" },
  settingDesc: { fontSize: 12, color: "#999", marginTop: 2 },
  toggleItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  faqItem: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  faqQ: { fontSize: 15, fontWeight: "700", color: "#333", marginBottom: 6 },
  faqA: { fontSize: 14, color: "#555", lineHeight: 20 },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f44336",
    borderRadius: 14,
    padding: 16,
    marginTop: 16,
    gap: 8,
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
