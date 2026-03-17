import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

interface ActionButtonProps {
  label: string;
  icon: string;
  onPress: () => void;
  color: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ label, icon, onPress, color }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    Animated.sequence([
      Animated.timing(floatAnim, { toValue: -60, duration: 600, useNativeDriver: true }),
      Animated.timing(floatAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
    ]).start();

    onPress();
  };

  const getFloatingLabel = () => {
    if (icon === '🍖') return '+10';
    if (icon === '🎾') return '❤️';
    if (icon === '😴') return '💤';
    return '✨';
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress} style={styles.container}>
      <Animated.View style={[styles.button, { backgroundColor: color, transform: [{ scale }] }]}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.label}>{label}</Text>
        
        <Animated.Text style={[styles.floatingIcon, { 
            transform: [{ translateY: floatAnim }],
            opacity: floatAnim.interpolate({
                inputRange: [-60, -30, 0],
                outputRange: [0, 1, 0],
            })
        }]}>
            {getFloatingLabel()}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8,
  },
  button: {
    paddingVertical: 18,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    position: 'relative',
  },
  icon: {
    fontSize: 32,
    marginBottom: 6,
  },
  label: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  floatingIcon: {
      position: 'absolute',
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      top: -10,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: 0, height: 1},
      textShadowRadius: 2,
  }
});
