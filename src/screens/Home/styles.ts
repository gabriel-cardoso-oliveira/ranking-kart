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
    paddingHorizontal: 16,
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
    fontSize: 80,
    fontWeight: 'bold',
    marginRight: '2%'
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: '4%',
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
});

export default styles;
