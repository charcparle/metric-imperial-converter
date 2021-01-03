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
const fs = require('fs');
/*
// https://stackoverflow.com/questions/11616630/how-can-i-print-a-circular-structure-in-a-json-like-format/11616993#11616993
// Demo: Circular reference
var circ = {};
circ.circ = circ;

// Note: cache should not be re-used by repeated calls to JSON.stringify.
var cache = [];
JSON.stringify(circ, (key, value) => {
  if (typeof value === 'object' && value !== null) {
    // Duplicate reference found, discard key
    if (cache.includes(value)) return;

    // Store value in our collection
    cache.push(value);
  }
  return value;
});
cache = null; // Enable garbage collection
*/
module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get((req,res)=>{
      let input = req.query.input;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      if (initNum=="error" && initUnit=="error"){
        res.json("invalid number and unit")
        
        let cache = [];
        let output = JSON.stringify(res, (key, value) => {
          if (typeof value === 'object' && value !== null) {
            // Duplicate reference found, discard key
            if (cache.includes(value)) return;

            // Store value in our collection
            cache.push(value);
          }
          return value;
        },4);
        cache = null; // Enable garbage collection
        
        fs.writeFile('message.txt', output, (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
      } else if (initNum=="error"){
        res.json("invalid number")
      } else if (initUnit=="error"){
        res.json("invalid unit")
      } else {
        let returnNum = convertHandler.convert(initNum, initUnit);
        let returnUnit = convertHandler.getReturnUnit(initUnit);
        let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
        let jsonResult = {
          initNum: initNum,
          initUnit: initUnit,
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
