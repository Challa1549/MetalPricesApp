import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import { fetchMetalsList } from '../services/api';
import MetalCard from '../components/MetalCard';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
  const [metals, setMetals] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

  useEffect(() => {
    loadMetals();
  }, []);

  const loadMetals = async () => {
    try {
      const data = await fetchMetalsList();
      setMetals(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingList(false);
    }
  };

  const handlePressMetal = (metalData) => {
    navigation.navigate('Details', { metal: metalData });
  };

  if (loadingList) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#D4AF37" />
        <Text style={styles.loadingText}>Loading Commodities...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Asset Allocation</Text>
        <Text style={styles.headerSubtitle}>LIVE COMMODITY INDEX</Text>
      </View>
      <FlatList
        data={metals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MetalCard 
            metalInfo={item} 
            onPress={handlePressMetal} 
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '300',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#8A8A8A',
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: 6,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  loadingText: {
    marginTop: 15,
    color: '#8A8A8A',
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40
  }
});
