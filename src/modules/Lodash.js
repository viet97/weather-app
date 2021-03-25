import map from 'lodash/map';
import throttleLD from 'lodash/throttle';
import debounceLD from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import isArray from 'lodash/isArray';
import isFinite from 'lodash/isFinite';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import uniqueId from 'lodash/uniqueId';
import pick from 'lodash/pick';

const throttle = (
  func,
  wait,
  {useRaf = true, leading = true, trailing = false} = {
    useRaf: true,
    leading: true,
    trailing: false,
  },
) => {
  return throttleLD(func, wait, {leading: leading, trailing: trailing});
};

const debounce = (
  func,
  wait,
  {useRaf = true, leading = true, trailing = false} = {
    useRaf: true,
    leading: true,
    trailing: false,
  },
) => {
  return debounceLD(func, wait, {leading: leading, trailing: trailing});
};

export {
  map,
  throttle,
  debounce,
  isArray,
  isEqual,
  isFinite,
  isNumber,
  isString,
  uniqueId,
  pick,
};

export default {
  map,
  throttle,
  debounce,
  isArray,
  isEqual,
  isFinite,
  isNumber,
  isString,
  uniqueId,
  pick,
};
