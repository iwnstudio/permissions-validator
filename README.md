#  Permissions Validator

> Helps validate the required permissions against the user permissions.


## Installation

```sh
npm install permissions-validator
```


## How to use
```ts
import { validatePermissions } from 'permissions-validator';

const user1Permissions = ['owner'];
const user2Permissions = ['admin'];
const user3Permissions = ['document', 'user'];
const user4Permissions = ['document:read', 'user:update:me'];

// Which user can `document:write`?
validatePermissions('document:write', user1Permissions); // true
validatePermissions('document:write', user2Permissions); // true 
validatePermissions('document:write', user3Permissions); // true 
validatePermissions('document:write', user4Permissions); // false 

// Which user can `user:date`?
validatePermissions('user:update', user1Permissions); // true
validatePermissions('user:update', user2Permissions); // true
validatePermissions('user:update', user3Permissions); // true 
validatePermissions('user:update', user4Permissions); // false 
```



## Example

- I need the permission `object:action:scope`
  - `object`: true
  - `object:action`: true
  - `object:action:scope`: true
  - `object:wrong-action`: false
  - `object:wrong-action:wrong-scope`: false
  - `object:action:wrong-scope`: false

- I need the permission `object:action`
  - `object`: true
  - `object:action`: true
  - `object:action:scope`: false
  - `object:wrong-action`: false
  - `object:wrong-action:wrong-scope`: false
  - `object:action:wrong-scope`: false

- I need the permission `object`
  - `object`: true
  - `object:action`: false
  - `object:action:scope`: false
  - `object:wrong-action`: false
  - `object:wrong-action:wrong-scope`: false
  - `object:action:wrong-scope`: false