import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface StatBarProps {
  label: string;
  value: number; // 0-100
  color: string;
}

export const StatBar: React.FC<StatBarProps> = ({ label, value, color }) => {
  const animatedWidth = useRef(new Animated.Value(value)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: value,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [value]);

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{Math.round(value)}/100</Text>
      </View>
      <View style={styles.barBackground}>
        <Animated.View
          style={[
            styles.barFill,
            {
              backgroundColor: color,
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
                extrapolate: 'clamp'
              })
            }
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  value: {
    color: '#cbd5e1',
    fontSize: 12,
    fontWeight: '600',
  },
  barBackground: {
    height: 14,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 7,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 7,
  },
});
