'use client';

import React from 'react';
import { useMountedState } from 'react-use';

import MobileNavigationSheet from '@/features/header/component/MobileNavigationSheet';

function SheetProvider(): React.JSX.Element {
  const isMounted = useMountedState();

  if (!isMounted) {
    return <></>;
  }

  return (
    <>
      <MobileNavigationSheet />
    </>
  );
}

export default SheetProvider;
