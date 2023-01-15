import { StatusBar } from 'expo-status-bar';
import { Platform, Button } from 'react-native';

import { Text, View } from '../../components/Themed';
import { RootStackScreenProps } from '../../types';
import styles from './styles';

export default function Edit({ navigation }: RootStackScreenProps<'Edit'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title='Upload' onPress={() => navigation.navigate('Upload')} />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
