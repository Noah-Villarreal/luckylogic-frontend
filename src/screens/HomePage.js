import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LuckyLogic</Text>
      <Button title="Powerball" onPress={() => navigation.navigate('Powerball')} />
      <Button title="Leaderboard" onPress={() => navigation.navigate('Leaderboard')} />
    </View>
  );
}

function PowerballScreen() {
  const [picks, setPicks] = useState([]);
  const [history, setHistory] = useState([]);

  const generateRandomPicks = () => {
    let numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 69) + 1);
    }
    let powerball = Math.floor(Math.random() * 26) + 1;
    const newPick = [...numbers, powerball];
    setPicks(newPick);
    savePickToHistory(newPick);
  };

  const savePickToHistory = async (newPick) => {
    try {
      const historyJson = await AsyncStorage.getItem('pickHistory');
      const currentHistory = historyJson ? JSON.parse(historyJson) : [];
      const updatedHistory = [newPick, ...currentHistory].slice(0, 100);
      await AsyncStorage.setItem('pickHistory', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
    } catch (e) {
      console.error('❌ Error saving pick:', e);
    }
  };

  const loadPickHistory = async () => {
    try {
      const historyJson = await AsyncStorage.getItem('pickHistory');
      const storedHistory = historyJson ? JSON.parse(historyJson) : [];
      setHistory(storedHistory);
    } catch (e) {
      console.error('❌ Error loading history:', e);
    }
  };

  useEffect(() => {
    loadPickHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Powerball Picker</Text>
      <Button title="Generate Pick" onPress={generateRandomPicks} />
      {picks.length > 0 && (
        <Text style={styles.picks}>Current: {picks.join(', ')}</Text>
      )}
      <ScrollView style={styles.historyBox}>
        {history.slice(0, 5).map((pick, index) => (
          <Text key={index} style={styles.historyItem}>
            {pick.join(', ')}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

function LeaderboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <Text>Coming soon: Top Picks, Win Streaks, Most Favorites</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Powerball" component={PowerballScreen} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  picks: { fontSize: 18, marginVertical: 10 },
  historyBox: { marginTop: 20 },
  historyItem: { fontSize: 16, marginVertical: 4 },
});