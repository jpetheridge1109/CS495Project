// Displays the "Notifications" screen within the Settings Page

import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';

export default function Notifications() {
  const [allNotifications, setAllNotifications] = useState(true);
  const [chatNotifications, setChatNotifications] = useState(true);
  const [newEvents, setNewEvents] = useState(true);
  const [newUserJoinedGroup, setNewUserJoinedGroup] = useState(true);

  const toggleAllNotifications = () => {
    setAllNotifications(!allNotifications);
    setChatNotifications(true);
    setNewEvents(true);
    setNewUserJoinedGroup(true);
  };

  const toggleChatNotifications = () => {
    setChatNotifications(!chatNotifications);
  };

  const toggleNewEvents = () => {
    setNewEvents(!newEvents);
  };

  const toggleNewUserJoinedGroup = () => {
    setNewUserJoinedGroup(!newUserJoinedGroup);
  };

  return (
    <View style={styles.container}>
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>All Notifications</Text>
        <Switch
          onValueChange={toggleAllNotifications}
          value={allNotifications}
          disabled={false}
        />
      </View>
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>Chat Notifications</Text>
        <Switch
          onValueChange={toggleChatNotifications}
          value={chatNotifications}
          disabled={allNotifications}
        />
      </View>
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>New Events</Text>
        <Switch
          onValueChange={toggleNewEvents}
          value={newEvents}
          disabled={allNotifications}
        />
      </View>
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>Interest Group Changes</Text>
        <Switch
          onValueChange={toggleNewUserJoinedGroup}
          value={newUserJoinedGroup}
          disabled={allNotifications}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  notificationText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
