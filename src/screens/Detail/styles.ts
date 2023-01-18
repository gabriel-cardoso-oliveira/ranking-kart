import { bundleDirectory } from 'expo-file-system';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 6,
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    borderRadius: 15,
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 46,
    maxHeight: 160,
    flexDirection:'column',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: '1%',
  },
  containerText: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  containerForm: {
    flexDirection: 'column',
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  containerInput: {
    flexDirection: 'column',
    marginBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  button: {
    borderRadius: 15,
    backgroundColor: 'blue',
    width: '100%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textButton: {
    color: '#eee',
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 44,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#e8e8e8',
    borderRadius: 15,
  },
  label: {
    color: '#eee',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default styles;
