import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function DetailsScreen({ route }) {
  const { metal } = route.params;

  const diff = metal.currentPrice - metal.previousClose;
  const isUp = diff >= 0;
  const priceColor = isUp ? '#00A65A' : '#E53935';
  const diffPercent = Math.abs((diff / metal.previousClose) * 100).toFixed(2);
  
  const dateObj = new Date(metal.timestamp);
  const dateString = dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const timeString = dateObj.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Animated.View entering={FadeInDown.duration(600)} style={styles.imageContainer}>
        <Image source={{ uri: metal.image }} style={styles.heroImage} />
        <LinearGradient 
          colors={['transparent', '#F5F7FA']} 
          style={styles.imageGradient} 
        />
      </Animated.View>

      <Animated.View entering={FadeInUp.duration(500).delay(200)} style={styles.headerInfo}>
        <Text style={styles.title}>{metal.name}</Text>
        <Text style={styles.symbol}>{metal.symbol}</Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.duration(500).delay(300)} style={styles.priceSection}>
        <Text style={styles.label}>Live Price</Text>
        <Text style={styles.currentPrice}>₹{metal.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
        <View style={[styles.badgeContainer, { backgroundColor: isUp ? '#E8F5E9' : '#FFEBEE' }]}>
          <Text style={[styles.changeText, { color: priceColor }]}>
            {isUp ? '▲' : '▼'} ₹{Math.abs(diff).toLocaleString('en-IN', {minimumFractionDigits: 2})} ({diffPercent}%)
          </Text>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInUp.duration(500).delay(400)} style={styles.statsCard}>
        <Text style={styles.cardTitle}>Market Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Previous Close</Text>
            <Text style={styles.statValue}>₹{metal.previousClose.toLocaleString('en-IN', {minimumFractionDigits: 2})}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Previous Open</Text>
            <Text style={styles.statValue}>₹{metal.previousOpen.toLocaleString('en-IN', {minimumFractionDigits: 2})}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Last Updated</Text>
            <Text style={styles.statValue}>{dateString}, {timeString}</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInUp.duration(500).delay(500)} style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>About {metal.name}</Text>
        <Text style={styles.aboutText}>{metal.description}</Text>
      </Animated.View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    paddingBottom: 50,
  },
  imageContainer: {
    height: 280,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  headerInfo: {
    paddingHorizontal: 20,
    marginTop: -30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#1E1E1E',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  symbol: {
    fontSize: 16,
    color: '#757575',
    fontWeight: '600',
    marginTop: 4,
  },
  priceSection: {
    marginTop: 24,
    alignItems: 'center',
  },
  label: {
    color: '#757575',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
    fontWeight: '600',
  },
  currentPrice: {
    fontSize: 42,
    color: '#1E1E1E',
    fontWeight: '800',
  },
  badgeContainer: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  changeText: {
    fontSize: 15,
    fontWeight: '700',
  },
  statsCard: {
    marginTop: 32,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 16,
  },
  statsGrid: {
    width: '100%',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  statLabel: {
    color: '#757575',
    fontSize: 15,
    fontWeight: '500',
  },
  statValue: {
    color: '#1E1E1E',
    fontSize: 15,
    fontWeight: '600',
  },
  aboutSection: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    color: '#1E1E1E',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  aboutText: {
    color: '#616161',
    fontSize: 16,
    lineHeight: 24,
  }
});
