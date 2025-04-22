import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// Mapping for route paths to display names
const routeNameMap: Record<string, string> = {
  '': 'Home',
  'storelocator': 'Store Locator',
  'karnataka': 'Karnataka',
  'maharashtra': 'Maharashtra',
  'tamil-nadu': 'Tamil Nadu',
  'bangalore-central': 'Bangalore Central',
  'bangalore-south': 'Bangalore South',
  'mumbai-central': 'Mumbai Central',
  'pune': 'Pune',
  'chennai-central': 'Chennai Central',
  'coimbatore': 'Coimbatore',
};

// Generic lookup for state and showroom paths that might not be in the map
const getDisplayName = (path: string): string => {
  if (routeNameMap[path]) {
    return routeNameMap[path];
  }
  // Capitalize and replace hyphens with spaces if not found in map
  return path.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
};

const DynamicBreadcrumb: React.FC = () => {
  const location = useLocation();
  
  // Split the pathname into segments
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Build breadcrumb items with accumulated paths
  const breadcrumbItems = pathSegments.map((segment, index) => {
    // Build the path for this breadcrumb item
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    
    // Get display name from params for dynamic segments
    const displayName = getDisplayName(segment);
    
    // Check if this is the last item (current page)
    const isLastItem = index === pathSegments.length - 1;
    
    return (
      <BreadcrumbItem key={path}>
        {isLastItem ? (
          <BreadcrumbPage className="text-[#AF1F2D] font-medium">{displayName}</BreadcrumbPage>
        ) : (
          <>
            <BreadcrumbLink asChild className="text-[#878787] hover:text-[#AF1F2D]">
              <Link to={path}>{displayName}</Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator/>
          </>
        )}
      </BreadcrumbItem>
    );
  });

  // Add home link at the beginning
  const breadcrumbs = [
    <BreadcrumbItem key="home">
      <BreadcrumbLink asChild className="text-[#878787] hover:text-[#AF1F2D]">
        <Link to="/">Home</Link>
      </BreadcrumbLink>
      {pathSegments.length > 0 && (
        <BreadcrumbSeparator />
      )}
    </BreadcrumbItem>,
    ...breadcrumbItems
  ];

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>{breadcrumbs}</BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb; 