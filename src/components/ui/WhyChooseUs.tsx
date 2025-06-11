"use client";

import React from 'react';
import { Box, Heading, Text, Container, Flex, Icon, Image } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

// Temporary component definition to allow compilation with Chakra UI v3
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

interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
}

const features: Feature[] = [
  {
    title: 'Curated Experiences',
    description: 'Each journey is carefully crafted by travel experts to ensure authentic and unique experiences.',
    icon: CheckIcon,
  },
  {
    title: 'Local Guides',
    description: 'Connect with knowledgeable local guides who share insights you won\'t find in guidebooks.',
    icon: CheckIcon,
  },
  {
    title: '24/7 Support',
    description: 'Travel with peace of mind knowing our team is available round-the-clock to assist you.',
    icon: CheckIcon,
  },
  {
    title: 'Flexible Booking',
    description: 'Plans change. Enjoy free rescheduling and easy cancellation policies on most trips.',
    icon: CheckIcon,
  },
];

const WhyChooseUs = () => {
  return (
    <Box as="section" py={16}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
          {/* Left Column - Text */}
          <Box>
            <Text color="brand.500" fontWeight="medium" mb={2}>
              Why Choose Us
            </Text>
            <Heading as="h2" size="xl" mb={6}>
              Travel with Confidence and Excitement
            </Heading>
            <Text color="gray.600" mb={8}>
              At LetsExplore, we believe travel should be transformative yet hassle-free. 
              Our commitment to excellence ensures your journey is filled with wonder, 
              not worry.
            </Text>
            
            {/* Features Grid */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {features.map((feature, index) => (
                <Box key={index}>
                  <Flex align="center" mb={2}>
                    <Box as={feature.icon} color="brand.500" mr={2} />
                    <Heading as="h3" size="sm">
                      {feature.title}
                    </Heading>
                  </Flex>
                  <Text fontSize="sm" color="gray.600">
                    {feature.description}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
          
          {/* Right Column - Image */}
          <Box 
            position="relative" 
            height={{ base: '300px', md: '400px', lg: 'full' }}
            overflow="hidden"
            borderRadius="xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"
              alt="Travelers enjoying their journey"
              objectFit="cover"
              w="full"
              h="full"
            />
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;
