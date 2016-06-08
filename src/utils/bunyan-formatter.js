import _ from 'lodash';
import moment from 'moment';

const LEVELS = {
  10: { name: 'TRACE', className: 'trace' },
  20: { name: 'DEBUG', className: 'debug' },
  30: { name: '&nbsp;INFO', className: 'info' },
  40: { name: '&nbsp;WARN', className: 'warn' },
  50: { name: 'ERROR', className: 'error' },
  60: { name: 'FATAL', className: 'fatal' }
};

const keyFormats = {
  v: (obj) => `<span class="v">${obj.v}</span>`,
  name: (obj) => `<span class="name">${obj.name}</span>`,
  hostname: (obj) => `<span class="hostname">${obj.hostname}</span>`,
  pid: (obj) => `<span class="pid">${obj.pid}</span>`,
  msg: (obj) => `<span class="msg">${obj.msg}</span>`,
  level: (obj) => `<span class="level">${LEVELS[obj.level].name}</span>`,
  time: (obj, options) => (
    options ? moment(new Date(obj.time)).format(options) : obj.time
  )
};

export default (format, record) => {
  if (typeof record === 'string') {
    return {
      log: `<span class="client">${record}</span>`
    };
  }

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
    className: LEVELS[record.level].className,
    log: format.replace(/%([^%:\s]+)(:([^%]+))?%/g, (match, key, dummy, options) => (
      keyFormats[key] ? keyFormats[key].call(null, record, options) : match
    ))
  };
};