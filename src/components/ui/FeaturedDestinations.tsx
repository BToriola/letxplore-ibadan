"use client";

import React from 'react';
import { Box, Heading, Text, Container, SimpleGrid, Button, Flex, Icon } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import DestinationCard from './DestinationCard';

// Sample data - In a real app, this would come from an API
const featuredDestinations = [
  {
    id: '1',
    title: 'Bali, Indonesia',
    location: 'Southeast Asia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    rating: 4.8,
    price: 899,
    isPopular: true,
  },
  {
    id: '2',
    title: 'Santorini, Greece',
    location: 'Europe',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
    rating: 4.7,
    price: 1299,
    discount: 15,
  },
  {
    id: '3',
    title: 'Kyoto, Japan',
    location: 'East Asia',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9',
    rating: 4.9,
    price: 1099,
  },
  {
    id: '4',
    title: 'Machu Picchu, Peru',
    location: 'South America',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1',
    rating: 4.8,
    price: 1499,
    isPopular: true,
  },
];

const FeaturedDestinations = () => {
  return (
    <Box as="section" py={16}>
      <Container maxW="container.xl">
        {/* Section Header */}
        <Flex 
          justify="space-between" 
          align={{ base: 'flex-start', sm: 'center' }}
          direction={{ base: 'column', sm: 'row' }}
          mb={10}
          gap={4}
        >
          <Box>
            <Text color="brand.500" fontWeight="medium" mb={2}>
              Featured Destinations
            </Text>
            <Heading as="h2" size="xl" mb={2}>
              Popular Places to Explore
            </Heading>
            <Text color="gray.600" maxW="2xl">
              Discover the most sought-after destinations loved by travelers around the globe.
            </Text>
          </Box>
          
          <Button 
            variant="outline" 
            alignSelf={{ base: 'flex-start', sm: 'center' }}
          >
            View All <ArrowForwardIcon ml={2} />
          </Button>
        </Flex>
        
        {/* Destinations Grid */}
        <SimpleGrid 
          columns={{ base: 1, md: 2, lg: 4 }} 
          gap={8}
        >
          {featuredDestinations.map((destination) => (
            <DestinationCard 
              key={destination.id}
              {...destination}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default FeaturedDestinations;
