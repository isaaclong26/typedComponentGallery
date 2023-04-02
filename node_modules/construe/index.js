/**
 * @license MIT
 */

var finalEvents = require('final-events');

var construe = function () {
  if (arguments.length === 1) {
    return construe.defineProperties(Object.create(null), arguments[0]);
  }
  if (arguments.length === 2) {
    return construe.defineProperties(arguments[0], arguments[1]);
  }

  if (arguments.length === 3) {
    return construe.defineProperty(arguments[0], arguments[1], arguments[2]);
  }

  throw new TypeError('Expected 2 or 3 arguments got', arguments.length);
};

construe.defineProperties = function (obj, descriptorsHash) {
  Object.keys(descriptorsHash).forEach(function (key) {
    construe.defineProperty(obj, key, descriptorsHash[key]);
  });
  return obj;
};

construe.defineProperty = function (obj, propertyName, dirtyDescriptor) {
  var pure = construe.purifyDescriptor(obj, propertyName, dirtyDescriptor);
  Object.defineProperty(obj, propertyName, pure);
  return obj;
};

construe.purifyDescriptor = function (obj, propertyName, dirtyDescriptor) {
  var pure = {};

  construe.descriptors.method(obj, propertyName, dirtyDescriptor, pure);
  construe.descriptors.bindable(obj, propertyName, dirtyDescriptor, pure);
  construe.descriptors.bind(obj, propertyName, dirtyDescriptor, pure);
  construe.descriptors.bind2Way(obj, propertyName, dirtyDescriptor, pure);
  construe.descriptors.onDemand(obj, propertyName, dirtyDescriptor, pure);

  if (!pure.value && !pure.get && !pure.set && !pure.writable) {
    pure = dirtyDescriptor;
  }

  return pure;
};

construe.bind = function (obj1, var1, obj2, var2) {
  var obj2Emitter = construe.helper(obj2).getEventEmitter();

  obj2Emitter.on('propertyChange', function (event) {
    if (event.propertyName === var2) {
      obj1[var1] = obj2[var2];
    }
  });

  obj1[var1] = obj2[var2];
};

construe.bind2Way = function (obj1, var1, obj2, var2) {
  construe.bind(obj1, var1, obj2, var2);
  construe.bind(obj2, var2, obj1, var1);
};

// -----------------------------------------
// Helpers
// -----------------------------------------
construe.helper = function (obj) {
  return new construe.Helper(obj);
};

construe.Helper = function (obj) {
  this.obj = obj;
};

construe.Helper.prototype = {
  getEventEmitter: function () {
    if (!this.obj['@eventEmitter']) {
      Object.defineProperty(this.obj, '@eventEmitter', {value: finalEvents.dispatcher({})});
      this.obj['@eventEmitter'].target = this.obj;
    }
    return this.obj['@eventEmitter'];
  },
  getPrivates: function () {
    if (!this.obj['@private']) {
      Object.defineProperty(this.obj, '@private', {value: Object.create(null)});
    }
    return this.obj['@private'];
  }
};

// ----------------------------------------------------------------------------------
//
// Descriptors
//
// ----------------------------------------------------------------------------------
construe.descriptors = {};

// -----------------------------------------
// Bindable descriptor
// -----------------------------------------
construe.descriptors.bindable = function (obj, propertyName, dirtyDescriptor, pure) {
  pure = pure || {};

  if (dirtyDescriptor.bindable) {
    var helper = construe.helper(obj);
    var eventEmitter = helper.getEventEmitter();
    var privates = helper.getPrivates();

    if (dirtyDescriptor.value) {
      privates[propertyName] = dirtyDescriptor.value;
    }

    pure.get = construe.descriptors.bindable.getGetter(privates, propertyName, dirtyDescriptor);
    pure.set = construe.descriptors.bindable.getSetter(obj, privates, eventEmitter, propertyName, dirtyDescriptor);
  }

  return pure;
};

construe.descriptors.bindable.getGetter = function (privates, propertyName, dirtyDescriptor) {
  return dirtyDescriptor.get ? dirtyDescriptor.get : function () {
    return privates[propertyName];
  }
};

construe.descriptors.bindable.getSetter = function (obj, privates, eventEmitter, propertyName, dirtyDescriptor) {
  if (dirtyDescriptor.set) {
    return function (newVal) {
      var oldVal = obj[propertyName];

      if (oldVal !== newVal) {
        dirtyDescriptor.set.call(obj, newVal);
        eventEmitter.emit({type: 'propertyChange', propertyName: propertyName, newValue: newVal, oldValue: oldVal});
      }
    }
  } else {
    return function (newVal) {
      var oldVal = obj[propertyName];

      if (oldVal !== newVal) {
        privates[propertyName] = newVal;
        eventEmitter.emit({type: 'propertyChange', propertyName: propertyName, newValue: newVal, oldValue: oldVal});
      }
    }
  }
};

// -----------------------------------------
// Bind descriptor
// -----------------------------------------
construe.descriptors.bind = function (obj, propertyName, dirtyDescriptor, pure) {
  if (dirtyDescriptor.bind) {
    if (dirtyDescriptor.bind.length !== 2) {
      throw new TypeError('bind descriptor should be array with 2 elements: [object, "variableName"]')
    }
    construe.bind(obj, propertyName, dirtyDescriptor.bind[0], dirtyDescriptor.bind[1]);
  }

  return pure;
};

// -----------------------------------------
// Bind2Way descriptor
// -----------------------------------------
construe.descriptors.bind2Way = function (obj, propertyName, dirtyDescriptor, pure) {
  if (dirtyDescriptor.bind2Way) {
    if (dirtyDescriptor.bind2Way.length !== 2) {
      throw new TypeError('bind descriptor should be array with 2 elements: [object, "variableName"]')
    }
    if (!dirtyDescriptor.bindable) {
      dirtyDescriptor.bindable = true;
      pure = construe.descriptors.bindable(obj, propertyName, dirtyDescriptor, pure);
    }
    construe.bind2Way(obj, propertyName, dirtyDescriptor.bind2Way[0], dirtyDescriptor.bind2Way[1]);
  }
  return pure;
};


// -----------------------------------------
// Method descriptor
// -----------------------------------------
construe.descriptors.method = function (obj, propertyName, dirtyDescriptor, pure) {
  pure = pure || {};

  if (dirtyDescriptor.method instanceof Function) {
    pure.value = dirtyDescriptor.method.bind(obj);
  }
  return pure;
};

// -----------------------------------------
// OnDemand descriptor
// -----------------------------------------
construe.descriptors.onDemand = function (obj, propertyName, dirtyDescriptor, pure) {
  pure = pure || {};

  if (dirtyDescriptor.onDemand instanceof Function) {
    pure.get = function () {
      if (!obj['@' + propertyName]) {
        Object.defineProperty(obj, '@' + propertyName, {value: dirtyDescriptor.onDemand.call(obj)});
      }
      return obj['@' + propertyName];
    };
  }

  return pure;
};

// ----------------------------------------------------------------------------------
//
// Export
//
// ----------------------------------------------------------------------------------

module.exports = construe;
