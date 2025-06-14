"use client";

import React from 'react';
import { Box, Image, Heading, Text, Flex, Badge } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

interface DestinationCardProps {
  title: string;
  location: string;
  image: string;
  rating: number;
  price: number;
  discount?: number;
  isPopular?: boolean;
}

const DestinationCard = ({
  title,
  location,
  image,
  rating,
  price,
  discount,
  isPopular = false,
}: DestinationCardProps) => {
  const cardBg = 'white';
  const hasDiscount = discount && discount > 0;
  
  return (
    <Box 
      borderRadius="lg" 
      overflow="hidden" 
      bg={cardBg}
      boxShadow="md"
      transition="transform 0.3s, box-shadow 0.3s"
      _hover={{ 
        transform: 'translateY(-5px)',
        boxShadow: 'lg'
      }}
      position="relative"
    >
      <Box h="200px" position="relative">
        <Image 
          src={image} 
          alt={title}
          objectFit="cover"
          w="100%"
          h="100%"
        />
        
        {isPopular && (
          <Badge 
            position="absolute" 
            top={4} 
            left={4}
            colorScheme="brand"
            bg="brand.500"
            color="white"
            fontSize="xs"
            px={2}
            py={1}
            borderRadius="full"
          >
            Popular
          </Badge>
        )}
        
        {hasDiscount && (
          <Badge 
            position="absolute" 
            top={4} 
            right={4}
            colorScheme="red"
            bg="red.500"
            color="white"
            fontSize="xs"
            px={2}
            py={1}
            borderRadius="full"
          >
            {discount}% OFF
          </Badge>
        )}
      </Box>
      
      <Box p={4}>
        <Heading as="h3" size="md" mb={1} truncate>
          {title}
        </Heading>
        
        <Text color="gray.600" fontSize="sm" mb={2}>
          {location}
        </Text>
        
        {/* Rating */}
        <Flex align="center" mb={3}>
          <Flex align="center">
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < rating ? 'yellow.400' : 'gray.300'}
                  size="sm"
                />
              ))
            }
          </Flex>
          <Text ml={1} fontSize="sm" fontWeight="bold">
            {rating.toFixed(1)}
          </Text>
        </Flex>
        
        <Flex align="center" justify="space-between">
          <Box>
            {hasDiscount && (
              <Text as="span" fontSize="sm" textDecoration="line-through" color="gray.500" mr={2}>
                ${(price / (1 - discount/100)).toFixed(0)}
              </Text>
            )}
            <Text as="span" fontWeight="bold" fontSize="lg" color="brand.600">
              ${price}
            </Text>
            <Text as="span" fontSize="sm" color="gray.500"> / person</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default DestinationCard;
