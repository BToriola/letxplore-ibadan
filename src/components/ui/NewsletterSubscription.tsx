"use client";

import React, { useState } from 'react';
import { Box, Heading, Text, Input, Button, Flex, Container, createToaster } from '@chakra-ui/react';

const toaster = createToaster({
  placement: 'top-end',
});

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmail('');
      toaster.create({
        title: "Subscription successful!",
        description: "You're now subscribed to our newsletter.",
        type: "success",
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <Box as="section" py={12} bg="gray.50">
      <Container maxW="container.xl">
        <Flex 
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          bg="white"
          p={8}
          borderRadius="xl"
          boxShadow="md"
        >
          <Box mb={{ base: 6, md: 0 }} pr={{ md: 8 }} maxW={{ md: "60%" }}>
            <Heading as="h2" size="lg" mb={2}>
              Join Our Newsletter
            </Heading>
            <Text color="gray.600">
              Subscribe to our newsletter and get exclusive travel tips, destination guides, and special offers delivered directly to your inbox.
            </Text>
          </Box>
          
          <Box as="form" onSubmit={handleSubscribe} w={{ base: "full", md: "40%" }}>
            <Flex direction={{ base: "column", sm: "row" }} gap={3}>
              <Input
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                size="lg"
                _focus={{ borderColor: "brand.400" }}
              />
              <Button
                type="submit"
                variant="solid"
                colorScheme="blue"
                size="lg"
                loading={isLoading}
                w={{ base: "full", sm: "auto" }}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default NewsletterSubscription;