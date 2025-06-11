"use client";

import React from 'react';
import { Box, Container, Heading, Text, Button, Flex, Image } from '@chakra-ui/react';

const CallToAction = () => {
  return (
    <Box 
      as="section" 
      py={16} 
      position="relative"
      overflow="hidden"
    >
      {/* Background Image */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="brand.700"
        zIndex={-2}
      />
      
      {/* Diagonal Pattern Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={`url('data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#ffffff" fill-opacity="0.1"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>')}')`}
        zIndex={-1}
        opacity={0.5}
      />
      
      <Container maxW="container.xl">
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          justify="space-between"
          color="white"
        >
          <Box
            maxW={{ base: '100%', lg: '60%' }}
            mb={{ base: 10, lg: 0 }}
            textAlign={{ base: 'center', lg: 'left' }}
          >
            <Heading as="h2" size="xl" mb={4}>
              Ready to Start Your Adventure?
            </Heading>
            <Text fontSize="lg" mb={8} maxW="xl">
              Join thousands of travelers who have experienced the world with LetsExplore. 
              Sign up today and get exclusive access to special offers and personalized travel recommendations.
            </Text>
            <Flex 
              gap={4} 
              direction={{ base: 'column', sm: 'row' }}
              justify={{ base: 'center', lg: 'flex-start' }}
            >
              <Button 
                bg="white" 
                color="brand.700" 
                size="lg" 
                px={8}
                _hover={{ bg: 'gray.100' }}
              >
                Plan Your Trip
              </Button>
              <Button 
                variant="outline" 
                colorScheme="whiteAlpha" 
                size="lg" 
                px={8}
              >
                Learn More
              </Button>
            </Flex>
          </Box>
          
          {/* Image or decorative element could go here */}
          <Box 
            display={{ base: 'none', lg: 'block' }}
            w="300px"
            h="300px"
            position="relative"
          >
            <Image
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828"
              alt="Travel inspiration"
              borderRadius="full"
              objectFit="cover"
              boxShadow="lg"
              w="full"
              h="full"
            />
            <Box
              position="absolute"
              top="-20px"
              right="-20px"
              w="150px"
              h="150px"
              borderRadius="full"
              bg="accent.400"
              opacity={0.3}
              zIndex={-1}
            />
            <Box
              position="absolute"
              bottom="-30px"
              left="-30px"
              w="120px"
              h="120px"
              borderRadius="full"
              bg="brand.300"
              opacity={0.4}
              zIndex={-1}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default CallToAction;
