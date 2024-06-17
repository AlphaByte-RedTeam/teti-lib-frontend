const { Builder, Browser, By, until } = require("selenium-webdriver");
const assert = require("assert");

const email = "rereeee@gmail.com";
const password = "rereeee";

describe("Borrow Book", function () {
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

  it("Should Query Available Book", async function () {
    const filterButton = await driver.findElement(
      By.css("button.chakra-button.chakra-menu__menu-button.css-pmna7d"),
    );
    await filterButton.click();

    const availableButton = await driver.findElement(
      By.xpath("//*[@data-index='1']"),
    );
    await availableButton.click();
  });

  it('Should Borrow "Si Cacing dan Kotoran Kesayangannya" Book', async function () {
    const bookTitle = "Si Cacing dan Kotoran Kesayangannya";
    const bookCard = await driver.findElement(
      By.xpath(`//p[text()='${bookTitle}']`),
    );
    assert.strictEqual(await bookCard.getText(), bookTitle);
    await bookCard.click();

    const borrowButton = await driver.findElement(
      By.xpath(
        "//*[contains(@class, 'chakra-button') and contains(@class, 'css-17t7yg3')]",
      ),
    );
    await borrowButton.click();

    const toastNotification = await driver.wait(
      until.elementLocated(By.xpath("//div[@role='status']")),
    );
    const toastText = await toastNotification.findElement(
      By.css("div.chakra-alert__title.css-tidvy5"),
    );
    const toastTextValue = await toastText.getText();
    assert.strictEqual(toastTextValue, "Borrowed");
  });

  after(async () => driver.quit(), 10000);
});
