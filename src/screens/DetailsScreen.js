import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function DetailsScreen({ route }) {
  const { metal } = route.params;

  const isUp = metal.currentPrice >= metal.previousClose;
  const priceColor = isUp ? '#4CAF50' : '#F44336';
  
  const dateObj = new Date(metal.timestamp);
  const dateString = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  const timeString = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Animated.View entering={FadeInDown.duration(600)} style={styles.imageContainer}>
        <Image source={{ uri: metal.image }} style={styles.heroImage} />
        <LinearGradient 
          colors={['transparent', '#121212']} 
          style={styles.imageGradient} 
        />
      </Animated.View>

      <Animated.View entering={FadeInUp.duration(600).delay(200)} style={styles.headerInfo}>
        <Text style={styles.title}>{metal.name}</Text>
        <Text style={styles.symbol}>{metal.symbol}</Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.duration(600).delay(300)} style={styles.priceSection}>
        <Text style={styles.label}>Current Price</Text>
        <Text style={styles.currentPrice}>${metal.currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
        <Text style={[styles.changeText, { color: priceColor }]}>
          {isUp ? '▲' : '▼'} {Math.abs(metal.currentPrice - metal.previousClose).toFixed(2)} Today
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.duration(600).delay(400)} style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Previous Close</Text>
          <Text style={styles.statValue}>${metal.previousClose.toLocaleString()}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Previous Open</Text>
          <Text style={styles.statValue}>${metal.previousOpen.toLocaleString()}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Date</Text>
          <Text style={styles.statValue}>{dateString}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Time</Text>
          <Text style={styles.statValue}>{timeString}</Text>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInUp.duration(600).delay(500)} style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>About {metal.name}</Text>
        <Text style={styles.aboutText}>{metal.description}</Text>
      </Animated.View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    paddingBottom: 40,
  },
  imageContainer: {
    height: 300,
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
    height: 150,
  },
  headerInfo: {
    paddingHorizontal: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 36,
    color: '#FFF',
    fontWeight: '800',
    letterSpacing: 1,
  },
  symbol: {
    fontSize: 18,
    color: '#A0A0A0',
    fontWeight: '600',
    marginTop: 4,
  },
  priceSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  label: {
    color: '#A0A0A0',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  currentPrice: {
    fontSize: 48,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  changeText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    marginTop: 30,
  },
  statBox: {
    width: '50%',
    padding: 10,
    marginBottom: 10,
  },
  statLabel: {
    color: '#888',
    fontSize: 13,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  aboutSection: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#E0E0E0',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
  },
  aboutText: {
    color: '#A0A0A0',
    fontSize: 16,
    lineHeight: 24,
  }
});
