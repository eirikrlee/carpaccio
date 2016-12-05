var moment = require('moment');

function getAgeRisk(age) {

    switch (true) {
        case (age < 18):
            return 0.5;
        case (age > 18 && age <= 45):
            return 1.0;
        case (age > 45 && age <= 65):
            return 1.2;
        case (age > 65 && age <= 75):
            return 1.4;
        default:
            return 2.0;
    }
    return factor;
}

function getSumAgeRisk(ages) {
    var sum = 0
    for (var i = 0; i < ages.length; i++) {
        sum += getAgeRisk(ages[i])
    }
    return sum
}

function getCoverRate(cover) {
    switch (cover) {
        case 'Basic':
            return 1.7
        case 'Extra':
            return 2.4
        case 'Premier':
            return 4.2
        default:
            return 1.0
    }
}


function getCountryRate(country) {

    switch (country) {

        case 'ES':
            return 1;
        case 'FR':
            return 1;

        case 'BE':
            return 1.1;

        case 'FI':
            return 0.8;

        case 'EL':
            return 0.9;
        case 'UK':
            return 1.1;
        case 'IT':
            return 1.2;
        case 'CZ':
            return 1.4;
        case 'DE':
            return 1;
    }

}

function getDays(_departureDate, _returnDate) {
    var departureDate = moment(_departureDate, 'YYYY-MM-DD'),
        returnDate = moment(_returnDate, 'YYYY-MM-DD'),
        travelDays = returnDate.diff(departureDate, 'days');

    return travelDays;
}

function getOptions(options) {

    if (options.indexOf('Skiing') > -1) {
        return 28;
    }

    return 0;
}

function getDiscount(ages) {

    if (ages.length < 4) return 1;

    var adultCount = 0,
        childCount = 0,
        seniorCount = 0;

    for (var i = 0; i < ages.length; i++) {

        if (ages[i] < 18) {
            childCount++

        } else if (ages[i] >= 18 && ages[i] < 65) {
            adultCount++;
        } else {
            seniorCount++;
        }
    }

    if (childCount >= 2 && adultCount >= 2) {
        return 0.8;
    } else if (seniorCount >= 1) {
        //return 0.8;
        return 1;
    } else {
        return 1;
    }

}

function getChildrenPenalty(ages) {
    var adultCount = 0,
        childCount = 0,
        seniorCount = 0;

    for (var i = 0; i < ages.length; i++) {

        if (ages[i] < 18) {
            childCount++
        } else if (ages[i] >= 18 && ages[i] < 65) {
            adultCount++;
        } else {
            seniorCount++;
        }
    }

    if (childCount > adultCount) {
        return 1.15;
    }
    return 1;

}

exports.getQuote = function getQuote(cover, country, departureDate, returnDate, ages, options) {

    // console.log('getCoverRate --------', getCoverRate(cover));
    // console.log('getCountryRate --------', getCountryRate(country));
    // console.log('getSumAgeRisk -------', getSumAgeRisk(ages));
    // console.log('getDays --------', getDays(departureDate, returnDate));
    // console.log('getOptions -------', getOptions(options));

    var discount = getDiscount(ages);
    var childPenalty = getChildrenPenalty(ages);

    // console.log('discount --------', discount);
    // console.log('childPenalty --------', childPenalty);

    var price = getCoverRate(cover) * getCountryRate(country) * getSumAgeRisk(ages) * getDays(departureDate, returnDate) + getOptions(options);
    price = price * discount * childPenalty;

    return price;

}

exports.round = function round(value, decimals) {

    var number = Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);

    return number;
}


exports.isDatesValid = function(depDate, returnDate) {

}
