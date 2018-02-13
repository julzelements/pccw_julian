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



exports.createGreeting = () => {};
exports.setDefaults = () => {};

exports.sanitizeUser = () => {
    var foundUsersFirstname;

    // Create a helper that converts the users name to an array
    function getNameArray() {
        return user.name.split('');
    }

    // Ensure a user has an `fullAddress` property by combining `address.streetNum, address.streetName, address.suburb`
    if (user.address.num && user.address.street && user.address.suburb) {
        user.fullAddress = user.address.num + ' ' + user.address.street + ', ' + user.address.suburb;
    }

    // The given user always returns the `monthJoined` as 0 to 11. We need it to be 1 to 12 so add 1.
    user.monthJoined = user.monthJoined + 1;

    // The users name is their full name. We want easy access to the first name.
    for (i = 0; i < getNameArray().length; i++) {

        // Make sure `firstName` exists and is a String
        if (!user.firstName) user.firstName = '';

        // We can detect the first name by assuming it is separated with a space. So check if the current character is a space.
        if (!foundUsersFirstname) foundUsersFirstname = getNameArray()[i] != ' ' ? false : true;

        // If we haven't found the first name yet, append the next character
        if (getNameArray()[i] && !foundUsersFirstname) {
            user.firstName = user.firstName + getNameArray()[i];
        }
    }

    return user;
};

