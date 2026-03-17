import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Badge } from '../types';

interface BadgeCardProps {
  badge: Badge;
  hasEarned: boolean;
}

export const BadgeCard: React.FC<BadgeCardProps> = ({ badge, hasEarned }) => {
  return (
    <View style={[styles.container, !hasEarned && styles.unearned]}>
      <Text style={[styles.icon, !hasEarned && styles.unearnedIcon]}>
        {hasEarned ? badge.icon : '🔒'}
      </Text>
      <Text style={[styles.name, !hasEarned && styles.unearnedText]}>
        {badge.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#334155',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '47%',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#4ade80',
    shadowColor: '#4ade80',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  unearned: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
    shadowOpacity: 0,
    elevation: 0,
  },
  icon: {
    fontSize: 40,
    marginBottom: 12,
  },
  unearnedIcon: {
    opacity: 0.3,
  },
  name: {
    color: '#f8fafc',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  unearnedText: {
    color: '#64748b',
    fontWeight: '500',
  },
});
