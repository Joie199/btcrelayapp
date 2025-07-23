import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
	  flexGrow: 1,
    padding: 24,
    paddingBottom: 48,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007BFF',
    marginBottom: 30,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    color: '#007BFF',
    fontWeight: '600',
  },
  owner: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
  },
  inputGroup: {
    position: 'relative',
    marginBottom: 16,
  },
  suffix: {
    position: 'absolute',
    right: 16,
    top: 16,
    fontWeight: 'bold',
    color: '#007BFF',
    backgroundColor: '#fff',
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

invoiceBox: {
  marginTop: 24,
  padding: 16,
  borderRadius: 10,
  backgroundColor: '#F5F9FF',
  borderWidth: 1,
  borderColor: '#007BFF',
},
invoiceTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#007BFF',
},
invoiceText: {
  fontSize: 14,
  color: '#333',
  marginBottom: 4,
},

});