import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { logout } from "../../features/authSlice";

const Header = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    // ログアウト時にローカルストレージからトークンを削除する
    localStorage.removeItem("access_token");
    dispatch(logout());
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [menuOpen]);

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="max-w-3xl flex justify-between mx-auto px-4 items-center">
        <Link to='/'>
          <img src="/img/shark.png" alt="Logo" className="h-8" />
        </Link>
        {isLoggedIn ? (
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li><Link to="/post" className="hover:text-gray-300">新規投稿</Link></li>
              <li><Link to="/postList" className="hover:text-gray-300">投稿一覧</Link></li>
              <li><Link to="/edit-profile" className="hover:text-gray-300">会員情報変更</Link></li>
              <li><Link to="/my-page" className="hover:text-gray-300">マイページ</Link></li>
              <li><Link to="/" className="hover:text-gray-300" onClick={handleLogout}>ログアウト</Link></li>
            </ul>
          </nav>
        ) : (
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li><Link to="/login" className="hover:text-gray-300">ログイン</Link></li>
              <li><Link to="/register" className="hover:text-gray-300">会員登録</Link></li>
              <li><Link to="/my-page" className="hover:text-gray-300">マイページ</Link></li>
            </ul>
          </nav>
        )}

        <div className="block md:hidden">
          <button className="text-2xl" onClick={toggleMenu}>
            {menuOpen ? '×' : '☰'}
          </button>
          {menuOpen && (
            <div className="top-full bg-black shadow-md rounded-md w-screen h-dvh">
              <ul className="flex flex-col space-y-2">
                {isLoggedIn ? (
                  <>
                    <li className="py-5"><Link to="/post" onClick={closeMenu}>新規投稿</Link></li>
                    <li className="py-5"><Link to="/postList" onClick={closeMenu}>投稿一覧</Link></li>
                    <li className="py-5"><Link to="/edit-profile" onClick={closeMenu}>会員情報変更</Link></li>
                    <li className="py-5"><Link to="/my-page" onClick={closeMenu}>マイページ</Link></li>
                    <li className="py-5"><Link to="/" onClick={handleLogout}>ログアウト</Link></li>
                  </>
                ) : (
                  <>
                    <li className="py-5"><Link to="/login" onClick={closeMenu}>ログイン</Link></li>
                    <li className="py-5"><Link to="/register" onClick={closeMenu}>会員登録</Link></li>
                    <li className="py-5"><Link to="/my-page" onClick={closeMenu}>マイページ</Link></li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
