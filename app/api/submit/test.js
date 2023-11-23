export async function submitCode(code, problemId, languageId) {
  const puppeteer = require("puppeteer");

  // Launch the browser in incognito mode
  const browser = await puppeteer.launch({ headless: true });
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();

  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto("https://codeforces.com/");

  await page.click('a[href="/enter?back=%2F"]');

  await page.waitForSelector("#handleOrEmail");

  await page.type("#handleOrEmail", "marjia321");
  await page.type("#password", "fsisyf&87fsdhdksfksfj");
  await page.click(".submit");
  await page.waitForTimeout(5000);
  await page.click('a[href="/problemset"]');
  await page.waitForSelector('a[href="/problemset/submit"]');
  await page.click('a[href="/problemset/submit"]');

  await page.waitForTimeout(5000);
  await page.waitForSelector('input[name="submittedProblemCode"]');
  await page.type('input[name="submittedProblemCode"]', problemId);

  await page.select('select[name="programTypeId"]', languageId);
  await page.waitForTimeout(5000);

  await page.evaluate((code) => {
    document.querySelector("#sourceCodeTextarea").style.display = "block";
    document.querySelector("#sourceCodeTextarea").value = code;
  }, code);

  // Submit the form
  await page.click("#singlePageSubmitButton");

  // Add a delay to see the result (adjust as needed)

  await page.waitForTimeout(5000);
  // Add a delay to see the result (adjust as needed)

  // scrap submission id
  const data = await page.evaluate(() => {
    const trElement = document.querySelector("tr.highlighted-row"); // Select the specific <tr> element
    const submissionId = trElement.getAttribute("data-submission-id"); // Extract the value of 'data-submission-id'
    return submissionId;
  });
  await page.waitForTimeout(5000);
  console.log("Submission ID:", data);
  // Close the browser
  await browser.close();
  if (data) {
    return data;
  } else {
    return "error";
  }
}
