const {
  reloadApp,
  loginAsUser,
  logout,
  goBack,
  tapFirstElementByLabel,
  openAndTapDrawerMenuItemByLabel,
  waitThenTapButton,
  waitForElementToBeVisibleById,
  scrollTo,
} = require('../utils');

describe('Country Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToCountryScreen();
  });

  const navigateToCountryScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('countryEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('countryEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('countryScreen');
  };

  it('should allow you to create, update, and delete the Country entity', async () => {
    await expect(element(by.id('countryScreen'))).toBeVisible();

    /*
     * Create Country
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('countryEditScrollView');
    // countryName
    await scrollTo('countryNameInput', 'countryEditScrollView');
    await element(by.id('countryNameInput')).replaceText('Brand');
    await element(by.id('countryNameInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'countryEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Country - validate the creation
     */
    await waitForElementToBeVisibleById('countryDetailScrollView');
    // countryName
    await scrollTo('countryName', 'countryDetailScrollView');
    await expect(element(by.id('countryName'))).toHaveLabel('Brand');

    /*
     * Update Country
     */
    await scrollTo('countryEditButton', 'countryDetailScrollView');
    await tapFirstElementByLabel('Country Edit Button');
    await waitForElementToBeVisibleById('countryEditScrollView');
    // countryName
    await scrollTo('countryNameInput', 'countryEditScrollView');
    await element(by.id('countryNameInput')).replaceText('Brand');
    await element(by.id('countryNameInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'countryEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Country - validate the update
     */
    await waitForElementToBeVisibleById('countryDetailScrollView');
    // countryName
    await scrollTo('countryName', 'countryDetailScrollView');
    await expect(element(by.id('countryName'))).toHaveLabel('Brand');

    /*
     * Delete
     */
    await scrollTo('countryDeleteButton', 'countryDetailScrollView');
    await waitThenTapButton('countryDeleteButton');
    await waitForElementToBeVisibleById('countryDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('countryScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
