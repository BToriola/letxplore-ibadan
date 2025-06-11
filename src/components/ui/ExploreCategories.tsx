"use client";

import React from 'react';
import { Box, Container, Heading, SimpleGrid, Text, Button, Flex, Image } from '@chakra-ui/react';

const categoriesData = [
    {
        id: '1',
        title: 'Beach Getaways',
        count: 45,
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    },
    {
        id: '2',
        title: 'Mountain Adventures',
        count: 32,
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    },
    {
        id: '3',
        title: 'City Breaks',
        count: 28,
        image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785',
    },
    {
        id: '4',
        title: 'Cultural Experiences',
        count: 36,
        image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f',
    },
];

interface CategoryCardProps {
    title: string;
    count: number;
    image: string;
}

const CategoryCard = ({ title, count, image }: CategoryCardProps) => {
    return (
        <Box
            position="relative"
            height="250px"
            borderRadius="lg"
            overflow="hidden"
            transition="transform 0.3s"
            _hover={{ transform: 'scale(1.03)' }}
            cursor="pointer"
        >
            {/* Background Image */}
            <Image
                src={image}
                alt={title}
                objectFit="cover"
                w="full"
                h="full"
            />

            {/* Overlay */}
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="blackAlpha.600"
                transition="background 0.3s"
                _hover={{ bg: 'blackAlpha.500' }}
            />

            {/* Content */}
            <Flex
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                p={6}
                direction="column"
                align="flex-start"
                color="white"
            >
                <Heading as="h3" size="md" mb={1}>
                    {title}
                </Heading>
                <Text fontSize="sm">
                    {count} destinations
                </Text>
            </Flex>
        </Box>
    );
};

const ExploreCategories = () => {
    return (
        <Box as="section" py={16} bg="gray.50">
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
                            Explore by Category
                        </Text>
                        <Heading as="h2" size="xl" mb={2}>
                            Find Your Perfect Trip Type
                        </Heading>
                        <Text color="gray.600" maxW="2xl">
                            Whether you're seeking relaxation or adventure, we have the perfect journey waiting for you.
                        </Text>
                    </Box>

                    <Button
                        variant="outline"
                        alignSelf={{ base: 'flex-start', sm: 'center' }}
                    >
                        All Categories
                    </Button>
                </Flex>
                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 4 }}
                    gap={6}
                >
                    {categoriesData.map((category) => (
                        <CategoryCard
                            key={category.id}
                            {...category}
                        />
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
};

export default ExploreCategories;
