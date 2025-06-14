"use client";

import React from 'react';
import { Box, Container } from '@chakra-ui/react';

interface SimpleGridProps {
  columns: number | { base?: number; sm?: number; md?: number; lg?: number; [key: string]: number | undefined };
  spacing: number | string;
  children: React.ReactNode;
  [key: string]: unknown; // Using 'unknown' instead of 'any' for better type safety
}

const SimpleGrid = ({ columns, spacing, ...rest }: SimpleGridProps) => {
  const style = {
    display: 'grid',
    gridTemplateColumns: typeof columns === 'object' 
      ? `repeat(${columns.base || 1}, 1fr)` 
      : `repeat(${columns || 1}, 1fr)`,
    gap: typeof spacing === 'number' ? `${spacing * 0.25}rem` : spacing,
  };
  return <div style={style} {...rest} />;
};

interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface StatTextProps extends React.HTMLAttributes<HTMLDivElement> {
  fontSize?: string;
  fontWeight?: string;
  mb?: number;
  mt?: number;
  color?: string;
  children: React.ReactNode;
}

const Stat = (props: StatProps) => <div {...props} />;
const StatLabel = (props: StatTextProps) => <div style={{ fontSize: props.fontSize, fontWeight: props.fontWeight, marginBottom: props.mb ? `${props.mb * 0.25}rem` : undefined, color: props.color }} {...props} />;
const StatNumber = (props: StatTextProps) => <div style={{ fontSize: props.fontSize, fontWeight: props.fontWeight, color: props.color }} {...props} />;
const StatHelpText = (props: StatTextProps) => <div style={{ fontSize: props.fontSize, marginTop: props.mt ? `${props.mt * 0.25}rem` : undefined }} {...props} />;

// Generic type for useColorModeValue hook
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useColorModeValue = <T,>(lightValue: T, _darkValue: T): T => lightValue; // Default to light theme value, darkValue is ignored

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
  const boxBgColor = useColorModeValue('white', 'gray.800');
  
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
              bg={boxBgColor}
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
