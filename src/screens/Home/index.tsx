import { useState, useCallback, useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Text, View } from '../../components/Themed';
import { LogList, RootStackScreenProps, RankingList } from '../../types';
import { getLogs } from '../../database/services/LogService';
import timeToMilliseconds from '../../utils/timeToMilliseconds';
import millisecondsToTime from '../../utils/millisecondsToTime';
import styles from './styles';

export default function Home({ navigation }: RootStackScreenProps<'Home'>) {
  const [logs, setLogs] = useState<LogList[]>([]);
  const [ranking, setRanking] = useState<RankingList[]>([]);

  const fetchLogs = async () => {
    const { status, data, message } = await getLogs();

    if (status) setLogs(data);
    else Alert.alert('Registros', message);
  };

  useFocusEffect(useCallback(() => {
    fetchLogs();
  }, []));

  const compareTimes = (first: RankingList, second: RankingList) => {
    return Number(first.total_time) - Number(second.total_time);
  };

  const rankingCalculate = (pilotResults: RankingList[]) => {
    const result = pilotResults.sort(compareTimes);

    setRanking(result.map((pilot, index) => {
      const pilotTmp: RankingList = pilot;
      pilotTmp.total_time = millisecondsToTime(
        Number(pilot.total_time)
      );
      pilotTmp.placing = index + 1;

      return pilotTmp;
    }));
  };

  const getRaceResults = () => {
    const pilotsIds = logs.map((log) => log.pilot_id);
    const pilots = pilotsIds
      .filter((log, index) => pilotsIds.indexOf(log) === index);

    const pilotResults = pilots.map((pilotId): RankingList => {
      const pilotLogs = logs.filter(log => log.pilot_id === pilotId);

      const totalTime = pilotLogs.reduce((accumulator, currentValue) => {
        return accumulator + timeToMilliseconds(currentValue.back_time);
      }, 0);
      const lapsCompleted = pilotLogs.filter(pilot => pilot.lap_number).length

      return {
        placing: 0,
        pilot_name: pilotLogs[0].pilot,
        pilot_id: pilotId,
        total_time: totalTime,
        laps_completed: lapsCompleted,
      };
    });

    rankingCalculate(pilotResults);
  };

  useEffect(() => {
    getRaceResults();
  }, [logs]);

  const rankingItem = ({ item }: { item: RankingList }) => (
    <View
      style={styles.card}
      lightColor="#eee"
      darkColor="rgba(255,255,255,0.1)"
    >
      <Text style={styles.position}>{`${item.placing}°`}</Text>
      <View style={styles.bodyCard}>
        <Text style={styles.name}>
          {`${item.pilot_id} - ${item.pilot_name}`}
        </Text>
        <View style={styles.containerText}>
          <Text style={styles.text}>Voltas completadas:</Text>
          <Text style={styles.value}>{item.laps_completed}</Text>
        </View>
        <View style={styles.containerText}>
          <Text style={styles.text}>Tempo total de prova:</Text>
          <Text style={styles.value}>{item.total_time}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={ranking}
        renderItem={rankingItem}
        keyExtractor={pilot => pilot.pilot_id}
      />
    </View>
  );
}
