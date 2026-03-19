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
        <ActivityIndicator size="large" color="#1E1E1E" />
        <Text style={styles.loadingText}>Initializing Market Data...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
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
    backgroundColor: '#F5F7FA',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA'
  },
  loadingText: {
    marginTop: 15,
    color: '#757575',
    fontSize: 16,
    fontWeight: '500'
  },
  listContent: {
    padding: 16,
    paddingBottom: 40
  }
});
