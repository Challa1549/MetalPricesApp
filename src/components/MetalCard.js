import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { fetchMetalLiveData } from '../services/api';

export default function MetalCard({ metalInfo, onPress }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
          <ActivityIndicator size="small" color="#1877F2" />
          <Text style={styles.loadingText}>Loading price...</Text>
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.stateContainer}>
          <Text style={styles.errorText}>Unable to connect.</Text>
          <TouchableOpacity onPress={loadData}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const diff = data.currentPrice - data.previousClose;
    const isUp = diff >= 0;
    const diffPercent = Math.abs((diff / data.previousClose) * 100).toFixed(2);
    const priceColor = isUp ? '#00A400' : '#FA383E'; // FB green/red approximations

    return (
      <View style={styles.postContent}>
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>
            ₹{data.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
          <Text style={styles.unitText}> / {data.unit}</Text>
        </View>

        <Text style={[styles.changeText, { color: priceColor }]}>
          {isUp ? '▲' : '▼'} ₹{Math.abs(diff).toLocaleString('en-IN', {minimumFractionDigits: 2})} ({diffPercent}%) Today
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity 
        activeOpacity={0.8} 
        onPress={() => !loading && !error && onPress(data)}
        disabled={loading || error}
      >
        <View style={styles.postHeader}>
          <Image source={{ uri: metalInfo.image }} style={styles.avatar} />
          <View style={styles.headerText}>
            <Text style={styles.title}>{metalInfo.name}</Text>
            <Text style={styles.timestamp}>
              {data && !loading ? new Date(data.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : 'Fetching time...'} • 🌎
            </Text>
          </View>
        </View>

        {renderContent()}

        <View style={styles.divider} />
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton} onPress={() => !loading && !error && onPress(data)}>
            <Text style={styles.actionText}>👍 Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => !loading && !error && onPress(data)}>
            <Text style={styles.actionText}>💬 Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => !loading && !error && onPress(data)}>
            <Text style={styles.actionText}>📄 Details</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    paddingTop: 12,
    borderWidth: 1,
    borderColor: '#E4E6EB',
    borderRadius: 8,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#E4E6EB',
  },
  headerText: {
    flex: 1,
  },
  title: {
    color: '#050505',
    fontSize: 16,
    fontWeight: '600',
  },
  timestamp: {
    color: '#65676B',
    fontSize: 13,
    marginTop: 2,
  },
  postContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceText: {
    color: '#050505',
    fontSize: 28,
    fontWeight: '700',
  },
  unitText: {
    fontSize: 15,
    color: '#65676B',
    fontWeight: 'normal',
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  stateContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#65676B',
    fontSize: 14,
  },
  errorText: {
    color: '#FA383E',
    fontSize: 14,
  },
  retryText: {
    color: '#1877F2',
    fontWeight: '600',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#E4E6EB',
    marginHorizontal: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  actionText: {
    color: '#65676B',
    fontSize: 14,
    fontWeight: '600',
  }
});
