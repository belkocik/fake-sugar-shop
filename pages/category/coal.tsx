import PageLayout from '@/components/page-layout';
import { Box } from '@chakra-ui/react';
import React from 'react';

const CoalCategory = () => {
  return (
    <PageLayout
      title='Kategoria | Węgiel'
      description='Kategoria węgiel - wszyskie produkty'
    >
      <Box py={8}>Coal category</Box>
    </PageLayout>
  );
};

export default CoalCategory;
