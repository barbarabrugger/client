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
  setDateTimePickerValue,
  scrollTo,
} = require('../utils');

describe('Employee Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToEmployeeScreen();
  });

  const navigateToEmployeeScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('employeeEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('employeeEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('employeeScreen');
  };

  it('should allow you to create, update, and delete the Employee entity', async () => {
    await expect(element(by.id('employeeScreen'))).toBeVisible();

    /*
     * Create Employee
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('employeeEditScrollView');
    // firstName
    await scrollTo('firstNameInput', 'employeeEditScrollView');
    await element(by.id('firstNameInput')).replaceText('Bennett');
    await element(by.id('firstNameInput')).tapReturnKey();
    // lastName
    await scrollTo('lastNameInput', 'employeeEditScrollView');
    await element(by.id('lastNameInput')).replaceText('Bogan');
    await element(by.id('lastNameInput')).tapReturnKey();
    // email
    await scrollTo('emailInput', 'employeeEditScrollView');
    await element(by.id('emailInput')).replaceText('Jayne_Cormier25@hotmail.com');
    await element(by.id('emailInput')).tapReturnKey();
    // phoneNumber
    await scrollTo('phoneNumberInput', 'employeeEditScrollView');
    await element(by.id('phoneNumberInput')).replaceText('drive');
    await element(by.id('phoneNumberInput')).tapReturnKey();
    // hireDate
    await scrollTo('hireDateInput', 'employeeEditScrollView');
    await setDateTimePickerValue('hireDateInput', '2021-01-25T13:48:00+01:00', 'ISO8601');
    // salary
    await scrollTo('salaryInput', 'employeeEditScrollView');
    await element(by.id('salaryInput')).replaceText('2602');
    await element(by.id('salaryInput')).tapReturnKey();
    // commissionPct
    await scrollTo('commissionPctInput', 'employeeEditScrollView');
    await element(by.id('commissionPctInput')).replaceText('82226');
    await element(by.id('commissionPctInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'employeeEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Employee - validate the creation
     */
    await waitForElementToBeVisibleById('employeeDetailScrollView');
    // firstName
    await scrollTo('firstName', 'employeeDetailScrollView');
    await expect(element(by.id('firstName'))).toHaveLabel('Bennett');
    // lastName
    await scrollTo('lastName', 'employeeDetailScrollView');
    await expect(element(by.id('lastName'))).toHaveLabel('Bogan');
    // email
    await scrollTo('email', 'employeeDetailScrollView');
    await expect(element(by.id('email'))).toHaveLabel('Jayne_Cormier25@hotmail.com');
    // phoneNumber
    await scrollTo('phoneNumber', 'employeeDetailScrollView');
    await expect(element(by.id('phoneNumber'))).toHaveLabel('drive');
    // hireDate
    await scrollTo('hireDate', 'employeeDetailScrollView');
    const hireDateCreateAttributes = await element(by.id('hireDate')).getAttributes();
    jestExpect(Date.parse(hireDateCreateAttributes.label)).toEqual(Date.parse('2021-01-25T13:48:00+01:00'));
    // salary
    await scrollTo('salary', 'employeeDetailScrollView');
    await expect(element(by.id('salary'))).toHaveLabel('2602');
    // commissionPct
    await scrollTo('commissionPct', 'employeeDetailScrollView');
    await expect(element(by.id('commissionPct'))).toHaveLabel('82226');

    /*
     * Update Employee
     */
    await scrollTo('employeeEditButton', 'employeeDetailScrollView');
    await tapFirstElementByLabel('Employee Edit Button');
    await waitForElementToBeVisibleById('employeeEditScrollView');
    // firstName
    await scrollTo('firstNameInput', 'employeeEditScrollView');
    await element(by.id('firstNameInput')).replaceText('Bennett');
    await element(by.id('firstNameInput')).tapReturnKey();
    // lastName
    await scrollTo('lastNameInput', 'employeeEditScrollView');
    await element(by.id('lastNameInput')).replaceText('Bogan');
    await element(by.id('lastNameInput')).tapReturnKey();
    // email
    await scrollTo('emailInput', 'employeeEditScrollView');
    await element(by.id('emailInput')).replaceText('Jayne_Cormier25@hotmail.com');
    await element(by.id('emailInput')).tapReturnKey();
    // phoneNumber
    await scrollTo('phoneNumberInput', 'employeeEditScrollView');
    await element(by.id('phoneNumberInput')).replaceText('drive');
    await element(by.id('phoneNumberInput')).tapReturnKey();
    // hireDate
    await scrollTo('hireDateInput', 'employeeEditScrollView');
    await setDateTimePickerValue('hireDateInput', '2021-01-25T16:01:00+01:00', 'ISO8601');
    // salary
    await scrollTo('salaryInput', 'employeeEditScrollView');
    await element(by.id('salaryInput')).replaceText('49944');
    await element(by.id('salaryInput')).tapReturnKey();
    // commissionPct
    await scrollTo('commissionPctInput', 'employeeEditScrollView');
    await element(by.id('commissionPctInput')).replaceText('60181');
    await element(by.id('commissionPctInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'employeeEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Employee - validate the update
     */
    await waitForElementToBeVisibleById('employeeDetailScrollView');
    // firstName
    await scrollTo('firstName', 'employeeDetailScrollView');
    await expect(element(by.id('firstName'))).toHaveLabel('Bennett');
    // lastName
    await scrollTo('lastName', 'employeeDetailScrollView');
    await expect(element(by.id('lastName'))).toHaveLabel('Bogan');
    // email
    await scrollTo('email', 'employeeDetailScrollView');
    await expect(element(by.id('email'))).toHaveLabel('Jayne_Cormier25@hotmail.com');
    // phoneNumber
    await scrollTo('phoneNumber', 'employeeDetailScrollView');
    await expect(element(by.id('phoneNumber'))).toHaveLabel('drive');
    // hireDate
    await scrollTo('hireDate', 'employeeDetailScrollView');
    const hireDateUpdateAttributes = await element(by.id('hireDate')).getAttributes();
    jestExpect(Date.parse(hireDateUpdateAttributes.label)).toEqual(Date.parse('2021-01-25T16:01:00+01:00'));
    // salary
    await scrollTo('salary', 'employeeDetailScrollView');
    await expect(element(by.id('salary'))).toHaveLabel('49944');
    // commissionPct
    await scrollTo('commissionPct', 'employeeDetailScrollView');
    await expect(element(by.id('commissionPct'))).toHaveLabel('60181');

    /*
     * Delete
     */
    await scrollTo('employeeDeleteButton', 'employeeDetailScrollView');
    await waitThenTapButton('employeeDeleteButton');
    await waitForElementToBeVisibleById('employeeDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('employeeScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
