import { checkResponse } from './burger-api'

describe('check checkResponse function', () => {
    it('should be success', () => {
        const testObj = {
            ok: 'true',
            json() {
                return { result: 'OK' }
            },
        }

        const result = checkResponse(testObj)

        expect(result).toEqual({ result: 'OK' })
    })
})
