import React from 'react';
import ArticleDetail from '@/components/ArticleDetail';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  return <ArticleDetail slug={params.slug} />;
}
