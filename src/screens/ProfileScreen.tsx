import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { usePetContext } from '../context/PetContext';
import { BADGES } from '../constants/petConfig';
import { BadgeCard } from '../components/BadgeCard';

export const ProfileScreen = () => {
    const { petState, isReady } = usePetContext();

    if (!isReady) return <View style={styles.container} />;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.profileHeader}>
                    <View style={styles.avatarCircle}>
                        <Text style={styles.avatarEmoji}>
                            {petState.type === 'Kedi' ? '😺' : petState.type === 'Köpek' ? '🐶' : '🐰'}
                        </Text>
                    </View>
                    <Text style={styles.name}>{petState.name}</Text>
                    <Text style={styles.typeLabel}>{petState.type} • Seviye {petState.level}</Text>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{petState.xp}</Text>
                        <Text style={styles.statLabel}>Toplam XP</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{petState.consecutiveDays}</Text>
                        <Text style={styles.statLabel}>Günlük Seri</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>
                    Rozetler ({petState.badges.length}/{BADGES.length})
                </Text>
                
                <View style={styles.badgesGrid}>
                    {BADGES.map((badge) => (
                        <BadgeCard 
                            key={badge.id} 
                            badge={badge} 
                            hasEarned={petState.badges.includes(badge.id)} 
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  avatarCircle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#1e293b',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      borderWidth: 3,
      borderColor: '#a78bfa',
  },
  avatarEmoji: {
      fontSize: 50,
  },
  name: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  typeLabel: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statValue: {
    color: '#38bdf8',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 4,
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  sectionTitle: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    paddingLeft: 8,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  }
});
