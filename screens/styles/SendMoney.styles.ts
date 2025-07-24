
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    
    padding: 16,
    backgroundColor: '#fff',
    
  },
  title: {
    // fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 24,
    // textAlign: 'center',
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    // color: '#007BFF',
    // fontWeight: '600',
  },
  inputGroup: {
    position: 'relative',

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
    backgroundColor: '#1DB954',
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
 modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    width: "80%",
  },
  successText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1DB954",
    textAlign: "center",
  },
  homeButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  homeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
   hint: {
    marginTop: -1,
    color: 'gray',
    fontSize: 14,
  },
networkRow: {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  marginTop: 12,
  marginBottom: 24,
    gap: 28, 
    paddingLeft: 30,
  marginVertical: 8,
},

networkImageWrapper: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 8,
  backgroundColor: '#fff',
},

selectedWrapper: {
  borderColor: '#1DB954',
  backgroundColor: '#E8F5E9',
},

networkImage: {
  width: 40,
  height: 40,
  borderRadius: 12,
  resizeMode: 'contain',
  backgroundColor: '#fff',
  padding: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 0, // For Android shadow

},
selectedImage: {
  borderWidth: 2,
  borderColor: '#1DB954',
}
  
});
