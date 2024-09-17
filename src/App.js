import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import NewsCard from './NewsCard';
import Footer from './Footer';

const App = () => {
  const [newsData, setNewsData] = useState([]);
  const [category, setCategory] = useState('general');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 6;
  const API_KEY = '549b91ec15b362a7b882e0fed823779c';
  const BASE_URL = `http://api.mediastack.com/v1/news?access_key=${API_KEY}`;

  const fetchNews = async (url, page) => {
    try {
      const response = await fetch(`${url}&limit=${ITEMS_PER_PAGE}&offset=${(page - 1) * ITEMS_PER_PAGE}`);
      if (response.ok) {
        const data = await response.json();
        setNewsData(data.data);
        setTotalPages(Math.ceil(data.pagination.total / ITEMS_PER_PAGE));
      } else {
        console.error('HTTP error', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchNews(`${BASE_URL}&categories=${category}`, currentPage);
  }, [category, currentPage]);

  const handleCategoryClick = (category) => {
    setCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    if (query) {
      fetchNews(`${BASE_URL}&keywords=${encodeURIComponent(query)}`, currentPage);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar activeCategory={category} onCategoryClick={handleCategoryClick} onSearch={handleSearch} />
      <main className="container mx-auto mt-24 px-4 sm:px-6 lg:px-8">
        <h4 className="text-2xl font-bold mb-4 capitalize text-center italic">{category} news</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map(news => (
            <NewsCard
              key={news.id}
              news={news}
            />
          ))}
        </div>
        <div className="flex flex-col items-center mt-6 space-y-2 pb-6 sm:space-y-0 sm:items-start sm:flex-row sm:justify-center">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-blue-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg font-semibold px-12">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-blue-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
