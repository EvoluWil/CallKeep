import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    color: 'gray',
  },
  nameContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageContainer: {
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
  },
  buttonLogo: {
    width: 60,
    height: 60,
  },
  buttonText: {
    marginTop: 5,
    fontSize: 16,
  },
  timer: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 18,
  },
});

export default styles;
