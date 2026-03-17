import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { usePetContext } from '../context/PetContext';
import { PetAvatar } from '../components/PetAvatar';
import { StatBar } from '../components/StatBar';
import { ActionButton } from '../components/ActionButton';
import { LEVEL_BASE_XP } from '../constants/petConfig';

export const HomeScreen = () => {
  const { petState, isReady, feed, play, sleep } = usePetContext();

  if (!isReady) return <View style={styles.container} />;

  const xpProgress = (petState.xp % LEVEL_BASE_XP) / LEVEL_BASE_XP * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PocketPet</Text>
      </View>

      <View style={styles.mainContent}>
        <PetAvatar pet={petState} />

        <View style={styles.statsCard}>
          <StatBar label="Açlık" value={petState.hunger} color="#fbbf24" />
          <StatBar label="Mutluluk" value={petState.happiness} color="#a78bfa" />
          <StatBar label="Enerji" value={petState.energy} color="#38bdf8" />
          
          <View style={styles.xpBarContainer}>
            <View style={styles.xpLabelRow}>
              <Text style={styles.xpLabel}>Deneyim</Text>
              <Text style={styles.xpValue}>{petState.xp % LEVEL_BASE_XP} / {LEVEL_BASE_XP}</Text>
            </View>
            <View style={styles.xpBackground}>
              <View style={[styles.xpFill, { width: `${xpProgress}%` }]} />
            </View>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <ActionButton label="Besle" icon="🍖" color="#10b981" onPress={feed} />
          <ActionButton label="Oyna" icon="🎾" color="#8b5cf6" onPress={play} />
          <ActionButton label="Uyu" icon="😴" color="#0ea5e9" onPress={sleep} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  title: {
    color: '#38bdf8',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 1,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  statsCard: {
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xpBarContainer: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  xpLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  xpLabel: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  xpValue: {
    color: '#cbd5e1',
    fontSize: 13,
    fontWeight: '600',
  },
  xpBackground: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    backgroundColor: '#38bdf8',
    borderRadius: 4,
  }
});
