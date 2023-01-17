import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Platform,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';

import { Text, View } from '../../components/Themed';
import { RootStackScreenProps, LogList } from '../../types';
import { getPilotLogs } from '../../database/services/LogService';
import styles from './styles';

export default function Detail({ navigation, route }: RootStackScreenProps<'Detail'>) {
  const { pilotId } = route.params;

  const [logs, setLogs] = useState<LogList[]>([]);

  const fetchLogs = async () => {
    const { status, data, message } = await getPilotLogs(pilotId);

    if (status) setLogs(data);
    else Alert.alert('Registros', message);
  };

  useEffect(() => {
    fetchLogs();
  }, [pilotId]);

  const logItem = ({ item }: { item: LogList }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
      <View
        style={styles.card}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      >
        <View style={styles.containerText}>
          <Text style={styles.text}>Nº Volta:</Text>
          <Text style={styles.value}>{item.lap_number}</Text>
        </View>
        <View style={styles.containerText}>
          <Text style={styles.text}>Tempo da volta:</Text>
          <Text style={styles.value}>{item.back_time}</Text>
        </View>
        <View style={styles.containerText}>
          <Text style={styles.text}>Velocidade média da volta:</Text>
          <Text style={styles.value}>{item.average_lap_speed}</Text>
        </View>
        <View style={styles.containerText}>
          <Text style={styles.text}>Hora:</Text>
          <Text style={styles.value}>{item.hour}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={logs}
        renderItem={logItem}
        keyExtractor={log => String(log._id)}
      />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
