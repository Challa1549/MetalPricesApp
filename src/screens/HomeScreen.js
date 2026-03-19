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
        <ActivityIndicator size="large" color="#1877F2" />
        <Text style={styles.loadingText}>Fetching markets...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Market Feed</Text>
        <Text style={styles.heroSubtitle}>Click to see the prices of precious metals on the earth</Text>
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
    backgroundColor: '#F0F2F5', // Facebook Gray 
  },
  heroSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EB'
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#050505', // FB Black
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#65676B', // FB Dark Gray
    marginTop: 4,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F2F5'
  },
  loadingText: {
    marginTop: 15,
    color: '#65676B',
    fontSize: 14,
    fontWeight: '500'
  },
  listContent: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 40
  }
});
