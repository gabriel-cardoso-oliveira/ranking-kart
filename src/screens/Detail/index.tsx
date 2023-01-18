import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Platform,
  TouchableOpacity,
  Alert,
  FlatList,
  SafeAreaView,
  TextInput,
} from 'react-native';

import { Text, View } from '../../components/Themed';
import Modal from '../../components/StyledModal';
import { RootStackScreenProps, LogList, UpdateLog } from '../../types';
import { getPilotLogs, updateLog } from '../../database/services/LogService';
import styles from './styles';

export default function Detail({ route }: RootStackScreenProps<'Detail'>) {
  const { pilotId } = route.params;

  const [logs, setLogs] = useState<LogList[]>([]);
  const [logSelected, setLogSelected] = useState<LogList>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [backTime, setBackTime] = useState('');
  const [averageLapSpeed, setAverageLapSpeed] = useState('');
  const [hour, setHour] = useState('');

  const fetchLogs = async () => {
    const { status, data, message } = await getPilotLogs(pilotId);

    if (status) setLogs(data);
    else Alert.alert('Registros', message);
  };

  useEffect(() => {
    fetchLogs();
  }, [pilotId]);

  const onOpenModel = (item: LogList) => {
    setBackTime(item.back_time);
    setAverageLapSpeed(item.average_lap_speed);
    setHour(item.hour);
    setLogSelected(item);

    setIsModalVisible(true);
  };

  const handleLapEditing = async () => {
    if (!backTime || !averageLapSpeed || !hour) {
      Alert.alert('Volta', 'É necessário preencher todos os campos');
    } else {
      const data: UpdateLog = {
        average_lap_speed: averageLapSpeed,
        back_time: backTime,
        hour,
      };

      const logId = String(logSelected!._id);

      const { status, message } = await updateLog(
        logId,
        data,
      );

      if (status) {
        fetchLogs();
        setIsModalVisible(false);
      } else Alert.alert('Volta', message);
    }
  };

  const logItem = ({ item }: { item: LogList }) => (
    <TouchableOpacity onPress={() => onOpenModel(item)}>
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
      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title='Editar volta'
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.containerForm}>
            <View style={styles.containerInput}>
              <Text style={styles.label}>Tempo da volta</Text>
              <TextInput
                value={backTime}
                onChangeText={(backTime) => setBackTime(backTime)}
                placeholder={'Tempo da volta'}
                keyboardType='numeric'
                style={styles.input}
              />
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.label}>
                Velocidade média da volta
              </Text>
              <TextInput
                value={averageLapSpeed}
                onChangeText={
                  (averageLapSpeed) => setAverageLapSpeed(averageLapSpeed)
                }
                placeholder={'Velocidade média da volta'}
                keyboardType='numeric'
                style={styles.input}
              />
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.label}>Hora</Text>
              <TextInput
                value={hour}
                onChangeText={(hour) => setHour(hour)}
                placeholder={'Hora'}
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleLapEditing}
            >
              <Text style={styles.textButton}>Atualizar</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
