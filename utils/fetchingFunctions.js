const puppeteer = require("puppeteer");
const fs = require("fs");

const findImprint = async (array) => {
  let match = false;
  // Check for impressum
  array.forEach((link) => {
    if (link.toLowerCase().includes("impressum")) {
      match = link;
    }
  });

  // Check for imprint
  if (!match) {
    array.forEach((link) => {
      if (link.toLowerCase().includes("imprint")) {
        match = link;
      }
    });
  }

  // Check for kontakt
  if (!match) {
    array.forEach((link) => {
      if (link.toLowerCase().includes("kontakt")) {
        match = link;
      }
    });
  }

  // Check for contact
  if (!match) {
    array.forEach((link) => {
      if (link.toLowerCase().includes("contact")) {
        match = link;
      }
    });
  }
  // Check about
  if (!match) {
    array.forEach((link) => {
      if (link.toLowerCase().includes("about")) {
        match = link;
      }
    });
  }

  // Check legal
  if (!match) {
    array.forEach((link) => {
      if (link.toLowerCase().includes("legal")) {
        match = link;
      }
    });
  }

  return match;
};

module.exports.getHTML = async (domain) => {
  let attempt = {};

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: false,
    slowMo: 200,
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  let url = false;
  const page = await browser.newPage();
  try {
    await page.goto(domain, { waitUntil: "domcontentloaded" });
    attempt.title = await page.title();
    // Get all a tags
    const hrefs = await page.evaluate(() => {
      let links = [];
      let elements2 = document.querySelectorAll("a");
      for (let element2 of elements2) links.push(element2.href);
      return links;
    });
    url = await findImprint(hrefs);
    attempt.status = "Success";
    if (url) {
      try {
        await page.goto(url, { waitUntil: "domcontentloaded" });
        attempt.aTags = await page.evaluate(() => {
          return Array.from(document.querySelectorAll("a")).map(
            (tag) => tag.innerHTML
          );
        });
        attempt.pTags = await page.evaluate(() => {
          return Array.from(document.querySelectorAll("p")).map(
            (tag) => tag.innerHTML
          );
        });
        attempt.spanTags = await page.evaluate(() => {
          return Array.from(document.querySelectorAll("span")).map(
            (tag) => tag.innerHTML
          );
        });
        attempt.tdTags = await page.evaluate(() => {
          return Array.from(document.querySelectorAll("tr")).map(
            (tag) => tag.innerHTML
          );
        });
      } catch (error) {
      }
    } else {
      attempt.aTags = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("a")).map(
          (tag) => tag.innerHTML
        ).filter(tag => tag.length);
      });
      attempt.pTags = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("p")).map(
          (tag) => tag.innerHTML
        );
      });
      attempt.spanTags = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("span")).map(
          (tag) => tag.innerHTML
        );
      });
      attempt.tdTags = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("tr")).map(
          (tag) => tag.innerHTML
        );
      });
    }
    browser.close();
  } catch (error) {
    attempt.status = "Failed";
    browser.close();
  }
  return attempt;
};
