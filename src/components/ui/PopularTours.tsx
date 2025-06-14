import React from 'react';
import { Box, Text, SimpleGrid, Flex, Button, Badge, Icon } from '@chakra-ui/react';
import { StarIcon, CalendarIcon } from '@chakra-ui/icons';

interface Tour {
  id: string;
  title: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  days: number;
  price: number;
  discount: number;
  featured: boolean;
}

const TourCard: React.FC<Tour> = ({
  title,
  location,
  image,
  rating,
  reviews,
  days,
  price,
  discount,
  featured
}) => {
  const hasDiscount = discount && discount > 0;
  const discountedPrice = hasDiscount ? price * (1 - discount / 100) : price;

  return (
    <Box 
      borderRadius="lg" 
      overflow="hidden" 
      bg="white"
      boxShadow="md"
      transition="transform 0.3s, box-shadow 0.3s"
      _hover={{ 
        transform: 'translateY(-5px)',
        boxShadow: 'lg'
      }}
      position="relative"
    >
      <Box position="relative" h="240px" overflow="hidden">
        <Box 
          position="relative"
          width="100%"
          height="100%"
          backgroundImage={`url(${image})`}
          backgroundSize="cover"
          backgroundPosition="center"
          transition="transform 0.5s"
          _groupHover={{ transform: 'scale(1.05)' }}
        />
        
        {featured && (
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
            Featured
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
      
      <Box p={5}>
        <Flex justify="space-between" align="center" mb={2}>
          <Text fontWeight="medium" color="gray.500" fontSize="sm">
            {location}
          </Text>
          <Flex align="center">
            <Icon as={StarIcon} color="yellow.400" mr={1} />
            <Text fontWeight="bold" fontSize="sm">
              {rating} <Text as="span" fontWeight="normal" color="gray.500">({reviews})</Text>
            </Text>
          </Flex>
        </Flex>
        
        <Box
          as="h3"
          fontWeight="bold"
          fontSize="lg" 
          mb={3}
          overflow="hidden"
          textOverflow="ellipsis"
          height="3rem"
          lineHeight="1.5"
        >
          {title}
        </Box>
        
        <Flex justify="space-between" mb={4}>
          <Flex align="center">
            <Icon as={CalendarIcon} color="gray.500" mr={1} />
            <Text fontSize="sm" color="gray.600">{days} days</Text>
          </Flex>
        </Flex>
        
        {/* Price */}
        <Flex align="center" justify="space-between">
          <Box>
            {hasDiscount && (
              <Text as="span" fontSize="sm" textDecoration="line-through" color="gray.500" mr={2}>
                ${price}
              </Text>
            )}
            <Text as="span" fontWeight="bold" fontSize="xl" color="brand.600">
              ${hasDiscount ? Math.round(discountedPrice) : price}
            </Text>
            <Text as="span" fontSize="sm" color="gray.500"> / person</Text>
          </Box>
          
          <Button size="sm" variant="outline" colorScheme="brand">
            View Details
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

// Sample tour data for popular tours
const popularTours: Tour[] = [
  {
    id: '1',
    title: 'Cultural Tour of Kyoto',
    location: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    rating: 4.9,
    reviews: 128,
    days: 7,
    price: 1899,
    discount: 12,
    featured: true,
  },
  {
    id: '2',
    title: 'Mediterranean Cruise Adventure',
    location: 'Greece & Italy',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19',
    rating: 4.8,
    reviews: 96,
    days: 10,
    price: 2499,
    discount: 0,
    featured: false,
  },
  {
    id: '3',
    title: 'Machu Picchu & Sacred Valley Trek',
    location: 'Peru',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377',
    rating: 4.9,
    reviews: 156,
    days: 8,
    price: 1799,
    discount: 12,
    featured: true,
  },
];

// PopularTours component to display all tours
const PopularTours: React.FC = () => {
  return (
    <Box as="section" py={16}>
      <SimpleGrid 
        columns={{ base: 1, md: 2, lg: 3 }} 
        gap={8}
      >
        {popularTours.map((tour) => (
          <TourCard key={tour.id} {...tour} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default PopularTours;
