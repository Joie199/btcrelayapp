
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    color: '#007BFF',
    fontWeight: '600',
  },
  inputGroup: {
    position: 'relative',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    paddingRight: 60,
    paddingLeft: 60,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  suffix: {
    position: 'absolute',
    left: 10,
    top: 16,
    fontWeight: 'bold',
    color: '#000',
	zIndex:1,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
