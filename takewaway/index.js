/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.generateTakeAwayDecision = (req, res) => {

  let deliveryRequired = req.body.queryResult.parameters['delivery-required'];

  let deliveredOptions = [
    'Chinese. Can I suggest the crispy beef?',
    'Chinese. Can I suggest curry rice and chips?',
    'Thai. I do not know any thai meals, so take a gamble',
    'Woodys. All pizza is awesome, so have a change',
    'Woodys. Have your regular'
  ];
  let pickupOptions = [
      'Indian. Can I suggest the chicken tikka biryani with a plain madras sauce?',
	  'Indian. Can I suggest the chicken tikka jalfrezi?',
      'Indian. Can I suggest the chicken tikka dansak?',
      'Wagamamas. Can I suggest the firecracker curry?',
      'Wagamamas. Can I suggest the katsu curry?',
      'Fish and chips. Can I suggest gravy?',
      'Fish and chips. Can I suggest Irish curry?',
      'Dominoes. Can I suggest the Meteor?',
      'Dominoes. Can I suggest the tandoori hot?' 
  ];
  
  
  let chosen;
  let message;
  if (deliveryRequired === "Yes") {
    chosen = deliveredOptions[Math.floor(Math.random()*deliveredOptions.length)];    
    message = "Okay, I have genearated a random take away based on your favourite places, and restricted your results to include only take aways which offer a delivery service. The chosen take away for tonight is " + chosen + " Please enjoy your evening";
  } else {
    let concatOptions = deliveredOptions.concat(pickupOptions);
	chosen = concatOptions[Math.floor(Math.random()*concatOptions.length)];  
    message = "Okay, I have genearated a random take away based on your favourite places. I have not restricted the results to delivery only, so you may be required to pick up your order. The chosen take away for tonight is " + chosen + " Please enjoy your evening";
  }
  
  let concatOptions = deliveredOptions.concat(pickupOptions);
  
  res.status(200).send({ "fulfillmentText": message });
 };

