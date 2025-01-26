export const useTokenStore = defineStore('token', () => {
  const token = ref('');
  const TOKEN_KEY = 'token';


  const setToken = (t: string) => {
    localStorage.setItem(TOKEN_KEY, t);
    token.value = t;
  };

  const getToken = () => {
    let t = null;
    if (token.value !== '') {
      t = token.value;
    } else if (localStorage.getItem(TOKEN_KEY)) {
      t = localStorage.getItem(TOKEN_KEY);
    }
    return t;
  };

  const $reset = () => {
    localStorage.removeItem(TOKEN_KEY);
    token.value = '';
  };

  return {
    setToken,
    getToken,
    $reset,
  };
});
