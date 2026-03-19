import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function DetailsScreen({ route }) {
  const { metal } = route.params;

  const diff = metal.currentPrice - metal.previousClose;
  const isUp = diff >= 0;
  const priceColor = isUp ? '#00E676' : '#FF5252';
  const diffPercent = Math.abs((diff / metal.previousClose) * 100).toFixed(2);
  
  const dateObj = new Date(metal.timestamp);
  const dateString = dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const timeString = dateObj.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      <Animated.View entering={FadeInUp.duration(600)} style={styles.imageContainer}>
        <Image source={{ uri: metal.image }} style={styles.heroImage} />
        <LinearGradient 
          colors={['transparent', '#000000']} 
          style={styles.imageGradient} 
        />
        <View style={styles.headerAbsolute}>
          <Text style={styles.headlineTitle}>{metal.name}</Text>
          <Text style={styles.headlineSymbol}>{metal.symbol}</Text>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInUp.duration(600).delay(150)} style={styles.mainMetrics}>
        <Text style={styles.currentPrice}>
          <Text style={styles.currencySymbol}>₹</Text>
          {metal.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
        <Text style={[styles.priceChange, { color: priceColor }]}>
          {isUp ? '+' : '-'}₹{Math.abs(diff).toLocaleString('en-IN', {minimumFractionDigits: 2})} ({diffPercent}%)
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.duration(600).delay(250)} style={styles.statsPanel}>
        <Text style={styles.panelTitle}>MARKET DATA</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>PREV CLOSE</Text>
            <Text style={styles.statValue}>₹{metal.previousClose.toLocaleString('en-IN', {minimumFractionDigits: 2})}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>OPEN</Text>
            <Text style={styles.statValue}>₹{metal.previousOpen.toLocaleString('en-IN', {minimumFractionDigits: 2})}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>UNIT</Text>
            <Text style={styles.statValue}>1 {metal.unit.toUpperCase()}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>LAST UPDATED</Text>
            <Text style={styles.statValue}>{timeString}</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInUp.duration(600).delay(350)} style={styles.aboutSection}>
        <Text style={styles.panelTitle}>ASSET PROFILE</Text>
        <Text style={styles.aboutText}>{metal.description}</Text>
      </Animated.View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    paddingBottom: 50,
  },
  imageContainer: {
    height: 320,
    width: '100%',
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.6,
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
  },
  headerAbsolute: {
    position: 'absolute',
    bottom: 24,
    left: 24,
  },
  headlineTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '300',
    letterSpacing: 1,
  },
  headlineSymbol: {
    color: '#8A8A8A',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: 4,
  },
  mainMetrics: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
  },
  currentPrice: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '200',
    fontVariant: ['tabular-nums'],
  },
  currencySymbol: {
    fontSize: 28,
    color: '#8A8A8A',
  },
  priceChange: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
    fontVariant: ['tabular-nums'],
  },
  statsPanel: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  panelTitle: {
    color: '#404040',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#141414',
  },
  statBox: {
    width: '50%',
    paddingVertical: 12,
  },
  statLabel: {
    color: '#666666',
    fontSize: 11,
    letterSpacing: 1,
    marginBottom: 4,
  },
  statValue: {
    color: '#E0E0E0',
    fontSize: 15,
    fontWeight: '400',
  },
  aboutSection: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  aboutText: {
    color: '#A0A0A0',
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '300',
  }
});
