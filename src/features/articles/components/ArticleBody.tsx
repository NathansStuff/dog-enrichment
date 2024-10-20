import React from 'react';

import Image from 'next/image';

import { Article } from '../types/Article';
import { urlFor } from '../utils/urlFor';

import ArticleText from './ArticleText';
import CategoryPill from './CategoryPill';

interface Props {
  article: Article;
}

function ArticleBody({ article }: Props): React.JSX.Element {
  return (
    <div className='flex-center'>
      <article className='w-full max-w-3xl p-5 text-left'>
        <h1 className='mb-3 mt-10 text-center text-3xl'>{article.title}</h1>
        <h2 className='text-xl font-light text-gray-500'>{article.description}</h2>
        {/* <QuizComponent quiz={mockQuiz} /> */}
        <div className='flex flex-wrap space-x-4 py-2'>
          {article.categories.map((category) => (
            <CategoryPill
              key={category.title}
              category={category}
            />
          ))}
        </div>
        <div className='flex items-center space-x-2'>
          <p className='mb-2 text-sm font-extralight'>
            - Published at {new Date(article.publishedAt).toLocaleString()}
            {article.updatedAt && <span> | Edited at {new Date(article.updatedAt).toLocaleString()}</span>}
          </p>
        </div>
        <Image
          src={urlFor(article.mainImage).url()!}
          alt={article.title}
          className='w-full object-cover'
          width={1920}
          height={1920}
        />
        <ArticleText body={article.body} />
      </article>
    </div>
  );
}

export default ArticleBody;
