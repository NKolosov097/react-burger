const NORMA_API = 'https://norma.nomoreparties.space/api'

const checkResponse = (res) =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err))

export const getIngredients = async () => {
    try {
        const res = await fetch(`${NORMA_API}/ingredients`)
        return await checkResponse(res)
    } catch (e) {
        throw new Error('Что-то пошло не так', e.message)
    }
}
