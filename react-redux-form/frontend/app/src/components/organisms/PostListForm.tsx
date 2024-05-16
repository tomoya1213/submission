import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const PostListForm: React.FC = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  
  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/"); // ログインされていない場合はトップページーじにリダイレクト
      return;
    }
  },[isLoggedIn, navigate]);

  const fetchArticles = async (page: number) => {
    try {
      const response = await axios.get(`/api/articles?page=${page}`);
      setArticles(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1 className="text-center text-3xl my-6">投稿一覧</h1>
      <table className="border-solid border border-black">
        <thead>
          <tr className="bg-slate-300">
            <th className="border-solid border border-black width-6 py-1">タイトル</th>
            <th className="border-solid border border-black w-9/12 py-1 text-left pl-1">内容</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article: any) => (
            <tr key={article.id}>
              <td className="border-solid border border-black py-1">
                {article.title.length > 15 ? `${article.title.substring(0, 15)}...` : article.title}
              </td>
              <td className="border-solid border border-black py-1 pl-1  break-all">
                <Link to={`/post/${article.article_id}`}  className="link">
                {article.content.length > 50 ? `${article.content.substring(0, 50)}...` : article.content}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="my-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PostListForm;
