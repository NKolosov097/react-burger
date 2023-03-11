const NORMA_API = 'https://norma.nomoreparties.space/api'

const checkResponse = (res) =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err))

export const getIngredients = async () => {
    const res = await fetch(`${NORMA_API}/ingredients`)
    const incomingData = checkResponse(res)
    return incomingData
}
