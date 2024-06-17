const { Builder, Browser, By, until } = require("selenium-webdriver");
const assert = require("assert");

const email = "rereeee@gmail.com";
const password = "rereeee";

describe("Sign In", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });

  it("Should Sign In", async function () {
    await driver.get("https://teti-library.vercel.app/signin");
    const title = await driver.getTitle();
    assert.strictEqual(title, "Sign In - TETI Library");

    const emailTextBox = await driver.findElement(
      By.xpath("//input[@placeholder='Email']"),
    );
    const passwordTextBox = await driver.findElement(
      By.xpath("//input[@placeholder='Password']"),
    );
    const submitButton = await driver.findElement(
      By.css("button.chakra-button.css-dekyin"),
    );

    await emailTextBox.sendKeys(email);
    await passwordTextBox.sendKeys(password);
    await submitButton.click();
  });

  it("Should Redirect To Home", async function () {
    await driver.wait(until.urlIs("https://teti-library.vercel.app/"), 5000);

    const accountName = await driver.findElement(
      By.css("button.chakra-menu__menu-button.css-kjvu41"),
    );
    const accountNameText = await accountName.getText();
    assert.strictEqual(accountNameText, email);
  });

  after(async () => driver.quit(), 10000);
});
