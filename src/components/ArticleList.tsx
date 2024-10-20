import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client, urlFor } from '@/lib/sanity';
import { Article } from '@/types/Article';

export default async function ArticleList() {
  const articles = await client.fetch<Article[]>(`
    *[_type == "article"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      category->,
      heroImage,
      publishedAt
    }
  `);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Link key={article._id} href={`/articles/${article.slug.current}`}>
          <div className="border rounded-lg overflow-hidden shadow-md">
            <Image
              src={urlFor(article.heroImage).url()}
              alt={article.title}
              width={400}
              height={300}
              className="object-cover w-full h-48"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</p>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2">
                {article.category.title}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
