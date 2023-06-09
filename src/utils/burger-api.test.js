import { checkResponse } from './burger-api'

describe('check checkResponse function', () => {
    it('should be success', () => {
        const testObj = {
            ok: true,
            json() {
                return { result: 'OK' }
            },
        }

        const result = checkResponse(testObj)

        expect(result).toEqual({ result: 'OK' })
    })
    it('should be fail', () => {
        const testObj = {
            ok: false,
            status: '400',
        }

        const result = checkResponse(testObj)

        expect(result).rejects.toBe('400')
    })
})

// describe('check getUserData function', () => {
//     beforeEach(() => {
//         jest.spyOn(global, 'fetch').mockResolvedValue({
//             json: jest.fn().mockResolvedValue({
//                 result: 'OK',
//             }),
//             ok: true,
//         })
//     })

//     afterEach(() => {
//         jest.restoreAllMocks()
//     })

// it('should be success', async () => {
//     const result = await getUserData()
//     expect(result).toEqual({ result: 'OK' })
// })
// })
