/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.getRefuseSchedule = (req, res) => {

  const request = require('request');
  const cheerio = require('cheerio');
  const propertyId = 'change_me'
  const now = new Date();

  const weekdays = [
   'Sunday',
   'Monday',
   'Tuesday',
   'Wednesday',
   'Thursday',
   'Friday',
   'Saturday',
  ];

  request.get(
    'https://bridgend.kier.co.uk/property/' + propertyId, 
    function (error, response, body) {

      $ = cheerio.load(body);

      var refuseSchedule = [];

      $('.results-table-wrapper tbody tr').each(function (i, r) {

        var name = $(r).find('a').first().text(),
            collectionDateString = $(r).find('.next-service').text().replace('Next Service ', ''),
            collectionDateComponents = collectionDateString.split('/');

        var newCollectionDateString = [
          collectionDateComponents[1], 
          collectionDateComponents[0], 
          collectionDateComponents[2]
        ].join('/');

        var collectionDate = new Date(newCollectionDateString),
            collectionDay = weekdays[collectionDate.getDay()],
            diffInDays = Math.floor((collectionDate - now)/(1000*60*60*24));

        var preposition = diffInDays < 7 ? 'this' : 'next';

        refuseSchedule.push(name + ' is due ' + preposition + ' ' + collectionDay);
      });

      var scheduleString = refuseSchedule.join(', ');

      res.status(200).send({ "fulfillmentText": scheduleString });
  });
}
