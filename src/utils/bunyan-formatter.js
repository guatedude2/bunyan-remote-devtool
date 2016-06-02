import _ from 'lodash';
import moment from 'moment';

const LEVELS = {
  10: { name: 'TRACE', color: '#999999' },
  20: { name: 'DEBUG', color: '#F4BF00' },
  30: { name: '&nbsp;INFO', color: '#1ABEE3' },
  40: { name: '&nbsp;WARN', color: '#E31ACB' },
  50: { name: 'ERROR', color: '#FF0000' },
  60: { name: 'FATAL', color: '#FFFFFF' }
};

const colorSpan = (color, text) => (`<span style="color:${color};">${text}</span>`);
const keyFormats = {
  v: (obj) => obj.v,
  name: (obj) => obj.name,
  hostname: (obj) => obj.hostname,
  pid: (obj) => obj.pid,
  msg: (obj) => obj.msg,
  level: (obj, options) => (
    options === 'no-color' ? LEVELS[obj.level].name : colorSpan(LEVELS[obj.level].color, LEVELS[obj.level].name)
  ),
  time: (obj, options) => (
    options ? moment(new Date(obj.time)).format(options) : obj.time
  )
};

export default (format, record) => {
  const object = _.pickBy(record, _.isObject);
  const tags = _.reduce(record, (result, val, key) => {
    if (!_.isObject(val) && !keyFormats[key]) {
      result[key] = val;
    }
    return result;
  }, {});

  return {
    object: (!_.isEmpty(object) ? object : null),
    error: record.err ? record.err.stack : null,
    tags: (!_.isEmpty(tags) ? tags : null),
    log: format.replace(/%([^%:\s]+)(:([^%]+))?%/g, (match, key, dummy, options) => (
      keyFormats[key] ? keyFormats[key].call(null, record, options) : match
    ))
  };
};