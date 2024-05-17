import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { logout } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // ログアウト処理
        localStorage.removeItem('access_token');
        axios.defaults.headers.common['Authorization'] = '';
        dispatch(logout());
      } catch (error) {
        console.error("ログアウトエラー:", error);
      }
    };

    // ページがマウントされた時にログアウト処理を実行
    handleLogout();

  }, [dispatch, navigate]);

  return (
    <div className="text-center">
      <h1 className="text-2xl mt-10">404<br /><span>NOT FOUND</span></h1>
      <p>ページが見つかりませんでした。</p>
    </div>
  );
};

export default NotFound;