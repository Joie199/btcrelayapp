import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  background: {
    flex: 1,
  },
  container: {
    backgroundColor: '#ffffffcc',
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 40,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#fff',
    width: '85%',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#007BFF',
    fontWeight: '600',
  },
});
