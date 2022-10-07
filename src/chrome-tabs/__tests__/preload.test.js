/*
   Copyright 2019 Marc Nuri San Felix

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
const {waitFor} = require('@testing-library/dom');

describe('Chrome Tabs Module preload test suite', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe('preload (just for coverage and sanity, see bundle tests)', () => {
    beforeEach(() => {
      jest.mock('../chrome-tabs.browser.css', () => {});
      window.APP_EVENTS = {};
      window.ELECTRONIM_VERSION = '1.33.7';
      require('../preload');
    });
    test('adds required libraries', () => {
      expect(window.ELECTRONIM_VERSION).toEqual('1.33.7');
    });
  });
  describe('preload.bundle', () => {
    beforeEach(() => {
      require('../../../bundles/chrome-tabs.preload');
    });
    test('loads styles in order', async () => {
      // When
      document.body.append(document.createElement('div'));
      // Then
      await waitFor(() => expect(document.head.children.length).toBeGreaterThan(0));
      const styles = Array.from(document.querySelectorAll('style'));
      expect(styles).toHaveLength(1);
      expect(styles[0].innerHTML).toContain('.tab-container .chrome-tabs {');
    });
    test('adds required variables', async () => {
      expect(window.ELECTRONIM_VERSION).toEqual('0.0.0');
    });
  });
});
