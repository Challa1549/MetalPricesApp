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
    // Navigate to DetailsScreen and pass the specific metal's loaded data
    navigation.navigate('Details', { metal: metalData });
  };

  if (loadingList) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
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
    backgroundColor: '#121212',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212'
  },
  loadingText: {
    marginTop: 15,
    color: '#A0A0A0',
    fontSize: 16
  },
  listContent: {
    padding: 16,
    paddingBottom: 40
  }
});
