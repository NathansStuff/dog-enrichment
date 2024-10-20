import React from 'react';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { client, urlFor } from '@/lib/sanity';
import { Article } from '@/types/Article';

interface ArticleDetailProps {
  slug: string;
}

export default async function ArticleDetail({ slug }: ArticleDetailProps) {
  const article = await client.fetch<Article>(`
    *[_type == "article" && slug.current == $slug][0] {
      _id,
      title,
      category->,
      heroImage,
      content,
      publishedAt
    }
  `, { slug });

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <article className="max-w-3xl mx-auto">
      <Image
        src={urlFor(article.heroImage).url()}
        alt={article.title}
        width={800}
        height={400}
        className="w-full h-64 object-cover mb-8"
      />
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <div className="mb-8">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          {article.category.title}
        </span>
        <span className="ml-4 text-gray-500">
          {new Date(article.publishedAt).toLocaleDateString()}
        </span>
      </div>
      <div className="prose max-w-none">
        <PortableText
          value={article.content}
          components={{
            types: {
              image: ({ value }) => (
                <Image
                  src={urlFor(value).url()}
                  alt={value.alt || ' '}
                  width={800}
                  height={400}
                  className="my-8"
                />
              ),
            },
          }}
        />
      </div>
    </article>
  );
}
