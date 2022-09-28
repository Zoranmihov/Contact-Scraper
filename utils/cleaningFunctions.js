// Clean adresses of any \n and \t tags
module.exports.cleanArray = (array) => {
  // Remove all \n tags
  let elementsToclean = [];
  array.forEach((string) => {
    if(string != null){
      if (string.includes("\n")) {
        let fullString = "";
        result = string.split("\n");
        result.forEach((part) => {
          fullString = fullString + part + " ";
          fullString = fullString.replaceAll(/\s\s+/g, " ");
          fullString = fullString.trim();
        });
        elementsToclean.push(fullString);
      } else {
        elementsToclean.push(string);
      }
    }
  });
  array = elementsToclean;

  // Remove all \t tags
  elementsToclean = [];
  array.forEach((string) => {
    if (string.includes("\t")) {
      let fullString = "";
      result = string.split("\t");
      result.forEach((part) => {
        fullString = fullString + part + " ";
        fullString = fullString.replaceAll(/\s\s+/g, " ");
        fullString = fullString.trim();
      });
      elementsToclean.push(fullString);
    } else {
      elementsToclean.push(string);
    }
  });

  array = elementsToclean;

  return array;
};

