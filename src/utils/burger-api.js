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

export const postOrder = async (ingredients) => {
    try {
        const res = await fetch(`${NORMA_API}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ingredients }),
        })
        return await checkResponse(res)
    } catch (e) {
        throw new Error('Что-то пошло не так', e.message)
    }
}
