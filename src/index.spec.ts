import {validatePermissions} from './index';

describe('input validation', () => {
  test('should always return false if user permissions are empty', () => {
    expect(validatePermissions([], [])).toBe(false);
    expect(validatePermissions(['object'],[])).toBe(false);
  })

  test('should always return false if the required permission is empty', () => {
    expect(validatePermissions([], ['object'])).toBe(false);
  })

  test('should throw an exception if user permissions are not valid', () => {
    expect(() => validatePermissions('object', '')).toThrowError('Invalid user permissions');
    expect(() => validatePermissions('object', ' ')).toThrowError('Invalid user permissions');
    expect(() => validatePermissions('object', [''])).toThrowError('Invalid user permissions');
    expect(() => validatePermissions('object', ['something', ''])).toThrowError('Invalid user permissions');
  })

  test('should throw an exception if required permissions are not valid', () => {
    expect(() => validatePermissions('', ['object'])).toThrowError('Invalid required permissions');
    expect(() => validatePermissions(' ', ['object'])).toThrowError('Invalid required permissions');
    expect(() => validatePermissions([''], ['object'])).toThrowError('Invalid required permissions');
    expect(() => validatePermissions(['something', ''], ['object'])).toThrowError('Invalid required permissions');
  })
})

test('owner permission required should always return true', () => {
  expect(validatePermissions(['anything'],['owner'])).toBe(true);
  expect(validatePermissions(['owner'],['owner'])).toBe(true);
  expect(validatePermissions(['something:anything'],['owner'])).toBe(true);
})

test('admin permission required should always return true', () => {
  expect(validatePermissions(['anything'],['admin'])).toBe(true);
  expect(validatePermissions(['admin'],['admin'])).toBe(true);
  expect(validatePermissions(['something:anything'],['admin'])).toBe(true);
})

test('should check for one specific permission', () => {
  expect(validatePermissions('something:one', 'something:one')).toBe(true);
  expect(validatePermissions(['something:one'], 'something:one')).toBe(true);
  expect(validatePermissions('something:one', ['something:one'])).toBe(true);
  expect(validatePermissions(['something:one'], ['something:one'])).toBe(true);
})

test('should block when you are missing one specific permission', () => {
  expect(validatePermissions('something:one', 'something:two')).toBe(false);
  expect(validatePermissions(['something:one'], 'something:two')).toBe(false);
  expect(validatePermissions('something:one', ['something:two'])).toBe(false);
  expect(validatePermissions(['something:one'], ['something:two'])).toBe(false);
})

test('should check for one specific permission', () => {
  expect(validatePermissions('something:one', ['something:one', 'something:two'])).toBe(true);
  expect(validatePermissions(['something:one'], ['something:one', 'something:two'])).toBe(true);
})

test('should validate the object:action:scope', () => {
  expect(validatePermissions('object:action:scope', 'object')).toBe(true);
  expect(validatePermissions('object:action:scope', 'object:action')).toBe(true);
  expect(validatePermissions('object:action:scope', 'object:action:scope')).toBe(true);
  expect(validatePermissions('object:action:scope', 'object:wrong-action')).toBe(false);
  expect(validatePermissions('object:action:scope', 'object:wrong-action:wrong-scope')).toBe(false);
  expect(validatePermissions('object:action:scope', 'object:action:wrong-scope')).toBe(false);
})

test('should validate the object:action', () => {
  expect(validatePermissions('object:action', 'object')).toBe(true);
  expect(validatePermissions('object:action', 'object:action')).toBe(true);
  expect(validatePermissions('object:action', 'object:action:scope')).toBe(false);
  expect(validatePermissions('object:action', 'object:wrong-action')).toBe(false);
  expect(validatePermissions('object:action', 'object:wrong-action:wrong-scope')).toBe(false);
  expect(validatePermissions('object:action', 'object:action:wrong-scope')).toBe(false);
})

test('should validate the object', () => {
  expect(validatePermissions('object', 'object')).toBe(true);
  expect(validatePermissions('object', 'object:action')).toBe(false);
  expect(validatePermissions('object', 'object:action:scope')).toBe(false);
  expect(validatePermissions('object', 'object:wrong-action')).toBe(false);
  expect(validatePermissions('object', 'object:wrong-action:wrong-scope')).toBe(false);
  expect(validatePermissions('object', 'object:action:wrong-scope')).toBe(false);
})
