Cheesto User Status Extension v2.0.1
=====================================

This extension interfaces with Dandelion's public API to display the current status of users in Cheesto.

Requirements
------------

* Chrome
* Dandelion v5+

Use Instructions
----------------

1. Right click the extension icon
2. Click Options
3. Enter the domain name or IP of your Dandelion instance
4. Enter your API Key from Dandelion (found under Settings -> API Key in Dandelion)
5. Click Save Options
6. Click the extension icon to see user statuses

Build Instructions
------------------

1. Clone this git repo
2. In Chrome, enable developer mode
3. Click "Load unpacked extension" in extension management
4. Navigate to the folder where you cloned the repo

Release Notes
-------------

Upcoming

- Option to save and load synced settings

v2.1.0

- Added "New Log Entry" to context menu

v2.0.1

- Fixed log count bug
- Added back Dandelion link, right click extension icon

v2.0.0

- Added logs tab
- Drop support for Dandelion v5

v1.1.0

- Add right click option to clear logs
- Use ES6 template strings
- Ask for a status message when setting

v1.0.1

- Code cleanup, preperation for next version

v1.0.0

- Added support for Dandelion version 6

v0.4.0

- Preliminary ability to set a status
  - You can't choose a return time or status
  - Default to "Today" as return and nothing as status
- All components are generated from JS
- Get and Set status functions are in popup.js

v0.3.0

- Utilize new logs API
- Show badge with number of new logs

v0.2.0

- Options page is now styled
- Regex replace to:
  - Remove trailing slashes from address
  - Remove trailing whitespace from address and api key
- Settings are local by default

v0.1.0

- Initial release to beta test group

Versioning
----------

For transparency into the release cycle and in striving to maintain backward compatibility, the Cheesto Chrome Extension is maintained under the Semantic Versioning guidelines. Sometimes we screw up, but we'll adhere to these rules whenever possible.

Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

- Breaking backward compatibility **bumps the major** while resetting minor and patch
- New additions without breaking backward compatibility **bumps the minor** while resetting the patch
- Bug fixes and misc changes **bumps only the patch**

For more information on SemVer, please visit <http://semver.org/>.
