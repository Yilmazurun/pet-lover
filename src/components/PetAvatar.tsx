import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { PetState } from '../types';

interface PetAvatarProps {
  pet: PetState;
}

export const PetAvatar: React.FC<PetAvatarProps> = ({ pet }) => {
  const bounceValue = useRef(new Animated.Value(0)).current;

  let moodEmoji = '😊';
  let healthStatus = 'Sağlıklı';
  let statusColor = '#4ade80';

  if (pet.energy < 20) {
    moodEmoji = '😴';
    healthStatus = 'Hasta';
    statusColor = '#fbbf24';
  } else if (pet.hunger < 30) {
    moodEmoji = '😡';
    healthStatus = 'Hasta';
    statusColor = '#fbbf24';
  } else if (pet.happiness < 30) {
    moodEmoji = '😢';
    healthStatus = 'Hasta';
    statusColor = '#fbbf24';
  }

  if (pet.hunger < 15 || pet.energy < 15 || pet.happiness < 15) {
      healthStatus = 'Kritik';
      statusColor = '#ef4444';
  }

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -15,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.avatarContainer, { borderColor: statusColor, borderWidth: 4 }]}>
        <Animated.View style={{ transform: [{ translateY: bounceValue }] }}>
            <Text style={styles.emoji}>{moodEmoji}</Text>
        </Animated.View>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.name}>{pet.name}</Text>
        <Text style={styles.type}>{pet.type} • Lvl {pet.level}</Text>
        <View style={styles.statusBadge}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.statusText, { color: statusColor }]}>{healthStatus}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
    marginBottom: 16,
  },
  emoji: {
    fontSize: 72,
  },
  infoBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    color: '#cbd5e1',
    fontWeight: '500',
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
  }
});
