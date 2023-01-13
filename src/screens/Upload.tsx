import { StyleSheet, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function Upload({ navigation }: RootStackScreenProps<'Upload'>) {
  const readFile = async (uri: string) => {
    const children = await FileSystem.readAsStringAsync(uri);
    const lines = String(children).replace(/[\n|\n\r]+/g, '#').split('#');
    lines.forEach((line: string) => {
      const data = line.replace(/\s+/g, '#').split('#');
      console.log(data);
    });
  };

  const pickDocument = async () => {
    const document = await DocumentPicker.getDocumentAsync({ type: 'application/octet-stream' });

    if (document.type === 'success') readFile(document.uri);
    else alert('Falha ao selecionar o arquivo. Tente novamente!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title='Home' onPress={pickDocument} />
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
