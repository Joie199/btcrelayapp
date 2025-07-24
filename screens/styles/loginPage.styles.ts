// src/screens/styles/LoginScreen.styles.ts

import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
   marginTop: 'auto',
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
   button: {
    backgroundColor: '#1DB954',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerLink: {
  textAlign: 'center',
  fontSize: 14,
  color: '#555',
  marginTop: 16,
},
registerLinkBold: {
  color: '#1DB954',
  fontWeight: 'bold',
},

});

export default style;
