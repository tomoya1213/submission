// LoginForm.tsx
import React, { useEffect } from "react";
import FormGroup from "../molecules/FormGroup";
import Button from "../atoms/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setEmail, setErrors, setPassword } from "../../features/loginSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login, setUserName } from "../../features/authSlice"; // setUserNameアクションをimport

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();

  const isFormValid = () => {
    return loginState.email && loginState.password && !loginState.errors.email && !loginState.errors.password;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(setEmail(value));
    dispatch(setErrors({ ...loginState.errors, email: value ? null : "メールアドレスを入力してください。" }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(setPassword(value));
    dispatch(setErrors({ ...loginState.errors, password: value ? null : "パスワードを入力してください。" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", {
        email: loginState.email,
        password: loginState.password,
      });
      if (response.status === 200) {
        // トークンを取得
        const { token, user } = response.data;
        // レスポンスの処理
        console.log("Login response:", response.data);
        // トークンをヘッダーに設定
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        // トークンをローカルストレージに保存
        localStorage.setItem("access_token", token);
        // ReduxのauthSliceを使用してisLoggedInをtrueに設定
        dispatch(login());
        // ユーザー名をReduxストアに保存
        dispatch(setUserName(user)); // ユーザー名を保存
        // マイページへ遷移
        navigate("/my-page");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        navigate('/404');
        alert("エラーが発生しました。");
      } else {
        // その他のエラーの場合
        console.error("ログインエラー:", error);
      }
    }
    // フォームの各値をクリアする
    dispatch(setEmail(''));
    dispatch(setPassword(''));
  };

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await axios.get('/api/login/checkToken');
        if (!response.data.valid) {
          // トークンの有効性が失われた場合、ログアウト処理を実行
          localStorage.removeItem('access_token');
          axios.defaults.headers.common["Authorization"] = ``;
          dispatch(setUserName(''));
          dispatch(login());
          navigate('/login');
        }
      } catch (error) {
        console.error('トークンの確認に失敗しました。エラーメッセージ:', error);
      }
    };

    // 60秒ごとにトークンの有効性を確認
    const interval = setInterval(checkTokenValidity, 60000);

    return () => clearInterval(interval);
  }, [dispatch, navigate]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-3xl my-6">ログイン</h1>
        <FormGroup
          label="ログインID（メールアドレス）"
          type="email"
          name="メールアドレス"
          placeholder="例：apex1234@gmail.com"
          onChange={handleEmailChange}
          error={loginState.errors.email || undefined}
        />
        <FormGroup
          label="パスワード"
          type="password"
          name="パスワード"
          placeholder="例：ABcd123"
          onChange={handlePasswordChange}
          error={loginState.errors.password || undefined}
        />
        <div className="margin-left mt-4">
          <Button
            className="ml-auto my-80"
            type="submit"
            disabled={!isFormValid()}>ログイン
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
