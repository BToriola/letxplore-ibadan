import { defineConfig } from '@chakra-ui/react';

const theme = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#e6f7ff' },
          100: { value: '#b3e0ff' },
          200: { value: '#80c9ff' },
          300: { value: '#4db3ff' },
          400: { value: '#1a9cff' },
          500: { value: '#0085e6' },
          600: { value: '#0069b3' },
          700: { value: '#004d80' },
          800: { value: '#00324d' },
          900: { value: '#00161a' },
        },
        accent: {
          50: { value: '#f0fff4' },
          100: { value: '#c6f6d5' },
          200: { value: '#9ae6b4' },
          300: { value: '#68d391' },
          400: { value: '#48bb78' },
          500: { value: '#38a169' },
          600: { value: '#2f855a' },
          700: { value: '#276749' },
          800: { value: '#1e543b' },
          900: { value: '#1c4532' },
        },
      },
      fonts: {
        heading: { value: 'Geist, sans-serif' },
        body: { value: 'Geist, sans-serif' },
      },
      breakpoints: {
        sm: { value: '30em' },
        md: { value: '48em' },
        lg: { value: '62em' },
        xl: { value: '80em' },
        '2xl': { value: '96em' },
      },
    },
    semanticTokens: {
      colors: {
        'brand.solid': {
          value: {
            base: '{colors.brand.500}',
            _dark: '{colors.brand.400}',
          },
        },
        'brand.contrast': {
          value: {
            base: 'white',
            _dark: 'black',
          },
        },
        'accent.solid': {
          value: {
            base: '{colors.accent.500}',
            _dark: '{colors.accent.400}',
          },
        },
        'accent.contrast': {
          value: {
            base: 'white',
            _dark: 'black',
          },
        },
      },
    },
    recipes: {
      button: {
        base: {
          fontWeight: 'bold',
          borderRadius: 'md',
        },
        variants: {
          variant: {
            primary: {
              bg: 'brand.solid',
              color: 'brand.contrast',
              _hover: {
                bg: 'brand.600',
              },
            },
            secondary: {
              bg: 'accent.solid',
              color: 'accent.contrast',
              _hover: {
                bg: 'accent.600',
              },
            },
            outline: {
              borderColor: 'brand.solid',
              color: 'brand.solid',
              _hover: {
                bg: 'brand.50',
              },
            },
          },
        },
      },
      link: {
        base: {
          color: 'brand.solid',
          _hover: {
            textDecoration: 'none',
            color: 'brand.600',
          },
        },
      },
    },
  },
});

export default theme;