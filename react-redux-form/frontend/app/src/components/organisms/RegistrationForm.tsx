import FormGroup from "../molecules/FormGroup";
import Button from "../atoms/Button";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword, setPasswordConfirm, setNickname, setAvatar, setErrors, setAvatarError } from "../../features/userSlice";
import { validateEmail, validatePassword, validatePasswordConfirm, validateNickname } from './Validate'; // 修正
import { RootState } from "../../app/store";
import ImageUploader from "../molecules/ImageUpLoader";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { login, setUserName } from "../../features/authSlice"; 

const RegistrationForm: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user); // Reduxストアからユーザーステートを取得
  const navigate = useNavigate(); // useNavigate フックを使用して画面遷移を行う


  const isFormValid = () => {
    return user.email && user.password && user.passwordConfirm && user.nickname && Object.values(user.errors).every(error => !error);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const emailError = validateEmail(value); // バリデーションを呼び出す
    dispatch(setEmail(value));
    dispatch(setErrors({ ...user.errors, email: emailError || null }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const passwordError = validatePassword(value); // バリデーションを呼び出す
    dispatch(setPassword(value));
    dispatch(setErrors({ ...user.errors, password: passwordError || null }));
  };

  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const passwordConfirmError = validatePasswordConfirm(user.password, value); // バリデーションを呼び出す
    dispatch(setPasswordConfirm(value));
    dispatch(setErrors({ ...user.errors, passwordConfirm: passwordConfirmError || null }));
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const nicknameError = validateNickname(value); // バリデーションを呼び出す
    dispatch(setNickname(value));
    dispatch(setErrors({ ...user.errors, nickname: nicknameError || null }));
  };

  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string" || reader.result instanceof ArrayBuffer) {
        const base64Image = reader.result as string;
        const imageData = base64Image.replace(/^data:image\/[a-z]+;base64,/, ""); // プレフィックスを取り除く
        dispatch(setAvatar(imageData));

        // jpg ファイルが選択された場合は、エラーメッセージをクリア
        if (file.type === 'image/jpeg') {
          dispatch(setAvatarError(undefined));
        } else {
          dispatch(setAvatarError("ユーザーアイコン画像は jpg ファイルである必要があります。"));
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // APIリクエストの送信
      const response = await axios.post("/api/user", {
        name: user.nickname,
        email: user.email,
        password: user.password,
        representative_image: user.avatar,
      });

      // リクエストが成功した場合の処理
      if (response.status === 201) {
        const userData = response.data; // レスポンスデータをまとめて取得
      Object.keys(userData).forEach(key => {
        localStorage.setItem(key, userData[key]); // レスポンスデータをローカルストレージに保存
      });
      dispatch(setUserName(userData.name)); // ユーザー名を保存
      dispatch(login()); // ()が必要
        navigate("/my-page"); // マイページへ遷移
      }
    } catch (error) {
      // リクエストが失敗した場合の処理
      if (axios.isAxiosError(error)) {
        // サーバーエラーの場合
        navigate("/"); // TOPページへ遷移
        alert("サーバーエラーが発生しました。");
      } else {
        // その他のエラーの場合
        console.error("APIリクエストエラー:", error);
      }
    }
       // フォームの各値をクリアする
      dispatch(setNickname(''));
      dispatch(setEmail(''));
      dispatch(setPassword(''));
      dispatch(setPasswordConfirm(''));
      dispatch(setAvatar(''));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-3xl my-6">会員登録</h1>
        <FormGroup
          label="ログインID（メールアドレス）"
          type="email"
          name="email"
          placeholder="例：apex1234@gmail.com"
          as="input"
          value={user.email} 
          onChange={handleEmailChange}
          error={user.errors.email || undefined}
        />
        <FormGroup
          label="パスワード"
          type="password"
          name="password"
          placeholder="例：ABcd1234"
          as="input"
          value={user.password} 
          onChange={handlePasswordChange}
          error={user.errors.password || undefined}
        />
        <FormGroup
          label="パスワード確認"
          type="password"
          name="passwordConfirm"
          placeholder="例：ABcd1234"
          as="input"
          value={user.passwordConfirm} 
          onChange={handlePasswordConfirmChange}
          error={user.errors.passwordConfirm || undefined}
        />
        <FormGroup
          label="ニックネーム"
          type="text"
          name="nickname"
          placeholder="例：apex"
          as="input"
          value={user.nickname} 
          onChange={handleNicknameChange}
          error={user.errors.nickname || undefined}
        />
        <ImageUploader
          className="mx-auto text-center"
          label="アバター画像を選択"
          onFileSelect={handleFileChange}
          error={user.errors.avatar || undefined}
        />
        <div className="margin-left mt-4">
          <Button
            type="submit"
            disabled={!isFormValid()} 
          >
            登録する
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
