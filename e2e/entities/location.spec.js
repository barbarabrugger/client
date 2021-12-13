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

describe('Location Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToLocationScreen();
  });

  const navigateToLocationScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('locationEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('locationEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('locationScreen');
  };

  it('should allow you to create, update, and delete the Location entity', async () => {
    await expect(element(by.id('locationScreen'))).toBeVisible();

    /*
     * Create Location
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('locationEditScrollView');
    // streetAddress
    await scrollTo('streetAddressInput', 'locationEditScrollView');
    await element(by.id('streetAddressInput')).replaceText('Bacon');
    await element(by.id('streetAddressInput')).tapReturnKey();
    // postalCode
    await scrollTo('postalCodeInput', 'locationEditScrollView');
    await element(by.id('postalCodeInput')).replaceText('Multi-channelled brand');
    await element(by.id('postalCodeInput')).tapReturnKey();
    // city
    await scrollTo('cityInput', 'locationEditScrollView');
    await element(by.id('cityInput')).replaceText('Harmonystad');
    await element(by.id('cityInput')).tapReturnKey();
    // stateProvince
    await scrollTo('stateProvinceInput', 'locationEditScrollView');
    await element(by.id('stateProvinceInput')).replaceText('Rupee');
    await element(by.id('stateProvinceInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'locationEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Location - validate the creation
     */
    await waitForElementToBeVisibleById('locationDetailScrollView');
    // streetAddress
    await scrollTo('streetAddress', 'locationDetailScrollView');
    await expect(element(by.id('streetAddress'))).toHaveLabel('Bacon');
    // postalCode
    await scrollTo('postalCode', 'locationDetailScrollView');
    await expect(element(by.id('postalCode'))).toHaveLabel('Multi-channelled brand');
    // city
    await scrollTo('city', 'locationDetailScrollView');
    await expect(element(by.id('city'))).toHaveLabel('Harmonystad');
    // stateProvince
    await scrollTo('stateProvince', 'locationDetailScrollView');
    await expect(element(by.id('stateProvince'))).toHaveLabel('Rupee');

    /*
     * Update Location
     */
    await scrollTo('locationEditButton', 'locationDetailScrollView');
    await tapFirstElementByLabel('Location Edit Button');
    await waitForElementToBeVisibleById('locationEditScrollView');
    // streetAddress
    await scrollTo('streetAddressInput', 'locationEditScrollView');
    await element(by.id('streetAddressInput')).replaceText('Bacon');
    await element(by.id('streetAddressInput')).tapReturnKey();
    // postalCode
    await scrollTo('postalCodeInput', 'locationEditScrollView');
    await element(by.id('postalCodeInput')).replaceText('Multi-channelled brand');
    await element(by.id('postalCodeInput')).tapReturnKey();
    // city
    await scrollTo('cityInput', 'locationEditScrollView');
    await element(by.id('cityInput')).replaceText('Harmonystad');
    await element(by.id('cityInput')).tapReturnKey();
    // stateProvince
    await scrollTo('stateProvinceInput', 'locationEditScrollView');
    await element(by.id('stateProvinceInput')).replaceText('Rupee');
    await element(by.id('stateProvinceInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'locationEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Location - validate the update
     */
    await waitForElementToBeVisibleById('locationDetailScrollView');
    // streetAddress
    await scrollTo('streetAddress', 'locationDetailScrollView');
    await expect(element(by.id('streetAddress'))).toHaveLabel('Bacon');
    // postalCode
    await scrollTo('postalCode', 'locationDetailScrollView');
    await expect(element(by.id('postalCode'))).toHaveLabel('Multi-channelled brand');
    // city
    await scrollTo('city', 'locationDetailScrollView');
    await expect(element(by.id('city'))).toHaveLabel('Harmonystad');
    // stateProvince
    await scrollTo('stateProvince', 'locationDetailScrollView');
    await expect(element(by.id('stateProvince'))).toHaveLabel('Rupee');

    /*
     * Delete
     */
    await scrollTo('locationDeleteButton', 'locationDetailScrollView');
    await waitThenTapButton('locationDeleteButton');
    await waitForElementToBeVisibleById('locationDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('locationScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
