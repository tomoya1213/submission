import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import "./input.css";
import Header from './components/organisms/Header';
import RegistrationPage from './components/pages/RegistrationPage';
import LoginPage from './components/pages/LoginPage';
import MyPage from './components/pages/MyPage';
import NotFound from './components/pages/NotFound';
import TopPage from './components/pages/TopPage';
import ChangePage from './components/pages/ChangePage';
import PostListPage from './components/pages/PostListPage';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import PostPage from './components/pages/PostPage ';
import PostDetailPage from './components/pages/PostDetailPage';

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <Router>
      <Header />
      <Routes>
      <Route path="/" element={<TopPage />}  />
      <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/my-page" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/my-page" /> : <RegistrationPage />}
        />
        <Route path="/my-page" element={<MyPage />}  />
        <Route path="/edit-profile" element={<ChangePage />}  />
        <Route path="/*" element={<NotFound />}  />
        <Route path="/post" element={<PostPage />}  />
        <Route path="/post/:article_id" element={<PostDetailPage />}  />
        <Route path="/postList" element={<PostListPage />}  />
      </Routes>
    </Router>
  );
}

export default App;

