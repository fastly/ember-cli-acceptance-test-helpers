import {getContext} from '../utils/helper-context';

function filterElements(elements, text){
  return elements.filter(':contains(' + text + ')');
}

export default function(app, selector, count, options) {
  var elements = app.testHelpers.find(selector, getContext());
  var result = {};
  var message = '';

  if (!options) { options = {}; }

  if (typeof count === 'object') {
    message = options;
    options = count;
  }

  if (typeof count === 'number') {
    options.count = count;
  }

  if (typeof count === 'string') {
    options.message = count;
  }

  if (typeof options === 'string') {
    options.message = options;
  }

  if(!options.message) {
    options.messsage = message;
  }

  count = options.count === undefined ? 1 : options.count;

  if (options.contains) {
    var text = options.contains;
    var filtered = filterElements(elements, text);

    result.ok = filtered.length === count;

    result.message = 'Found ' + filtered.length + ' of ' + selector +
      ' containing "' + text + '"';

    if (!result.ok) {
      if (elements.length === filtered.length) {
        result.message = 'Found ' + filtered.length + ' of ' + selector +
          ' containing "' + text + '" but expected ' + count;
      } else {
        result.message = 'Found ' + elements.length + ' of ' + selector +
          ' but ' + filtered.length + '/' + count + ' containing "' + text + '"';
      }
    }
  } else {
    var defaultSuccessMessage = 'Found ' + elements.length + ' of ' + selector;
    var defaultFailureMessage = defaultSuccessMessage + ' but expected ' + count;

    /*if (!options.message) {
      result.message = defaultMessage;
    }*/

    result.ok = elements.length === count;
    if (result.ok && options.message) {
      result.message = options.message;
    } else if (options.message) {
      result.message = options.message + ' (' + defaultFailureMessage + ')';
    } else if (result.ok) {
      result.message = defaultSuccessMessage;
    } else {
      result.message = defaultFailureMessage;
    }
  }

  return result;
}
