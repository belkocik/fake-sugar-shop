import { Tag, TagLabel, TagRightIcon, TagLeftIcon } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import React from 'react';

const MainCategoriesNavigation = ({ categoryPath }) => {
  return (
    <>
      {categoryPath === '/category/sugar' ? (
        <NextLink href='/' passHref>
          <Tag
            size='lg'
            variant='outline'
            colorScheme='gray'
            cursor='pointer'
            _hover={{ bg: 'gray.100' }}
            transition='300ms'
          >
            <TagLeftIcon as={ArrowBackIcon} />
            <TagLabel>Strona główna</TagLabel>
          </Tag>
        </NextLink>
      ) : categoryPath === '/category/coal' ? (
        <NextLink href='/' passHref>
          <Tag
            size='lg'
            variant='outline'
            colorScheme='gray'
            cursor='pointer'
            _hover={{ bg: 'gray.100' }}
            transition='300ms'
          >
            <TagLeftIcon as={ArrowBackIcon} />
            <TagLabel>Strona główna</TagLabel>
          </Tag>
        </NextLink>
      ) : (
        <>
          <NextLink href='/category/sugar' passHref>
            <Tag
              size='lg'
              variant='outline'
              colorScheme='teal'
              cursor='pointer'
              _hover={{ bg: 'teal.100' }}
              transition='300ms'
            >
              <TagLabel>Cukier</TagLabel>
              <TagRightIcon as={ArrowForwardIcon} />
            </Tag>
          </NextLink>
          <NextLink href='/category/coal' passHref>
            <Tag
              size='lg'
              variant='outline'
              colorScheme='teal'
              cursor='pointer'
              _hover={{ bg: 'teal.100' }}
              transition='300ms'
            >
              <TagLabel>Węgiel</TagLabel>
              <TagRightIcon as={ArrowForwardIcon} />
            </Tag>
          </NextLink>
        </>
      )}
    </>
  );
};

export default React.memo(MainCategoriesNavigation);
