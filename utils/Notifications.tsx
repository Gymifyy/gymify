import * as Notifications from 'expo-notifications';
// TODO: Make re-usable
export async function scheduleNotification(request: Notifications.NotificationRequestInput): Promise<void> {
  await Notifications.scheduleNotificationAsync(request);
  return;
}
