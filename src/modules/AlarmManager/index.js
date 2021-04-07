import {NativeEventEmitter, NativeModules} from 'react-native';
import ReactNativeAN from 'react-native-alarm-notification';
import {myLog} from '../../Debug';

const {RNAlarmNotification} = NativeModules;
const alarmNotifData = {
  title: 'Alarm',
  message: 'Stand up',
  vibrate: false,
  play_sound: false,
  schedule_type: 'once',
  channel: 'wakeup',
  data: {content: 'my notification id is 22'},
  loop_sound: false,
  has_button: true,
};

const repeatAlarmNotifData = {
  title: 'Alarm',
  message: 'Stand up repeat',
  vibrate: false,
  play_sound: false,
  channel: 'wakeup',
  data: {content: 'my notification id is 22'},
  loop_sound: false,
  schedule_type: 'repeat',
  repeat_interval: 'daily',
  interval_value: 1, // repeat after 5 minutes
};
const RNEmitter = new NativeEventEmitter(RNAlarmNotification);

export class AlarmManager {
  constructor() {
    this.instance = null;
  }
  static getInstance = () => {
    if (!this.instance) {
      this.instance = new AlarmManager();
    }
    return this.instance;
  };
  removeAllFromNotificationCenter = () => {
    ReactNativeAN.removeAllFiredNotifications();
  };
  removeAlarmFromNotificationCenterById = id => {
    ReactNativeAN.removeFiredNotification(id);
  };
  deleteAlarm = id => {
    ReactNativeAN.deleteAlarm(id);
  };
  deleteRepeatingAlarm = id => {
    ReactNativeAN.deleteRepeatingAlarm(id);
  };
  deleteAllAlarm = async () => {
    const listAlarm = await ReactNativeAN.getScheduledAlarms();
    listAlarm.map(alarm => {
      alarm.schedule_type === 'repeat'
        ? ReactNativeAN.deleteRepeatingAlarm(alarm.id)
        : ReactNativeAN.deleteAlarm(alarm.id);
    });
  };
  stopAlarm = () => {
    ReactNativeAN.stopAlarmSound();
  };
  convertDateToClearSecond = (date = new Date()) => {
    return new Date(
      new Date(date).getFullYear(),
      new Date(date).getMonth(),
      new Date(date).getDate(),
      new Date(date).getHours(),
      new Date(date).getMinutes(),
      0,
    );
  };
  setFutureRpeatAlarm = async date => {
    const timestampNow = Date.now();
    const _seconds =
      new Date(this.convertDateToClearSecond(date)).valueOf() - timestampNow <=
      0
        ? new Date(
            new Date().setDate(
              new Date(this.convertDateToClearSecond(date)).getDate() + 1,
            ),
          ).valueOf() - timestampNow
        : this.convertDateToClearSecond(date).valueOf() - timestampNow;
    const fire_date = ReactNativeAN.parseDate(
      new Date(timestampNow + _seconds),
    );

    const details = {
      ...repeatAlarmNotifData,
      fire_date,
    };
    myLog(_seconds, `alarm set: ${fire_date}`);

    try {
      const alarm = await ReactNativeAN.scheduleAlarm(details);
      myLog(alarm);
    } catch (e) {
      console.log('setFutureRpeatAlarm error', e);
    }
  };
}
