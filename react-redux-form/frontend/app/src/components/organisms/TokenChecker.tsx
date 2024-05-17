import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { logout } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';

const TokenChecker: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        // トークンが存在しない場合はログインページにリダイレクト
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('/api/checkToken');
        if (response.data.valid === false) {
          // トークンが無効な場合、ユーザーをログアウト
          localStorage.removeItem('access_token');
          axios.defaults.headers.common['Authorization'] = '';
          dispatch(logout());
          navigate('/Login');
          console.log("トークンの認証が切れました。ログアウトします。");
          
      }
      } catch (error) {
          console.error("認証エラー:", error);
        }
    };

    // ページがリロードされる度にトークンの有効性を確認
    const reloadCheckTokenValidity = () => {
      checkTokenValidity();
    };

    // 1時間ごとにもトークンの有効性を確認
    const interval = setInterval(checkTokenValidity, 3600000);

    window.addEventListener('beforeunload', reloadCheckTokenValidity);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', reloadCheckTokenValidity);
    };
  }, [dispatch, navigate]);

  return null;
};

export default TokenChecker;
