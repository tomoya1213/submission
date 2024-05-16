import React from "react";
import Button from "../atoms/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";

const TopForm: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <div>
      <h1 className="text-center text-3xl my-6">ブログサービス課題</h1>
      <p className="text-center">React.jsを利用したブログサービス課題です。</p>
      {!isLoggedIn && (
        <div className="flex justify-around mx-auto w-6/12  flex-column">
          <Link className="width-100" to="/login">
            <Button className="mx-auto margin-0" type="submit">
              ログイン
            </Button>
          </Link>
          <Link to="/register">
            <Button className="mx-4 margin-0 ml-auto" type="submit">
              会員登録
            </Button>
          </Link>
        </div>
      )}
      <img 
        src="/img/office.jpg"
        alt="セクション画像"
        className="w-full h-auto bg-no-repeat mt-10"
      />
    </div>
  );
};

export default TopForm;