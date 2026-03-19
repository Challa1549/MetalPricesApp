import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function DetailsScreen({ route }) {
  const { metal } = route.params;

  const diff = metal.currentPrice - metal.previousClose;
  const isUp = diff >= 0;
  const priceColor = isUp ? '#00A400' : '#FA383E';
  const diffPercent = Math.abs((diff / metal.previousClose) * 100).toFixed(2);
  
  const dateObj = new Date(metal.timestamp);
  const dateString = dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const timeString = dateObj.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <Image source={{ uri: metal.image }} style={styles.avatar} />
          <View style={styles.headerText}>
            <Text style={styles.title}>{metal.name}</Text>
            <Text style={styles.timestamp}>{dateString} at {timeString} • 🌎</Text>
          </View>
        </View>
        
        <View style={styles.description}>
          <Text style={styles.bodyText}>{metal.description}</Text>
        </View>

        <Image source={{ uri: metal.image }} style={styles.largeImage} />
        
        <View style={styles.statsContainer}>
          <View style={styles.mainPriceBlock}>
            <Text style={styles.priceText}>
              ₹{metal.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <Text style={styles.unitText}> / gram</Text>
            </Text>
            <Text style={[styles.changeText, { color: priceColor }]}>
              {isUp ? '▲' : '▼'} ₹{Math.abs(diff).toLocaleString('en-IN', {minimumFractionDigits: 2})} ({diffPercent}%)
            </Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.metricsGrid}>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Previous Close</Text>
              <Text style={styles.metricValue}>₹{metal.previousClose.toLocaleString('en-IN', {minimumFractionDigits: 2})}</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Previous Open</Text>
              <Text style={styles.metricValue}>₹{metal.previousOpen.toLocaleString('en-IN', {minimumFractionDigits: 2})}</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Symbol</Text>
              <Text style={styles.metricValue}>{metal.symbol}</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Currency</Text>
              <Text style={styles.metricValue}>{metal.currency}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />
        <View style={styles.actionRow}>
          <Text style={styles.actionText}>👍 Like</Text>
          <Text style={styles.actionText}>💬 Comment</Text>
          <Text style={styles.actionText}>🔗 Share</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5', // FB background
  },
  content: {
    paddingVertical: 10,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E4E6EB',
    paddingVertical: 12,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E4E6EB',
    marginRight: 10,
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
  description: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  bodyText: {
    color: '#050505',
    fontSize: 15,
    lineHeight: 20,
  },
  largeImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  statsContainer: {
    padding: 16,
  },
  mainPriceBlock: {
    marginBottom: 12,
  },
  priceText: {
    color: '#050505',
    fontSize: 32,
    fontWeight: '700',
  },
  unitText: {
    fontSize: 16,
    color: '#65676B',
    fontWeight: 'normal',
  },
  changeText: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#E4E6EB',
    marginHorizontal: 16,
    marginVertical: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  metric: {
    width: '50%',
    paddingVertical: 8,
  },
  metricLabel: {
    color: '#65676B',
    fontSize: 13,
    marginBottom: 2,
  },
  metricValue: {
    color: '#050505',
    fontSize: 15,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  actionText: {
    color: '#65676B',
    fontSize: 14,
    fontWeight: '600',
  }
});
