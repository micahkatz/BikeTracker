
exports.getAmountDrank = (numOunces) => {

  isGal = false;

  if (numOunces >= 128){
    isGal = true;
  }

  var amount;

  if(isGal){

    var numGallons = numOunces / 128;    

    amount = numGallons + ' gal';
    
  } else {

    amount = numOunces + ' oz';
    
  }
  return amount;
}
