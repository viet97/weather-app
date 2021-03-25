import {format} from 'date-fns';
import Config from './Config';
import {nowCustom} from './utils/Util';

const formatString = 'HH:mm:ss.SSS';

export const myLog = (...args) => {
  if (!Config.debug) {
    return;
  }
  console.log(format(nowCustom(), formatString) + ' : ', ...args);
};

export const myLogThrow = (...args) => {
  // console.log(format(nowCustom(), formatString) + " : ", ...args);
};

export const logTracker = (level = 0, ...args) => {
  if (!Config.debug) {
    return;
  }
  if (Config.levelLog < 0) {
    console.log(format(nowCustom(), formatString) + ' : ', ...args);
    return;
  }
  if (level === Config.levelLog) {
    console.log(format(nowCustom(), formatString) + ' : ', ...args);
  }
};

const Debug = {
  myLog,
  logTracker,
};

export default Debug;
