"use client";

import React from 'react';
import { Box, Container } from '@chakra-ui/react';

// Temporary component definitions to allow compilation with Chakra UI v3
const SimpleGrid = ({ columns, spacing, ...rest }: any) => {
  const style = {
    display: 'grid',
    gridTemplateColumns: typeof columns === 'object' 
      ? `repeat(${columns.base || 1}, 1fr)` 
      : `repeat(${columns || 1}, 1fr)`,
    gap: typeof spacing === 'number' ? `${spacing * 0.25}rem` : spacing,
  };
  return <div style={style} {...rest} />;
};
const Stat = (props: any) => <div {...props} />;
const StatLabel = (props: any) => <div {...props} />;
const StatNumber = (props: any) => <div {...props} />;
const StatHelpText = (props: any) => <div {...props} />;
const useColorModeValue = (lightValue: any, darkValue: any) => lightValue; // Default to light theme value

const stats = [
  {
    label: 'Happy Travelers',
    number: '25K+',
    helpText: 'Satisfied customers worldwide',
  },
  {
    label: 'Destinations',
    number: '150+',
    helpText: 'Countries across all continents',
  },
  {
    label: 'Tours Organized',
    number: '3.5K+',
    helpText: 'Successful journeys completed',
  },
  {
    label: 'Years Experience',
    number: '10+',
    helpText: 'Of premium travel service',
  },
];

const StatsSection = () => {
  const bgColor = useColorModeValue('brand.50', 'brand.900');
  const borderColor = useColorModeValue('brand.100', 'brand.800');
  
  return (
    <Box as="section" py={12} bg={bgColor}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          {stats.map((stat, index) => (
            <Box 
              key={index} 
              p={6} 
              textAlign="center"
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="lg"
              bg={useColorModeValue('white', 'gray.800')}
              transition="transform 0.3s"
              _hover={{ transform: 'translateY(-5px)' }}
            >
              <Stat>
                <StatLabel fontSize="lg" fontWeight="medium" mb={2} color="gray.600">
                  {stat.label}
                </StatLabel>
                <StatNumber fontSize="4xl" fontWeight="bold" color="brand.500">
                  {stat.number}
                </StatNumber>
                <StatHelpText fontSize="sm" mt={2}>
                  {stat.helpText}
                </StatHelpText>
              </Stat>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default StatsSection;
