"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  targetId?: string;
}

const Portal: React.FC<PortalProps> = ({ children, targetId = 'portal-root' }) => {
  const [mounted, setMounted] = useState(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Try to find existing portal element
    let element = document.getElementById(targetId);
    
    // Create portal element if it doesn't exist
    if (!element) {
      element = document.createElement('div');
      element.id = targetId;
      element.style.position = 'fixed';
      element.style.top = '0';
      element.style.left = '0';
      element.style.width = '100%';
      element.style.height = '100%';
      element.style.pointerEvents = 'none';
      element.style.zIndex = '999999';
      element.style.isolation = 'isolate'; // Create new stacking context
      document.body.appendChild(element);
    }
    
    setPortalElement(element);
    
    return () => {
      setMounted(false);
    };
  }, [targetId]);

  if (!mounted || !portalElement) {
    return null;
  }

  return createPortal(children, portalElement);
};

export default Portal;
