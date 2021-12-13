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

describe('Task Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToTaskScreen();
  });

  const navigateToTaskScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('taskEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('taskEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('taskScreen');
  };

  it('should allow you to create, update, and delete the Task entity', async () => {
    await expect(element(by.id('taskScreen'))).toBeVisible();

    /*
     * Create Task
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('taskEditScrollView');
    // title
    await scrollTo('titleInput', 'taskEditScrollView');
    await element(by.id('titleInput')).replaceText('Grocery USB');
    await element(by.id('titleInput')).tapReturnKey();
    // description
    await scrollTo('descriptionInput', 'taskEditScrollView');
    await element(by.id('descriptionInput')).replaceText('mobile Ohio Ngultrum');
    await element(by.id('descriptionInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'taskEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Task - validate the creation
     */
    await waitForElementToBeVisibleById('taskDetailScrollView');
    // title
    await scrollTo('title', 'taskDetailScrollView');
    await expect(element(by.id('title'))).toHaveLabel('Grocery USB');
    // description
    await scrollTo('description', 'taskDetailScrollView');
    await expect(element(by.id('description'))).toHaveLabel('mobile Ohio Ngultrum');

    /*
     * Update Task
     */
    await scrollTo('taskEditButton', 'taskDetailScrollView');
    await tapFirstElementByLabel('Task Edit Button');
    await waitForElementToBeVisibleById('taskEditScrollView');
    // title
    await scrollTo('titleInput', 'taskEditScrollView');
    await element(by.id('titleInput')).replaceText('Grocery USB');
    await element(by.id('titleInput')).tapReturnKey();
    // description
    await scrollTo('descriptionInput', 'taskEditScrollView');
    await element(by.id('descriptionInput')).replaceText('mobile Ohio Ngultrum');
    await element(by.id('descriptionInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'taskEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Task - validate the update
     */
    await waitForElementToBeVisibleById('taskDetailScrollView');
    // title
    await scrollTo('title', 'taskDetailScrollView');
    await expect(element(by.id('title'))).toHaveLabel('Grocery USB');
    // description
    await scrollTo('description', 'taskDetailScrollView');
    await expect(element(by.id('description'))).toHaveLabel('mobile Ohio Ngultrum');

    /*
     * Delete
     */
    await scrollTo('taskDeleteButton', 'taskDetailScrollView');
    await waitThenTapButton('taskDeleteButton');
    await waitForElementToBeVisibleById('taskDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('taskScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
