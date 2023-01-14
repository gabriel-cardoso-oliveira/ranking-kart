import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Text, View } from '../components/Themed';
import { LogList, RootStackScreenProps, RankingList } from '../types';
import { getLogs } from '../database/services/LogService';

export default function Home({ navigation }: RootStackScreenProps<'Home'>) {
  const [logs, setLogs] = useState<LogList[]>([]);
  const [ranking, setRanking] = useState<RankingList[]>([]);
  // const rankingItem = () => (
  //   <View
  //     style={styles.card}
  //     lightColor="#eee"
  //     darkColor="rgba(255,255,255,0.1)"
  //   >
  //     <Text style={styles.title}>Home</Text>
  //   </View>
  // );

  const fetchLogs = async () => {
    const { status, data, message } = await getLogs();

    if (status) setLogs(data);
    else Alert.alert('Registros', message);
  };

  useFocusEffect(useCallback(() => {
    fetchLogs();
  }, []));

  const rankingCalculate = async () => {
    const pilotsIds = logs.map((log) => log.pilot_id);
    const pilots = pilotsIds.filter((log, index) => pilotsIds.indexOf(log) === index);

    const resutl = pilots.map(((pilot): RankingList => {
      const pilotLogs = logs.filter(log => log.pilot_id === pilot);

      return {
        placing: 0,
        pilot_name: '',
        pilot_id: '',
        total_time: '',
        laps_completed: '',
      };
    }));
  };

  useEffect(() => {
    rankingCalculate();
  }, [logs]);

  return (
    <View style={styles.container}>
      <View
        style={styles.card}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      >
        <Text style={styles.position}>1°</Text>
        <View style={styles.bodyCard}>
          <Text style={styles.name}>033 - Gabriel Cardoso</Text>
          <View style={styles.containerText}>
            <Text style={styles.text}>Voltas completadas:</Text>
            <Text style={styles.value}>4</Text>
          </View>
          <View style={styles.containerText}>
            <Text style={styles.text}>Tempo total de prova:</Text>
            <Text style={styles.value}>4</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  card: {
    flex: 1,
    borderRadius: 15,
    marginVertical: 20,
    padding: 20,
    width: '100%',
    maxHeight: 160,
    flexDirection:'row',
  },
  bodyCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  position: {
    fontSize: 90,
    fontWeight: 'bold',
    marginRight: '4%'
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: '4%',
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: '2%',
  },
  containerText: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
});
