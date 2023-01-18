import { Modal, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import styles from './styles';
import { Text, View } from '../Themed';
import { StyledModalProps } from '../../types';

export default function StyledModal({
  isVisible,
  title,
  children,
  onClose,
}: StyledModalProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={24} />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
}
