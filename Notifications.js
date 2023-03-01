import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function Notifications() {
  const [allEnabled, setAllEnabled] = useState(true);
  const [chatEnabled, setChatEnabled] = useState(true);
  const [eventsEnabled, setEventsEnabled] = useState(true);
  const [interestEnabled, setInterestEnabled] = useState(true);

  const handleAllEnabledChange = (value) => {
    setAllEnabled(value);
    setChatEnabled(value);
    setEventsEnabled(value);
    setInterestEnabled(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Notifications</Text>
      </View>
      <View style={styles.toggleContainer}>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleText}>All Notifications</Text>
          <Switch
            value={allEnabled}
            onValueChange={handleAllEnabledChange}
            disabled={!allEnabled}
          />
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleText}>Chat Notifications</Text>
          <Switch
            value={chatEnabled}
            onValueChange={(value) => setChatEnabled(value)}
            disabled={!allEnabled && !chatEnabled}
          />
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleText}>New Events</Text>
          <Switch
            value={eventsEnabled}
            onValueChange={(value) => setEventsEnabled(value)}
            disabled={!allEnabled && !eventsEnabled}
          />
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleText}>New User Joined Interest Group</Text>
          <Switch
            value={interestEnabled}
            onValueChange={(value) => setInterestEnabled(value)}
            disabled={!allEnabled && !interestEnabled}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  toggleContainer: {
    backgroundColor: '#F0F0F0',
    padding: 20,
    borderRadius: 10,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  toggleText: {
    fontSize: 24,
  },
});
