import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { UserIcon } from "@heroicons/react/24/solid";

type UserInfo = {
  name: string;
  email: string;
  representative_image: string;
};

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login"); // ログインされていない場合はログインページにリダイレクト
    }

    const fetchUserInfo = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found in localStorage");

        const response = await axios.get(`/api/user/${userId}`);
        console.log("API Response:", response.data);
        if (response.status === 200) {
          const userData: UserInfo = {
            ...response.data,
            // 画像データをBase64エンコードからデコードする
            representative_image: atob(response.data.representative_image.split(',')[1])
          };
          setUserInfo(userData);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && (error as AxiosError).response?.status === 404) {
          navigate("/404");
        } else {
          console.error("エラー:", error);
        }
      }
    };

    fetchUserInfo();
  }, [navigate, isLoggedIn]);

  if (!isLoggedIn) {
    return <p>ログインしてください。 <Link to="/login">ログイン</Link></p>; // ログインしていない場合はログインリンクを表示
  }

  if (!userInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center mt-80">
      <div className="border rounded-full w-24 h-24  items-center justify-center overflow-hidden aspect-w-1 aspect-h-1">
      {userInfo.representative_image ? (
        <img 
          src={`data:image/jpeg;base64,${userInfo.representative_image}`} 
          alt="User Icon"
          className="object-cover w-full h-full rounded-full"
        />
      ) : (
        <UserIcon className="object-cover w-full h-full rounded-full"  />
      )}
      </div>
      <p className="ml-8">{userInfo.email}</p>
    </div>
  );
};

export default MyPage;
