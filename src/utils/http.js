import axios from 'axios';
// import { ElNotification } from 'element-plus';
import store from '@/store';

const isDev = process.env.NODE_ENV === 'development';

const TDX_BASE_URL = 'https://tdx.transportdata.tw/api/basic';
const GIST_BASE_URL = 'https://gist.motc.gov.tw/gist_api';

const AUTH_URL = isDev
  ? 'http://localhost:3000/api/tdx/token'
  : 'https://nuxt-platform.vercel.app/api/tdx/token';

async function FetchAuthorization() {
  return await fetch(AUTH_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (!data) return false;
      const tokenData = {
        ...data,
        token_fetched_at: Date.now(),
      };
      localStorage.setItem('TS_Authorization', JSON.stringify(tokenData));
      return tokenData;
    })
    .catch((error) => {
      console.error('Failed to fetch token:', error);
      return false;
    });
}

async function getValidToken() {
  let tokenData = localStorage.getItem('TS_Authorization');

  if (tokenData) {
    tokenData = JSON.parse(tokenData);
    const { token_fetched_at, expires_in } = tokenData;
    const now = Date.now();
    if (now - token_fetched_at < expires_in * 1000) {
      return tokenData.access_token;
    }
  }

  // Token 過期或不存在，重新獲取
  const newTokenData = await FetchAuthorization();
  return newTokenData ? newTokenData.access_token : null;
}

// 建立 Axios 實例
export const httpTDX = axios.create({
  baseURL: TDX_BASE_URL,
  headers: {
    'Accept-Encoding': 'br,gzip',
  },
});

// **請求攔截器**：每次請求前都確認 token 是否有效
httpTDX.interceptors.request.use(
  async (config) => {
    const token = await getValidToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.error('無法取得有效的 Token');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// **回應攔截器**：處理 403（可能是 token 失效）
httpTDX.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;
    if (response?.status === 403) {
      console.warn('403 錯誤，嘗試重新取得 Token...');
      const newToken = await FetchAuthorization();
      if (newToken) {
        config.headers['Authorization'] = `Bearer ${newToken.access_token}`;
        return httpTDX(config); // 重新發送請求
      }
    }
    if (response?.status === 429) {
      // ElNotification({
      //   title: '請求過於頻繁',
      //   message: 'TDX API上限已滿，請稍後再試！',
      //   type: 'warning',
      // });
      alert('抱歉，TDX服務(免費版)每分鐘僅能發送5次API，請稍後再試！');
      store.dispatch('showLoader', false);
    }
    return Promise.reject(error);
  }
);

// 建立 GIST 的 Axios 實例
export const httpGIST = axios.create({
  baseURL: GIST_BASE_URL,
  headers: {
    'Accept-Encoding': 'br,gzip',
  },
});

// GIST API 也加上相同的攔截器
httpGIST.interceptors.request.use(
  async (config) => {
    const token = await getValidToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.error('無法取得有效的 Token');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpGIST.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;
    if (response?.status === 403) {
      console.warn('GIST 403 錯誤，嘗試重新取得 Token...');
      const newToken = await FetchAuthorization();
      if (newToken) {
        config.headers['Authorization'] = `Bearer ${newToken.access_token}`;
        return httpGIST(config); // 重新發送請求
      }
    }
    if (response?.status === 429) {
      // ElNotification({
      //   title: '請求過於頻繁',
      //   message: 'TDX API上限已滿，請稍後再試！',
      //   type: 'warning',
      // });
      store.dispatch('showLoader', false);
    }
    return Promise.reject(error);
  }
);
