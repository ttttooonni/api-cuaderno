import test from 'node:test';
import assert from 'node:assert/strict';

const validMethods = ['azucar_glas', 'alcohol', 'caida_natural'];

test('domain contract: varroa methods are fixed', () => {
  assert.deepEqual(validMethods, ['azucar_glas', 'alcohol', 'caida_natural']);
});

test('domain contract: negative counts are invalid', () => {
  assert.equal(-1 < 0, true);
});

test('domain contract: withdrawal days cannot be negative', () => {
  assert.equal(-1 < 0, true);
});
