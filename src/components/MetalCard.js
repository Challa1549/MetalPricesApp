import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { fetchMetalLiveData } from '../services/api';
import Animated, { FadeInUp, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function MetalCard({ metalInfo, onPress }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const handlePressIn = () => { scale.value = withSpring(0.96); };
  const handlePressOut = () => { scale.value = withSpring(1); };

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
          <ActivityIndicator size="small" color={metalInfo.color} />
          <Text style={styles.loadingText}>Fetching live price...</Text>
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.stateContainer}>
          <Text style={styles.errorText}>Data feed unavailable.</Text>
          <TouchableOpacity onPress={loadData} style={styles.retryButton}>
            <Text style={styles.retryText}>Tap to Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const diff = data.currentPrice - data.previousClose;
    const isUp = diff >= 0;
    const diffPercent = Math.abs((diff / data.previousClose) * 100).toFixed(2);
    const priceColor = isUp ? '#00A65A' : '#E53935'; 

    return (
      <View style={styles.dataContainer}>
        <Text style={styles.priceText}>
          ₹{data.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          <Text style={styles.unitText}> / {data.unit}</Text>
        </Text>
        <View style={styles.bottomRow}>
          <View style={[styles.badge, { backgroundColor: isUp ? '#E8F5E9' : '#FFEBEE' }]}>
            <Text style={[styles.changeText, { color: priceColor }]}>
              {isUp ? '▲' : '▼'} ₹{Math.abs(diff).toLocaleString('en-IN', {minimumFractionDigits: 2})} ({diffPercent}%)
            </Text>
          </View>
          <Text style={styles.timeText}>
            {new Date(data.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Animated.View entering={FadeInUp.duration(400).delay(150)} style={[styles.cardWrapper, animatedStyle]}>
      <TouchableOpacity 
        activeOpacity={1} 
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => !loading && !error && onPress(data)}
        disabled={loading || error}
      >
        <View style={[styles.innerCard, { borderLeftColor: metalInfo.color, borderLeftWidth: 4 }]}>
          <View style={styles.cardHeader}>
            <View style={styles.titleRow}>
              <Image source={{ uri: metalInfo.image }} style={styles.metalIcon} />
              <View>
                <Text style={styles.title}>{metalInfo.name}</Text>
                <Text style={styles.symbol}>{metalInfo.symbol}</Text>
              </View>
            </View>
          </View>
          {renderContent()}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  innerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    minHeight: 140,
    justifyContent: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metalIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  title: {
    color: '#1E1E1E',
    fontSize: 18,
    fontWeight: '700',
  },
  symbol: {
    color: '#757575',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  stateContainer: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#9E9E9E',
    fontSize: 14,
  },
  errorText: {
    color: '#E53935',
    fontSize: 14,
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryText: {
    color: '#1E1E1E',
    fontWeight: '600',
    fontSize: 13,
  },
  dataContainer: {
    marginTop: 4,
  },
  priceText: {
    color: '#1E1E1E',
    fontSize: 28,
    fontWeight: '800',
  },
  unitText: {
    fontSize: 15,
    color: '#757575',
    fontWeight: '500',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  changeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  timeText: {
    color: '#9E9E9E',
    fontSize: 12,
    fontWeight: '500',
  }
});
