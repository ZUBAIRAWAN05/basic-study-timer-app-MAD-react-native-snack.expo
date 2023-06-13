import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

const App = () => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkInterval, setIsWorkInterval] = useState(true);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsWorkInterval(!isWorkInterval);
      setTimeLeft((isWorkInterval ? breakTime : workTime) * 60);
    }
  }, [timeLeft, isWorkInterval, workTime, breakTime]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Study Timer App</Text>
      <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      <TouchableOpacity style={styles.button} onPress={toggleTimer}>
        <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
      </TouchableOpacity>
      <View style={styles.settings}>
        <View style={styles.setting}>
          <Text>Work Time (min):</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={workTime.toString()}
            onChangeText={(text) => setWorkTime(parseInt(text) || 0)}
          />
        </View>
        <View style={styles.setting}>
          <Text>Break Time (min):</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={breakTime.toString()}
            onChangeText={(text) => setBreakTime(parseInt(text) || 0)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  timer: {
    fontSize: 48,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  settings: {
    flexDirection: 'row',
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  input: {
    width: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    textAlign: 'center',
    marginLeft: 5,
  },
});

export default App;
