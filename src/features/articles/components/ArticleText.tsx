/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import PortableText from 'react-portable-text';

import Link from 'next/link';

import { env } from '@/constants';

import ArticleBodyImage from './ArticleBodyImage';

interface Props {
  body: object[];
}

function ArticleText({ body }: Props): React.JSX.Element {
  return (
    <PortableText
      dataset={env.NEXT_PUBLIC_SANITY_DATASET!}
      projectId={env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
      content={body}
      serializers={{
        h1: (props: any) => {
          return (
            <h1
              className='my-5 text-5xl font-bold'
              {...props}
            />
          );
        },
        h2: (props: any) => {
          return (
            <h2
              className='my-5 text-3xl font-bold'
              {...props}
            />
          );
        },
        h3: (props: any) => {
          return (
            <h3
              className='my-5 text-3xl font-bold'
              {...props}
            />
          );
        },
        h4: (props: any) => {
          return (
            <h4
              className='my-5 text-2xl font-bold'
              {...props}
            />
          );
        },
        h5: (props: any) => {
          return (
            <h5
              className='my-5 text-xl font-bold'
              {...props}
            />
          );
        },
        customHeading: (node: any) => {
          const Tag = `h${node?.level}` as any; // Dynamically create the tag based on the level
          return (
            <Tag
              id={node?.id?.current}
              className={`my-5 text-${node?.level + 2}xl font-bold`}
            >
              {node?.text}
            </Tag>
          );
        },
        normal: (props: any) => {
          return props.children.map((child: any) => {
            if (typeof child === 'string') {
              // Custom logic to get the images from the text
              // Sanity can provide inbuilt images in their block content but this allows for custom image domains through a hacky way
              return child.includes('ARTICLEIMAGE') ? (
                <ArticleBodyImage text={child} />
              ) : (
                <p
                  className='my-5'
                  {...props}
                />
              );
            } else {
              return child; // Return the child as is if it's not a string
            }
          });
        },

        ul: ({ children }: any) => {
          return <ul className='my-5 ml-4 list-disc'>{children}</ul>;
        },
        li: ({ children }: any) => {
          return <li className='ml-4 list-disc'>{children}</li>;
        },
        link: ({ href, children }: any) => {
          return (
            <Link
              href={href}
              className='text-blue-500 hover:underline'
            >
              {children}
            </Link>
          );
        },
      }}
    />
  );
}

export default ArticleText;
