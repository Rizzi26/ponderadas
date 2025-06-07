import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Appbar, List, Paragraph } from 'react-native-paper';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Request permissions for notifications
    (async () => {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Permissão de Notificação', 'É necessário conceder permissão para receber notificações!');
        return;
      }
    })();

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotifications(prev => [...prev, { id: notification.request.identifier, title: notification.request.content.title, body: notification.request.content.body }]);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const sendTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Nova Notificação! 🔔',
        body: 'Este é um teste de notificação local.',
      },
      trigger: null, // Show immediately
    });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Notificações" />
        <Appbar.Action icon="bell-plus" onPress={sendTestNotification} />
      </Appbar.Header>
      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Paragraph>Nenhuma notificação recebida ainda.</Paragraph>
          <Paragraph>Clique no ícone de sino com '+' para enviar uma notificação de teste.</Paragraph>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <List.Item
              title={item.title}
              description={item.body}
              left={props => <List.Icon {...props} icon="bell" />}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default NotificationScreen;

