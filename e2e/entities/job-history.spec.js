const jestExpect = require('expect');
const {
  reloadApp,
  loginAsUser,
  logout,
  goBack,
  tapFirstElementByLabel,
  openAndTapDrawerMenuItemByLabel,
  waitThenTapButton,
  waitForElementToBeVisibleById,
  setPickerValue,
  setDateTimePickerValue,
  scrollTo,
} = require('../utils');

describe('JobHistory Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToJobHistoryScreen();
  });

  const navigateToJobHistoryScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('jobHistoryEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('jobHistoryEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('jobHistoryScreen');
  };

  it('should allow you to create, update, and delete the JobHistory entity', async () => {
    await expect(element(by.id('jobHistoryScreen'))).toBeVisible();

    /*
     * Create JobHistory
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('jobHistoryEditScrollView');
    // startDate
    await scrollTo('startDateInput', 'jobHistoryEditScrollView');
    await setDateTimePickerValue('startDateInput', '2021-01-25T16:12:00+01:00', 'ISO8601');
    // endDate
    await scrollTo('endDateInput', 'jobHistoryEditScrollView');
    await setDateTimePickerValue('endDateInput', '2021-01-24T21:21:00+01:00', 'ISO8601');
    // language
    await scrollTo('languageInput', 'jobHistoryEditScrollView');
    await setPickerValue('languageInput', 'ENGLISH');
    // save
    await scrollTo('submitButton', 'jobHistoryEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View JobHistory - validate the creation
     */
    await waitForElementToBeVisibleById('jobHistoryDetailScrollView');
    // startDate
    await scrollTo('startDate', 'jobHistoryDetailScrollView');
    const startDateCreateAttributes = await element(by.id('startDate')).getAttributes();
    jestExpect(Date.parse(startDateCreateAttributes.label)).toEqual(Date.parse('2021-01-25T16:12:00+01:00'));
    // endDate
    await scrollTo('endDate', 'jobHistoryDetailScrollView');
    const endDateCreateAttributes = await element(by.id('endDate')).getAttributes();
    jestExpect(Date.parse(endDateCreateAttributes.label)).toEqual(Date.parse('2021-01-24T21:21:00+01:00'));
    // language
    await scrollTo('language', 'jobHistoryDetailScrollView');
    await expect(element(by.id('language'))).toHaveLabel('ENGLISH');

    /*
     * Update JobHistory
     */
    await scrollTo('jobHistoryEditButton', 'jobHistoryDetailScrollView');
    await tapFirstElementByLabel('JobHistory Edit Button');
    await waitForElementToBeVisibleById('jobHistoryEditScrollView');
    // startDate
    await scrollTo('startDateInput', 'jobHistoryEditScrollView');
    await setDateTimePickerValue('startDateInput', '2021-01-25T14:59:00+01:00', 'ISO8601');
    // endDate
    await scrollTo('endDateInput', 'jobHistoryEditScrollView');
    await setDateTimePickerValue('endDateInput', '2021-01-25T05:48:00+01:00', 'ISO8601');
    // language
    await scrollTo('languageInput', 'jobHistoryEditScrollView');
    await setPickerValue('languageInput', 'SPANISH');
    // save
    await scrollTo('submitButton', 'jobHistoryEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View JobHistory - validate the update
     */
    await waitForElementToBeVisibleById('jobHistoryDetailScrollView');
    // startDate
    await scrollTo('startDate', 'jobHistoryDetailScrollView');
    const startDateUpdateAttributes = await element(by.id('startDate')).getAttributes();
    jestExpect(Date.parse(startDateUpdateAttributes.label)).toEqual(Date.parse('2021-01-25T14:59:00+01:00'));
    // endDate
    await scrollTo('endDate', 'jobHistoryDetailScrollView');
    const endDateUpdateAttributes = await element(by.id('endDate')).getAttributes();
    jestExpect(Date.parse(endDateUpdateAttributes.label)).toEqual(Date.parse('2021-01-25T05:48:00+01:00'));
    // language
    await scrollTo('language', 'jobHistoryDetailScrollView');
    await expect(element(by.id('language'))).toHaveLabel('SPANISH');

    /*
     * Delete
     */
    await scrollTo('jobHistoryDeleteButton', 'jobHistoryDetailScrollView');
    await waitThenTapButton('jobHistoryDeleteButton');
    await waitForElementToBeVisibleById('jobHistoryDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('jobHistoryScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
