
const fs = require("fs");
const fetching = require("./fetchingFunctions");
const cleaning = require("./cleaningFunctions");

// Scraping functions

const findEmail = async (aTags, pTags, spanTags, tdTags) => {
  let foundEmails = [];

  const regex = /[a-z0-9\.\-_]+[@]+[a-z0-9\-_]+\.[a-z-]{2,3}(\.[a-z-]{2,3})?/g;
  // Check all a tags text
  if (aTags.length) {
    aTags.map((string) => {
      string = string.replaceAll(/<[^>]*>/g, " ");
      let matches = string.match(regex);
      if (matches != null) {
        matches.forEach((match) => {
          match = match.trim()
          if (!foundEmails.includes(match)) {
            foundEmails.push(match);
          }
        });
      }
    });
  }

  //Check all p tags text
  if (!foundEmails.length) {
    if (pTags.length) {
      pTags.map((string) => {
        string = string.replaceAll(/<[^>]*>/g, " ");
        let matches = string.match(regex);
        if (matches != null) {
          matches.forEach((match) => {
            match = match.trim()
            if (!foundEmails.includes(match)) {
              foundEmails.push(match);
            }
          });
        }
      });
    }
  } else return foundEmails;

  //Check all span tags text
  if (!foundEmails.length) {
    if (spanTags.length) {
      spanTags.map((string) => {
        string = string.replaceAll(/<[^>]*>/g, " ");
        let matches = string.match(regex);
        if (matches != null) {
          matches.forEach((match) => {
            match = match.trim()
            if (!foundEmails.includes(match)) {
              foundEmails.push(match);
            }
          });
        }
      });
    }
  } else return foundEmails;

  //Check all td tags text
  if (!foundEmails.length) {
    if (tdTags.length) {
      tdTags.map((string) => {
        string = string.replaceAll(/<[^>]*>/g, " ");
        let matches = string.match(regex);
        if (matches != null) {
          matches.forEach((match) => {
            match = match.trim()
            if (!foundEmails.includes(match)) {
              foundEmails.push(match);
            }
          });
        }
      });
    }
  } else return foundEmails;

  if (!foundEmails.length) foundEmails[0] = "No data found";
  return foundEmails;
};

const phoneNumbers = async (aTags, pTags, spanTags, tdTags) => {
  let foundphoneNumbers = [];

  const regex =
    /(([+]{1}[1-9]{1}[0-9]{0,2}[ ]{1}([1-9]{1}[0-9]{1,4}){1}[ ]{1}([1-9]{1}[0-9]{2,6}){1}([ -][0-9]{1,5})?)|([0]{1}[1-9]{1}[0-9]{1,4}[ ]{1}[0-9]{1,8}([ -][0-9]{1,8})?)?)/g;

  if (aTags.length) {
    aTags.map((string) => {
      string = string.replaceAll(/<[^>]*>/g, " ");
      let matches = string.match(regex);
      if (matches != null) {
        matches.forEach((match) => {
          match = match.trim()
          if (!foundphoneNumbers.includes(match) && match.length) {
            foundphoneNumbers.push(match);
          }
        });
      }
    });
  }

  //Check all p tags text
  if (!foundphoneNumbers.length) {
    if (pTags.length) {
      pTags.map((string) => {
        string = string.replaceAll(/<[^>]*>/g, " ");
        let matches = string.match(regex);
        if (matches != null) {
          matches.forEach((match) => {
            match = match.trim()
            if (!foundphoneNumbers.includes(match) && match.length) {
              foundphoneNumbers.push(match);
            }
          });
        }
      });
    }
  } else return foundphoneNumbers;

  //Check all span tags text
  if (!foundphoneNumbers.length) {
    if (spanTags.length) {
      spanTags.map((string) => {
        string = string.replaceAll(/<[^>]*>/g, " ");
        let matches = string.match(regex);
        if (matches != null) {
          matches.forEach((match) => {
            match = match.trim()
            if (!foundphoneNumbers.includes(match) && match.length) {
              foundphoneNumbers.push(match);
            }
          });
        }
      });
    }
  } else return foundphoneNumbers;

  //Check all td tags text
  if (!foundphoneNumbers.length) {
    if (tdTags.length) {
      tdTags.map((string) => {
        string = string.replaceAll(/<[^>]*>/g, " ");
        let matches = string.match(regex);
        if (matches != null) {
          matches.forEach((match) => {
            match = match.trim()
            if (!foundphoneNumbers.includes(match) && match.length) {
              foundphoneNumbers.push(match);
            }
          });
        }
      });
    }
  } else return foundphoneNumbers;

  if (!foundphoneNumbers.length) foundphoneNumbers[0] = "No data found";
  return foundphoneNumbers;
};


// Writing functions
module.exports.writeDomainList = (domainsArray) => {
  let domainData = {};
  domainsArray.forEach((link, index) => {
    domainData[index] = link;
  });
  fs.writeFile(
    "./utils/domainList.json",
    JSON.stringify(domainsArray),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Finished");
      }
    }
  );
};

const writeSearchResults = (results) => {
  fs.writeFile(
    "./utils/lastSearchData.json",
    JSON.stringify(results),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Saved search");
      }
    }
  );
};

// Start crawl
const cralw = async (domain) => {
  let domainInfo = {}; 
  domainInfo.domain = domain;
  let result = await fetching.getHTML(domain);
  if (result.status == "Failed") {
    domainInfo.scraped = "Failed";
    return domainInfo;
  }
  domainInfo.scraped = "Scraped";
  domainInfo.companyName = result.title;

  result.aTags = cleaning.cleanArray(result.aTags);
  result.pTags = cleaning.cleanArray(result.pTags);
  result.spanTags = cleaning.cleanArray(result.spanTags);
  result.tdTags = cleaning.cleanArray(result.tdTags);

  domainInfo.emails = await findEmail(
    result.aTags,
    result.pTags,
    result.spanTags,
    result.tdTags
  );

  domainInfo.phoneNumbers = await phoneNumbers(
    result.aTags,
    result.pTags,
    result.spanTags,
    result.tdTags
  );

  return domainInfo;
};

module.exports.initiateCrwal = async (domainsList) => {
  let collectedData = [];
  for (const domain of domainsList) {
    let time = new Date();
    console.log(`${time.getMinutes()}`, domain);
    let result = await cralw(domain);
    collectedData.push(result);
    delete result;
  }

  writeSearchResults(collectedData);
};
