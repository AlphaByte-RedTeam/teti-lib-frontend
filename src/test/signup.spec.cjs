const { Builder, Browser, By, until } = require("selenium-webdriver");
const assert = require("assert");

const name = "rereeee";
const email = "rereeee@gmail.com";
const password = "rereeee";
const confirmationPass = password;

describe("Sign Up", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });

  it("Should Success For New User", async function () {
    await driver.get("https://teti-library.vercel.app/signup");
    const title = await driver.getTitle();
    assert.strictEqual(title, "Sign Up - TETI Library");

    const nameTextBox = await driver.findElement(
      By.xpath("//input[@placeholder='Name']"),
    );
    const emailTextBox = await driver.findElement(
      By.xpath("//input[@placeholder='Email']"),
    );
    const passwordTextBox = await driver.findElement(
      By.xpath("//input[@placeholder='Password']"),
    );
    const confirmPasswordTextBox = await driver.findElement(
      By.xpath("//input[@placeholder='Confirm Password']"),
    );
    const submitButton = await driver.findElement(
      By.css("button.chakra-button.css-dekyin"),
    );

    await nameTextBox.sendKeys(name);
    await emailTextBox.sendKeys(email);
    await passwordTextBox.sendKeys(password);
    await confirmPasswordTextBox.sendKeys(password);
    await submitButton.click();

    const toastNotification = await driver.wait(
      until.elementLocated(By.xpath("//div[@role='status']")),
    );
    const toastText = await toastNotification.getText();
    assert.strictEqual(toastText, "Sign Up Success");
  });

  it("Should Failed If Existing User Is Already Registered", async function () {
    await driver.get("https://teti-library.vercel.app/signup");
    const title = await driver.getTitle();
    assert.strictEqual(title, "Sign Up - TETI Library");

    const nameTextBox = await driver.findElement(
      By.xpath("//input[@placeholder='Name']"),
    );
    const emailTextBox = await driver.findElement(
      By.xpath("//input[@placeholder='Email']"),
    );
    const passwordTextBox = await driver.findElement(
      By.xpath("//input[@placeholder='Password']"),
    );
    const confirmPasswordTextBox = await driver.findElement(
      By.xpath("//input[@placeholder='Confirm Password']"),
    );
    const submitButton = await driver.findElement(
      By.css("button.chakra-button.css-dekyin"),
    );

    await nameTextBox.sendKeys(name);
    await emailTextBox.sendKeys(email);
    await passwordTextBox.sendKeys(password);
    await confirmPasswordTextBox.sendKeys(confirmationPass);
    await submitButton.click();

    const toastNotification = await driver.wait(
      until.elementLocated(By.xpath("//div[@role='status']")),
    );
    const toastText = await toastNotification.getText();
    assert.strictEqual(
      toastText,
      "Another user with that email already registered.",
    );
  });

  it("Should Failed If Password Confirmation Does Not Match", async function () {
    await driver.get("https://teti-library.vercel.app/signup");
    const title = await driver.getTitle();
    assert.strictEqual(title, "Sign Up - TETI Library");

    const nameTextBox = await driver.findElement(
      By.xpath("//input[@placeholder='Name']"),
    );
    const emailTextBox = await driver.findElement(
      By.xpath("//input[@placeholder='Email']"),
    );
    const passwordTextBox = await driver.findElement(
      By.xpath("//input[@placeholder='Password']"),
    );
    const confirmPasswordTextBox = await driver.findElement(
      By.xpath("//input[@placeholder='Confirm Password']"),
    );
    const submitButton = await driver.findElement(
      By.css("button.chakra-button.css-dekyin"),
    );

    await nameTextBox.sendKeys(name);
    await emailTextBox.sendKeys(email);
    await passwordTextBox.sendKeys(password);
    await confirmPasswordTextBox.sendKeys(`${confirmationPass}e`);
    await submitButton.click();

    const toastNotification = await driver.wait(
      until.elementLocated(By.xpath("//div[@role='status']")),
    );
    const toastText = await toastNotification.getText();
    assert.strictEqual(toastText, "Password doesn't match.");
  });

  after(async () => driver.quit(), 10000);
});
