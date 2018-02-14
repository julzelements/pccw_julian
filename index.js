/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
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

exports.excludeByProperty = (property, payload) => payload.filter(entry => !entry.hasOwnProperty(property));

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
  const log = msg => (console.log(msg));
  const isString = element => (Object.prototype.toString.call(element) === '[object String]');

  const getFirstName = (fullName) => {
    if (isString(fullName)) {
      return fullName.split(' ')[0];
    }
    log('User name is not a valid String');
    return '';
  };

  newUser.firstName = getFirstName(newUser.name);

  if (newUser.address.num && newUser.address.street && newUser.address.suburb) {
    newUser.fullAddress = `${newUser.address.num} ${newUser.address.street}, ${newUser.address.suburb}`;
  }

  const getMonthJoined = (month) => {
    const validMonths = [...Array(12).keys()];
    if (validMonths.includes(parseInt(month, 10))) {
      return month + 1;
    }
    log('invalid monthJoined: wrong type or out of range');
    return month;
  };

  if (newUser.monthJoined) {
    newUser.monthJoined = getMonthJoined(newUser.monthJoined);
  }

  return newUser;
};
