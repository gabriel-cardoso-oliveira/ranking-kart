import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalContent: {
    height: '90%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '10%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default styles;
