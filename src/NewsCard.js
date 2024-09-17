// NewsCard.js
import React from 'react';

const NewsCard = ({ news }) => {
  const { image, title, description, url, published_at } = news;
  const date = published_at.split("T")[0];

  return (
    <div className="flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-lg overflow-hidden bg-white border border-gray-300 shadow-md hover:bg-gray-50 max-w-xs sm:max-w-sm lg:max-w-md">
      <img
        src={image || 'https://via.placeholder.com/150'}
        alt={title}
        className="w-full h-40 sm:h-44 object-cover"
      />
      <div className="flex-1 p-4">
        <h5 className="text-sm sm:text-lg font-semibold mb-2 truncate">{title || 'No title available'}</h5>
        <h6 className="text-xs sm:text-sm text-cyan-600 mb-2">{date}</h6>
        <p className="text-xs sm:text-sm text-gray-700 line-clamp-4 mb-4">{description || 'No description available'}</p>
      </div>
      <div className="p-4">
        <a
          href={url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
