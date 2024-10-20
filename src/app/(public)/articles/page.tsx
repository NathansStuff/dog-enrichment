import React from 'react';
import ArticleList from '@/components/ArticleList';

export default function ArticlesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Articles</h1>
      <ArticleList />
    </div>
  );
}
