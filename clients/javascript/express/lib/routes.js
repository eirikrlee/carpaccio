var quoteUtil = require('../utils/quoteUtil'),
    offersUtil = require('../utils/offer');

exports.order = function order(req, res, next) {

  if(Object.keys(req.body).length === 0) {
    console.log('throw error');
    next(new Error('something failed!'));
  }

  // TODO implement from here
  var travellerAges = req.body.travellerAges,
      cover = req.body.cover,
      country = req.body.country,
      departureDate = req.body.departureDate,
      returnDate = req.body.returnDate,
      options = req.body.options;


  var quote = quoteUtil.getQuote(cover, country, departureDate, returnDate, travellerAges, options);

  var roundedQuote = quoteUtil.round(Math.floor(quote), 2);

  console.log('roundedQuote', roundedQuote);

  var offers = offersUtil.getOffers(req.body);

  res.json({ offers: offers});


}

exports.feedback = function feedback(req, res, next) {
  console.info("FEEDBACK:", req.body.type, req.body.message);
  next();
}
