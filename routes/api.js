/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get((req,res)=>{
      let input = req.query.input;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      if (initNum=="error" && initUnit=="error"){
        res.send("invalid number and unit")
      } else if (initNum=="error"){
        res.send("invalid number")
      } else if (initUnit=="error"){
        res.send("invalid unit")
      } else {
        let returnNum = convertHandler.convert(initNum, initUnit);
        let returnUnit = convertHandler.getReturnUnit(initUnit);
        let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
        let jsonResult = {
          initNum: initNum,
          initUnit: initUnit=='l'? 'L':initUnit,
          returnNum: returnNum,
          returnUnit: returnUnit,
          string: toString
        }
        console.log(`input: ${input}`);
        console.log(jsonResult);
        res.json(jsonResult);
      }
    });
    
};
