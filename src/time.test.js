import test from 'node:test'
import assert from 'node:assert/strict'

import { getTimeGreeting, formatLiveDate } from './time.js'

test('morning greeting before noon', () => {
  assert.equal(getTimeGreeting(new Date('2026-08-24T08:30:00')), 'Good morning')
})

test('afternoon greeting after noon', () => {
  assert.equal(getTimeGreeting(new Date('2026-08-24T15:30:00')), 'Good afternoon')
})

test('date label reflects the provided live date', () => {
  const date = new Date('2026-08-24T08:30:00')
  assert.equal(formatLiveDate(date), 'Monday, August 24, 2026')
})
