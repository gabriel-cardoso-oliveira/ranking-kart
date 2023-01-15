import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import uuid from 'react-native-uuid';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import { saveLog } from '../../database/services/LogService';
import { Text, View } from '../../components/Themed';
import UploadAnimation from '../../animations/UploadAnimation';
import { LogList, RootStackScreenProps } from '../../types';

export default function Upload({ navigation }: RootStackScreenProps<'Upload'>) {
  const [isLoading, setIsLoading] = useState(false);

  const newLogRegister = async (logs: LogList[]) => {
    const { status, message } = await saveLog(logs);

    setIsLoading(false);
    Alert.alert('Upload', message);

    if (status) navigation.navigate('Home');
  };

  const readFile = async (uri: string) => {
    const children = await FileSystem.readAsStringAsync(uri);
    const lines = String(children).trim().replace(/[\n|\n\r]+/g, '#').split('#');

    const logs = lines.map((line: string): LogList => {
      const data = line.trim().replace(/\s+/g, '#').split('#');

      return {
        _id: uuid.v4(),
        pilot_id: data[1],
        pilot: data[3],
        hour: data[0],
        lap_number: Number(data[4]),
        back_time: data[5],
        average_lap_speed: data[6],
      };
    });

    newLogRegister(logs);
  };

  const handlePickDocument = async () => {
    setIsLoading(true);

    const document = await DocumentPicker.getDocumentAsync({ type: 'application/octet-stream' });

    if (document.type === 'success') readFile(document.uri);
    else {
      setIsLoading(false);
      Alert.alert('Upload', 'Falha ao selecionar o arquivo. Tente novamente!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione o arquivo de log da corrida</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity onPress={handlePickDocument}>
        <UploadAnimation />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});