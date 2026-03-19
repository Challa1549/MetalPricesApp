import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchMetalLiveData } from '../services/api';
import Animated, { FadeInUp, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function MetalCard({ metalInfo, onPress }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const handlePressIn = () => { scale.value = withTiming(0.98, { duration: 150 }); };
  const handlePressOut = () => { scale.value = withTiming(1, { duration: 150 }); };

  useEffect(() => { loadData(); }, [metalInfo.id]);

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
          <ActivityIndicator size="small" color="#D4AF37" />
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.stateContainer}>
          <TouchableOpacity onPress={loadData} style={styles.retryButton}>
            <Text style={styles.retryText}>REFRESH</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const diff = data.currentPrice - data.previousClose;
    const isUp = diff >= 0;
    const diffPercent = Math.abs((diff / data.previousClose) * 100).toFixed(2);
    const priceColor = isUp ? '#00E676' : '#FF5252'; 

    return (
      <View style={styles.metricsContainer}>
        <View style={styles.priceColumn}>
          <Text style={styles.currentPrice}>
            ₹{data.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
        </View>
        <View style={styles.changeColumn}>
          <Text style={[styles.changeText, { color: priceColor }]}>
            {isUp ? '+' : '-'}₹{Math.abs(diff).toLocaleString('en-IN', {minimumFractionDigits: 2})}
          </Text>
          <Text style={[styles.percentText, { color: priceColor }]}>
            {isUp ? '▲' : '▼'} {diffPercent}%
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Animated.View entering={FadeInUp.duration(600).delay(100)} style={[styles.cardWrapper, animatedStyle]}>
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => !loading && !error && onPress(data)}
        disabled={loading || error}
      >
        <View style={styles.card}>
          <View style={[styles.colorBar, { backgroundColor: metalInfo.color }]} />
          
          <View style={styles.cardContent}>
            <View style={styles.header}>
              <Text style={styles.title}>{metalInfo.name}</Text>
              <Text style={styles.symbol}>{metalInfo.symbol}</Text>
            </View>

            {renderContent()}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#0F0F0F',
    borderRadius: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1A1A1A',
  },
  colorBar: {
    width: 4,
    height: '100%',
  },
  cardContent: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  symbol: {
    color: '#666666',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginTop: 4,
  },
  stateContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  retryButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 4,
  },
  retryText: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  metricsContainer: {
    alignItems: 'flex-end',
  },
  currentPrice: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '300',
    fontVariant: ['tabular-nums'],
  },
  changeColumn: {
    alignItems: 'flex-end',
    marginTop: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '500',
    fontVariant: ['tabular-nums'],
  },
  percentText: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  }
});
