import PageLayout from '@/components/page-layout';
import { Box } from '@chakra-ui/react';
import React from 'react';

const SugarCategory = () => {
  return (
    <PageLayout
      title='Kategoria | Cukier'
      description='Kategoria cukier - wszyskie produkty'
    >
      <Box py={8}>Sugar category</Box>
    </PageLayout>
  );
};

export default SugarCategory;
