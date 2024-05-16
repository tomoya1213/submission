// メールアドレスのバリデーション
export const validateEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!email) {
    return "メールアドレスを入力してください";
  } else if (!regex.test(email)) {
    return "正しいメールアドレスを入力してください";
  }
};

// パスワードのバリデーション
export const validatePassword = (password: string)  => {
  const regexPass = /^(?=.*[A-Z])[a-zA-Z0-9]{8,24}$/;
  if (!password) {
    return "パスワードを入力してください";
  } else if (!regexPass.test(password)) {
    return "8文字以上24文字以下の英数字（大文字(A～Z)および小文字(a～z)が混在する）を入力してください";
  }
};

// パスワード確認のバリデーション
export const validatePasswordConfirm = (password: string, passwordConfirm: string) => {
  if (!passwordConfirm) {
    return "確認のためパスワードを再入力してください";
  } else if (password !== passwordConfirm) {
    return "パスワードが一致しません";
  }
};

// ニックネームのバリデーション
export const validateNickname = (nickname: string) => {
  if (!nickname) {
    return "ニックネームを入力してください";
  } else if (nickname.length > 20) {
    return "タイトルは20文字以内で入力してください";
  }
};

// 記事投稿タイトルのバリデーション
export const validateNewPostTitle = (newPostTitle: string) => {
  if (!newPostTitle) {
    return "タイトルを入力してください";
  } else if (newPostTitle.length > 20) {
    return "タイトルは20文字以内で入力してください";
  }
};

// 記事投稿内容のバリデーション
export const validateNewPostContent = (newPostContent: string) => {
  if (!newPostContent) {
    return "内容を入力してください";
  } else if (newPostContent.length > 300) {
    return "内容は200文字以内で入力してください";
  }
};