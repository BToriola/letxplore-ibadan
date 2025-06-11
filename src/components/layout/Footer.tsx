"use client";

import React from 'react';
import { Box, Container, Text, Heading, Input, Button, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

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
const Stack = (props: any) => <div style={{ display: 'flex', flexDirection: 'column' }} {...props} />;
const Divider = ({ my, borderColor, ...rest }: any) => {
  // Transform Chakra UI props to inline styles
  const style = {
    margin: typeof my === 'number' ? `${my * 0.25}rem 0` : my,
    borderColor: borderColor || 'inherit',
    borderWidth: '0 0 1px 0',
    width: '100%'
  };
  
  return <hr style={style} {...rest} />;
};

const Footer = () => {
  return (
    <Box as="footer" bg="gray.50" color="gray.700" py={10}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} mb={8}>
          {/* Brand Column */}
          <Stack spacing={6}>
            <Box>
              <Heading as="h2" size="md" color="brand.600" fontWeight="bold" mb={2}>
                LetsExplore
              </Heading>
              <Text fontSize="sm">
                Discover amazing destinations around the world with our curated travel experiences.
              </Text>
            </Box>
            <Box>
              <Heading as="h3" size="sm" mb={3}>
                Join Newsletter
              </Heading>
              <Stack>
                <Input placeholder="Your email address" bg="white" />
                <Button variant="solid" colorScheme="brand" size="md">
                  Subscribe
                </Button>
              </Stack>
            </Box>
          </Stack>
          
          {/* Links Columns */}
          <FooterLinkColumn 
            title="Destinations" 
            links={[
              { label: 'Popular Destinations', href: '/destinations/popular' },
              { label: 'Featured Trips', href: '/destinations/featured' },
              { label: 'Travel Guides', href: '/guides' },
              { label: 'Seasonal Offers', href: '/offers' },
            ]} 
          />
          
          <FooterLinkColumn 
            title="Company" 
            links={[
              { label: 'About Us', href: '/about' },
              { label: 'Careers', href: '/careers' },
              { label: 'Blog', href: '/blog' },
              { label: 'Press', href: '/press' },
            ]} 
          />
          
          <FooterLinkColumn 
            title="Support" 
            links={[
              { label: 'Help Center', href: '/help' },
              { label: 'Safety Tips', href: '/safety' },
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
            ]} 
          />
        </SimpleGrid>
        
        <Divider my={6} borderColor="gray.200" />
        
        {/* Bottom Bar */}
        <Flex 
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'center', md: 'center' }}
          fontSize="sm"
        >
          <Text>&copy; {new Date().getFullYear()} LetsExplore. All rights reserved.</Text>
          <Flex mt={{ base: 4, md: 0 }} gap={4}>
            <NextLink href="#" passHref legacyBehavior>
              <Link>Instagram</Link>
            </NextLink>
            <NextLink href="#" passHref legacyBehavior>
              <Link>Twitter</Link>
            </NextLink>
            <NextLink href="#" passHref legacyBehavior>
              <Link>Facebook</Link>
            </NextLink>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

// Define interface for the link object
interface FooterLink {
  label: string;
  href: string;
}

// Define interface for the FooterLinkColumn props
interface FooterLinkColumnProps {
  title: string;
  links: FooterLink[];
}

const FooterLinkColumn = ({ title, links }: FooterLinkColumnProps) => {
  return (
    <Stack align="flex-start">
      <Heading as="h3" size="sm" mb={3}>
        {title}
      </Heading>
      <Stack spacing={2}>
        {links.map((link: FooterLink, index: number) => (
          <NextLink key={index} href={link.href} passHref legacyBehavior>
            <Link fontSize="sm">{link.label}</Link>
          </NextLink>
        ))}
      </Stack>
    </Stack>
  );
};

export default Footer;
