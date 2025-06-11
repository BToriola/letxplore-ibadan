"use client";

import React from 'react';
import { Box, Heading, Text, Container, Flex, Icon } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

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
const Avatar = ({ src, size, mr, ...rest }: any) => {
  const style = {
    width: size === 'md' ? '48px' : '32px',
    height: size === 'md' ? '48px' : '32px',
    borderRadius: '50%',
    marginRight: mr ? `${mr * 0.25}rem` : '0',
    objectFit: 'cover' as const
  };
  return <img src={src} style={style} {...rest} />;
};
const useColorModeValue = (lightValue: any, darkValue: any) => lightValue; // Default to light theme value

// Sample testimonials data
const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'New York, USA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    rating: 5,
    text: 'LetsExplore made our honeymoon absolutely magical. The personalized itinerary, seamless bookings, and local insights made all the difference. We will definitely use them for our next adventure!',
  },
  {
    id: '2',
    name: 'David Chen',
    location: 'Toronto, Canada',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
    rating: 5,
    text: 'I have traveled to 30+ countries, and this was by far the most well-organized trip I have ever taken. Their attention to detail and responsiveness is unmatched.',
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    location: 'Barcelona, Spain',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    rating: 4,
    text: 'As a solo female traveler, safety is my priority. LetsExplore ensured I felt secure while still having authentic local experiences. I am already planning my next trip with them!',
  },
];

const TestimonialsSection = () => {
  return (
    <Box 
      as="section" 
      py={16} 
      bg={useColorModeValue('gray.50', 'gray.900')}
    >
      <Container maxW="container.xl">
        {/* Section Header */}
        <Box textAlign="center" mb={12}>
          <Text color="brand.500" fontWeight="medium" mb={2}>
            Traveler Stories
          </Text>
          <Heading as="h2" size="xl" mb={4}>
            What Our Customers Say
          </Heading>
          <Text color="gray.600" maxW="2xl" mx="auto">
            Real experiences from real travelers who have explored the world with us.
          </Text>
        </Box>
        
        {/* Testimonials Grid */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

// Define a proper interface for the testimonial card props
interface TestimonialCardProps {
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
}

const TestimonialCard = ({ name, location, avatar, rating, text }: TestimonialCardProps) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  
  return (
    <Box 
      bg={cardBg} 
      p={6} 
      borderRadius="lg" 
      boxShadow="md"
      position="relative"
    >
      {/* Quote marks */}
      <Box 
        position="absolute" 
        top={-3} 
        left={6} 
        fontSize="6xl" 
        color="brand.200" 
        opacity={0.5}
        fontFamily="serif"
      >
        "
      </Box>
      
      {/* Rating */}
      <Flex mb={4}>
        {Array(5)
          .fill('')
          .map((_, i) => (
            <StarIcon
              key={i}
              color={i < rating ? 'yellow.400' : 'gray.300'}
            />
          ))}
      </Flex>
      
      {/* Testimonial Text */}
      <Text fontSize="md" mb={6}>
        {text}
      </Text>
      
      {/* Author */}
      <Flex align="center">
        <Avatar src={avatar} size="md" mr={4} />
        <Box>
          <Text fontWeight="bold">{name}</Text>
          <Text fontSize="sm" color="gray.500">{location}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default TestimonialsSection;
