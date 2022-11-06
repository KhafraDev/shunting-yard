import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { evaluate } from '../index.js'

test('evaluate', async (t) => {
  await t.test('Invalid strings throws catchable error', (t) => {
    assert.throws(() => evaluate('('), {
      code: 'GenericFailure'
    })
  })

  await t.test('works in strange inputs', () => {
    assert.deepStrictEqual(
      evaluate('1.070000 + 000000.03'),
      1.1,
      'leading and trailing zeroes'
    )

    assert.deepStrictEqual(evaluate('1 + (3)'), 4)
  })

  assert.deepStrictEqual(evaluate('4 * 5 + 3'), 23)
  assert.deepStrictEqual(evaluate('4 * (5 * 0)'), 0)
  assert.deepStrictEqual(evaluate('4 + (3 - 10)'), -3)
  assert.deepStrictEqual(evaluate('(1/2) * (1/2)'), 1 / 4)
})
