/*
   Copyright 2022 Marc Nuri San Felix

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
describe('Main :: Global Keyboard Shortcuts module test suite', () => {
  let electron;
  beforeEach(() => {
    jest.resetModules();
    jest.mock('electron', () => require('../../__tests__').mockElectronInstance());
    require('../').init();
    electron = require('electron');
  });
  test.each([
    ['Escape', 'appMenuClose'], ['Escape', 'closeDialog'],
    ['F11', 'fullscreenToggle']
  ])('Accelerator "%s" triggers "%s" app event', (accelerator, appEvent) => {
    electron.globalShortcut.listeners[accelerator]();
    expect(electron.ipcMain.emit).toHaveBeenCalledWith(appEvent);
  });
});