"use client";

import React from 'react';
import { 
  Box, 
  Flex,
  Button
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

type InputGroupProps = React.HTMLAttributes<HTMLDivElement>;

interface InputAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  placement: 'start' | 'end';
  children: React.ReactNode;
}

const InputGroup = (props: InputGroupProps) => <div style={{ position: 'relative', display: 'flex' }} {...props} />;
const InputAddon = ({ placement, children, ...rest }: InputAddonProps) => {
  const style: React.CSSProperties = {
    position: 'absolute',
    left: placement === 'start' ? '10px' : undefined,
    right: placement === 'end' ? '10px' : undefined,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center'
  };
  return <div style={style} {...rest}>{children}</div>;
};

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  borderColor?: string;
}

const Input = ({ size, borderColor, placeholder, ...rest }: InputProps) => {
  const style: React.CSSProperties = {
    width: '100%',
    padding: size === 'lg' ? '0.75rem 1rem' : '0.5rem 0.75rem',
    paddingLeft: '2.5rem', // Space for the icon
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: borderColor || 'inherit',
    borderRadius: '0.375rem',
    fontSize: size === 'lg' ? '1.125rem' : '1rem'
  };
  return <input placeholder={placeholder} style={style} {...rest} />;
};

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  borderColor?: string;
  placeholder?: string;
  children: React.ReactNode;
}

const Select = ({ size, borderColor, placeholder, children, ...rest }: SelectProps) => {
  const style: React.CSSProperties = {
    width: '100%',
    padding: size === 'lg' ? '0.75rem 1rem' : '0.5rem 0.75rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: borderColor || 'inherit',
    borderRadius: '0.375rem',
    fontSize: size === 'lg' ? '1.125rem' : '1rem',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3E%3C/svg%3E")',
    backgroundPosition: 'right 0.5rem center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1.5em 1.5em',
    paddingRight: '2.5rem'
  };
  return (
    <select style={style} {...rest}>
      {placeholder && <option value="" disabled selected>{placeholder}</option>}
      {children}
    </select>
  );
};

interface FlexValue {
  md?: number | string;
  [key: string]: number | string | undefined;
}

interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  flex?: number | FlexValue;
}

const FormControl = ({ flex, ...rest }: FormControlProps) => {
  const style: React.CSSProperties = {
    marginBottom: '1rem',
    width: '100%',
    flex: typeof flex === 'object' ? flex.md : flex
  };
  return <div style={style} {...rest} />;
};
const useColorMode = () => ({ colorMode: 'light' });

const SearchBar = () => {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'light' ? 'white' : 'gray.800';
  
  return (
    <Box 
      width="100%" 
      maxWidth="container.lg" 
      margin="0 auto" 
      padding={6} 
      bg={bgColor} 
      borderRadius="xl" 
      boxShadow="lg"
      position="relative"
      marginTop={-16}
      zIndex={10}
    >
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        gap={{ base: 4, md: 2 }}
        align="center"
      >
        {/* Destination */}
        <FormControl flex={{ md: 3 }}>
          <InputGroup>
            <InputAddon placement="start">
              <SearchIcon color="gray.400" />
            </InputAddon>
            <Input 
              placeholder="Where do you want to go?"
              borderColor="brand.400"
              size="lg"
            />
          </InputGroup>
        </FormControl>
        
        {/* Date */}
        <FormControl flex={{ md: 2 }}>
          <Select 
            placeholder="Select Month"
            borderColor="brand.400" 
            size="lg"
          >
            <option value="january">January</option>
            <option value="february">February</option>
            <option value="march">March</option>
            <option value="april">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="august">August</option>
            <option value="september">September</option>
            <option value="october">October</option>
            <option value="november">November</option>
            <option value="december">December</option>
          </Select>
        </FormControl>
        
        {/* Travelers */}
        <FormControl flex={{ md: 2 }}>
          <Select 
            placeholder="Travelers"
            borderColor="brand.400"
            size="lg"
          >
            <option value="1">1 Person</option>
            <option value="2">2 People</option>
            <option value="3">3 People</option>
            <option value="4">4 People</option>
            <option value="5+">5+ People</option>
          </Select>
        </FormControl>
        
        <Button 
          variant="solid"
          colorScheme="brand"
          size="lg"
          paddingX={8}
          width={{ base: '100%', md: 'auto' }}
        >
          Search
        </Button>
      </Flex>
    </Box>
  );
};

export default SearchBar;
