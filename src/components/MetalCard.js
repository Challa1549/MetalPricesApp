import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { fetchMetalLiveData } from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function MetalCard({ metalInfo, onPress }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Animations
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });

  const handlePressIn = () => { scale.value = withSpring(0.97); };
  const handlePressOut = () => { scale.value = withSpring(1); };

  useEffect(() => {
    loadData();
  }, [metalInfo.id]);

  const loadData = async () => {
    setLoading(true);
    setError(false);
    try {
      const liveData = await fetchMetalLiveData(metalInfo.id);
      setData(liveData);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.stateContainer}>
          <ActivityIndicator size="small" color={metalInfo.color} />
          <Text style={styles.loadingText}>Fetching live price...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.stateContainer}>
          <Text style={styles.errorText}>Failed to load data.</Text>
          <TouchableOpacity onPress={loadData} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // Success State
    const isUp = data.currentPrice >= data.previousClose;
    const priceColor = isUp ? '#4CAF50' : '#F44336';
    const timeString = new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <View style={styles.dataContainer}>
        <Text style={styles.priceText}>${data.currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <Text style={styles.unitText}>/ {data.unit}</Text></Text>
        <View style={styles.bottomRow}>
          <Text style={[styles.changeText, { color: priceColor }]}>
            {isUp ? '▲' : '▼'} {Math.abs(data.currentPrice - data.previousClose).toFixed(2)}
          </Text>
          <Text style={styles.timeText}>Updated: {timeString}</Text>
        </View>
      </View>
    );
  };

  return (
    <Animated.View entering={FadeInUp.duration(500).delay(200)} style={[styles.cardWrapper, animatedStyle]}>
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => !loading && !error && onPress(data)}
        disabled={loading || error}
      >
        {/* Glow / Light up border concept using a carefully placed gradient wrapper */}
        <LinearGradient
          colors={metalInfo.gradient || ['#333', '#111']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <View style={styles.innerCard}>
            <Image 
              source={{ uri: metalInfo.image }} 
              style={styles.backgroundImage} 
              blurRadius={10} 
            />
            <View style={styles.overlay} />
            
            <View style={styles.header}>
              <View style={styles.titleRow}>
                <View style={[styles.colorDot, { backgroundColor: metalInfo.color }]} />
                <Text style={styles.title}>{metalInfo.name}</Text>
              </View>
              <Text style={styles.symbol}>{metalInfo.symbol}</Text>
            </View>

            {renderContent()}

          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  gradientBorder: {
    borderRadius: 24,
    padding: 2, 
  },
  innerCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 22,
    minHeight: 160,
    overflow: 'hidden',
    padding: 20,
    justifyContent: 'space-between',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(30,30,30,0.5)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  symbol: {
    color: '#A0A0A0',
    fontSize: 16,
    fontWeight: '600',
  },
  stateContainer: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  loadingText: {
    marginTop: 10,
    color: '#E0E0E0',
    fontSize: 14,
  },
  errorText: {
    color: '#FF5252',
    fontSize: 14,
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  retryText: {
    color: '#FFF',
    fontWeight: '600',
  },
  dataContainer: {
    zIndex: 1,
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  unitText: {
    fontSize: 16,
    color: '#A0A0A0',
    fontWeight: 'normal',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  timeText: {
    color: '#A0A0A0',
    fontSize: 12,
  }
});
