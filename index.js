/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */

const has = Object.prototype.hasOwnProperty;
// Yes, I know this is global, but it was a recommendation by the airbnb style guide.
// Don't call Object.prototype directly: https://github.com/airbnb/javascript#objects--prototype-builtins

exports.example = () => 'hello world';

exports.stripPrivateProperties = (secrets, people) => {
  const sanitizedPeople = [];
  people.forEach((person) => {
    const sanitizedPerson = {};
    for (const key in person) {
      if ((person.hasOwnProperty(key)) && (!secrets.includes(key))) {
        sanitizedPerson[key] = person[key];
      }
    }
    sanitizedPeople.push(sanitizedPerson);
  });
  return sanitizedPeople;
};

exports.excludeByProperty = (flag, payload) => {
  const doesNotHaveFlag = elem => !(has.call(elem, flag));
  return payload.filter(doesNotHaveFlag);
};

exports.sumDeep = (payload) => {
  const reducer = (accum, element) => accum + element.val;
  const sumTheObject = element => element.objects.reduce(reducer, 0);
  return payload.map(sumTheObject).map(sum => ({ objects: sum }));
};

exports.applyStatusColor = (colors, statuses) => {
  const colorLookup = {};
  function populateColorLookup(color, statuses, colorLookup) {
    statuses.forEach((code) => {
      colorLookup[code] = color;
    });
  }

  Object.entries(colors).forEach(([color, codeArray]) => {
    populateColorLookup(color, codeArray, colorLookup);
  });

  const validStatuses = statuses.filter(status => (colorLookup.hasOwnProperty(status.status)));

  return validStatuses.map((element) => {
    const status = element.status;
    const color = (colorLookup[status]);
    return {
      color,
      status,
    };
  });
};

exports.createGreeting = (greeterFunc, phrase) => name => (`${phrase} ${name}`);

exports.setDefaults = (defaultProps) => {
  const applyDefaults = (user) => {
    const userKeys = Object.keys(user);
    const defaultKeys = Object.keys(defaultProps);
    const checkForMissingKeys = (defaultKey => !userKeys.includes(defaultKey));
    const missingDefaultKeys = defaultKeys.filter(checkForMissingKeys);

    const newUser = user;
    missingDefaultKeys.forEach(key => newUser[key] = defaultProps[key]);
    return newUser;
  };
  return applyDefaults;
};

exports.sanitizeUser = (user) => {
  const newUser = user;
  const log = msg => (console.log(msg)); // I've added this here so that a logger can be injected
  const isString = element => (Object.prototype.toString.call(element) === '[object String]');

  const getFirstName = (fullName) => {
    if (isString(fullName)) {
      return fullName.split(' ')[0];
    }
    log('User name is not a valid String');
    return '';
  };

  const getMonthJoined = (month) => {
    const validMonths = [...Array(12).keys()];
    if (validMonths.includes(parseInt(month, 10))) {
      return month + 1;
    }
    log('invalid monthJoined: wrong type or out of expected range');
    return month;
  };

  const getAddress = addressField => addressField || '';
  newUser.fullAddress = `${getAddress(user.address.num)} ${getAddress(user.address.street)}, ${getAddress(user.address.suburb)}`;

  if (user.name) {
    newUser.firstName = getFirstName(user.name);
  }

  if (user.monthJoined) {
    newUser.monthJoined = getMonthJoined(user.monthJoined);
  }

  return newUser;
};
