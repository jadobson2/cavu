import router from '@/router'

describe('router', () => {
  test('beforeEach', async () => {
    router.push('/')
    expect(document.title).toBe('Departures')

    router.push('/foo')
    expect(document.title).toBe('')
  })
})
