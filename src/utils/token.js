const TOKEN_KEY = 'token_key'

const getToken = () => localStorage.getItem(TOKEN_KEY)
const setToken = token => localStorage.setItem(TOKEN_KEY, token)
const removeToken = () => localStorage.removeItem(TOKEN_KEY)

export { getToken, setToken, removeToken }