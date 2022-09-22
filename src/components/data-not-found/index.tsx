import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  BoxProps,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion<Omit<BoxProps, 'transition'>>(Box);

const DataNotFound = ({ sugarsConnection }) => {
  return (
    <>
      {sugarsConnection.length === 0 && (
        <MotionBox
          mt={6}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <Alert status='info' rounded='lg'>
            <AlertIcon />
            <AlertTitle>Wyszukiwarka</AlertTitle>
            <AlertDescription>
              Szukany produkt nie istnieje w bazie danych
            </AlertDescription>
          </Alert>
        </MotionBox>
      )}
    </>
  );
};

export default DataNotFound;
