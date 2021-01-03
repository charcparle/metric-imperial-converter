/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = (input)=> {
    let result = 1;
    let regex = /[A-Za-z]/;
    for (let i=0;i<input.length;i++){
      //console.log(input[i])
      if (regex.test(input[i])) {
        if (i==0){
          return result;
        }
        result = input.slice(0,i);
        if (result.includes('/')){
          for (let j=0;j<result.length;j++){
            if(result[j]=='/'){
              result = result.slice(0,j)/result.slice(j+1)
            }
          }
        }
        if (isNaN(result)){
          return "error"
        } else {
          return result*1;  
        }
      }
    }
    if (isNaN(result)){
      return "error"
    } else {
      return result*1;  
    }
  };
  
  this.getUnit = (input)=>{
    let result = "error";
    let regex = /[A-Za-z]/;
    for (let i=0;i<input.length;i++){
      if (regex.test(input[i])) {
        result = input.slice(i,input.length)
        if (this.getReturnUnit(result)=="error"){
          return "error";
        }
        result = result.toLowerCase() == 'l'? 'L': result.toLowerCase();
        return result;
      } else if (i==input.length-1){
        return "error"; // no unit given
      }
    }
    return result;
  };
  
  this.getReturnUnit = (initUnit)=> {
    let result;
    switch (initUnit.toLowerCase()){
      case 'gal':
        result = 'L';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      default:
        result = "error";
    }
    return result;
  };

  this.spellOutUnit = (unit)=> {
    let result;
    switch (unit.toLowerCase()){
      case 'gal':
        result = 'gallons';
        break;
      case 'l':
        result = 'liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      default:
        result = "error";
    }
    return result;
  };
  
  this.convert = (initNum, initUnit)=> {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit.toLowerCase()){
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = "error";
    }
    return result.toFixed(5)*1;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    return result;
  };
  
}

module.exports = ConvertHandler;
