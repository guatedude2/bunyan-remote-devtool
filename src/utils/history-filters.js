import _ from 'lodash';

const FILTERS = {
  10: { bit: 64 }, // TRACE
  20: { bit: 32 }, // DEBUG
  30: { bit: 16 }, // INFO
  40: { bit: 8 },  // WARN
  50: { bit: 4 },  // ERROR
  60: { bit: 2 },  // FATAL
};

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function buildSearchMatches(text) {
  return text ? text.split(/\s*,\s*/).reduce(function (result, param) {
    var matches = /^((?!.*\\:)[^:]+):\s*(.+)$/.exec(param);
    if (matches) {
      result[matches[1]] = matches[2];
    } else {
      var keywords = (result['*'] && result['*'].keywords || []).concat(escapeRegExp(param));
      result['*'] = {
        regex: new RegExp(keywords.join('|'), 'gi'),
        keywords: keywords
      };
    }
    return result;
  }, {}) : null;
}

export default function historyFilters(history, filterBits, filterText) {
  const matches = buildSearchMatches(filterText);

  return history.reduce((result, event) => {
    let hasFilterBit = filterBits === 1 || ((FILTERS[event.level].bit & filterBits) === FILTERS[event.level].bit);

    let matchFilterText = !matches || _.reduce(event, (result, value, key) => (
      result || ((matches[key] && !!~`${value}`.search(matches[key])) || (matches['*'] &&  !!~`${value}`.search(matches['*'].regex)))
    ), false);
    if (hasFilterBit && matchFilterText) {
      result.push(event);
    }
    return result;
  }, []);
};