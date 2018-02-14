/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => {
    return 'hello world';
};

exports.stripPrivateProperties = (secrets, people) => {
    var sanitizedPeople = [];
    people.forEach(person => {
        var sanitizedPerson = {};
        for (var key in person) {
            if ((person.hasOwnProperty(key)) && (!secrets.includes(key))) {
                sanitizedPerson[key] = person[key];
            }
        }
        sanitizedPeople.push(sanitizedPerson);
    });
    return sanitizedPeople;
};

exports.excludeByProperty = (property, payload) => {
    return payload.filter(entry => !entry.hasOwnProperty(property))
};

exports.sumDeep = (payload) => {
    const reducer = (accum, element) => accum + element.val;
    const sumTheObject = (element) => element.objects.reduce(reducer, 0);
    return payload.map(sumTheObject).map(sum => ({ objects: sum }));
};

exports.applyStatusColor = (colors, statuses) => {

    var colorLookup = {};
    function populateColorLookup(color, statuses, colorLookup) {
        statuses.forEach((code) => {
            colorLookup[code] = color;
        })
    }

    Object.entries(colors).forEach(
        ([color, codeArray]) => {
            populateColorLookup(color, codeArray, colorLookup);
        }
    );

    const validStatuses = statuses.filter(status => (colorLookup.hasOwnProperty(status['status'])));

     return validStatuses.map(element => {
        const status = element['status'];
        const color = (colorLookup[status]);
        return {
            'color': color,
            'status': status
        }
    });
};

exports.createGreeting = (greeterFunc, phrase) => {
    return (name) => (phrase + ' ' + name);
};

exports.setDefaults = (defaultProps) => {
    const applyDefaults = (user) => {
        const userKeys = Object.keys(user);
        const defaultKeys = Object.keys(defaultProps);
        const checkForMissingKeys = (defaultKey => !userKeys.includes(defaultKey));
        const missingDefaultKeys = defaultKeys.filter(checkForMissingKeys);

        var newUser = user;
        missingDefaultKeys.forEach((key) => newUser[key] = defaultProps[key]);
        return newUser;
    };
    return applyDefaults;
};

exports.sanitizeUser = (user) => {
    const log = (msg) => (console.log(msg)); 

    var foundUsersFirstname;
    
    const isNumber = (element) => (Object.prototype.toString.call(element) === `[object Number]`);
    const isString = (element) => (Object.prototype.toString.call(element) === `[object String]`);

    if (isString(user.name)) {

    } else {
        log('User name is not a valid String');
        return '';
    }

    // Ensure a user has an `fullAddress` property by combining `address.streetNum, address.streetName, address.suburb`
    if (user.address.num && user.address.street && user.address.suburb) {
        user.fullAddress = user.address.num + ' ' + user.address.street + ', ' + user.address.suburb;
    }

    // The given user always returns the `monthJoined` as 0 to 11. We need it to be 1 to 12 so add 1.
    if (user.monthJoined)
    user.monthJoined = user.monthJoined + 1;


    user.firstName = getNameArray(user.name)[0];
    

    return user;
};



