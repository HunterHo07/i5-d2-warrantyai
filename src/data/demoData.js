// Demo data for WarrantyAI interactive demonstrations

export const demoItems = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    brand: "Apple",
    model: "A3108",
    category: "Electronics",
    purchaseDate: "2024-01-15",
    warrantyExpiry: "2025-01-15",
    warrantyType: "Limited Warranty",
    warrantyDuration: "1 year",
    price: 999.99,
    serialNumber: "F2LW48XHQM",
    retailer: "Apple Store",
    status: "Active",
    daysRemaining: 45,
    image: "/demo/iphone.jpg",
    receipt: "/demo/receipt-iphone.jpg",
    documents: [
      { name: "Purchase Receipt", type: "receipt", url: "/demo/receipt-iphone.jpg" },
      { name: "Warranty Card", type: "warranty", url: "/demo/warranty-iphone.pdf" }
    ],
    reminders: [
      { type: "warranty_expiry", date: "2024-12-15", message: "Warranty expires in 30 days" },
      { type: "backup_reminder", date: "2024-12-01", message: "Create device backup" }
    ]
  },
  {
    id: 2,
    name: "Samsung Refrigerator",
    brand: "Samsung",
    model: "RF28T5001SR",
    category: "Home Appliances",
    purchaseDate: "2023-06-20",
    warrantyExpiry: "2025-06-20",
    warrantyType: "Manufacturer Warranty",
    warrantyDuration: "2 years",
    price: 1299.99,
    serialNumber: "SN123456789",
    retailer: "Home Depot",
    status: "Active",
    daysRemaining: 180,
    image: "/demo/fridge.jpg",
    receipt: "/demo/receipt-fridge.jpg",
    documents: [
      { name: "Purchase Receipt", type: "receipt", url: "/demo/receipt-fridge.jpg" },
      { name: "Installation Guide", type: "manual", url: "/demo/manual-fridge.pdf" }
    ],
    reminders: [
      { type: "filter_change", date: "2024-12-30", message: "Replace water filter" },
      { type: "maintenance", date: "2025-01-15", message: "Schedule maintenance check" }
    ]
  },
  {
    id: 3,
    name: "MacBook Pro 16\"",
    brand: "Apple",
    model: "M3 Max",
    category: "Electronics",
    purchaseDate: "2023-11-10",
    warrantyExpiry: "2024-11-10",
    warrantyType: "AppleCare+",
    warrantyDuration: "1 year + AppleCare",
    price: 2499.99,
    serialNumber: "C02ZW0XHMD6T",
    retailer: "Apple Store",
    status: "Expired",
    daysRemaining: -30,
    image: "/demo/macbook.jpg",
    receipt: "/demo/receipt-macbook.jpg",
    documents: [
      { name: "Purchase Receipt", type: "receipt", url: "/demo/receipt-macbook.jpg" },
      { name: "AppleCare Agreement", type: "warranty", url: "/demo/applecare.pdf" }
    ],
    reminders: [
      { type: "warranty_expired", date: "2024-11-10", message: "Warranty has expired" },
      { type: "backup_reminder", date: "2024-12-01", message: "Create Time Machine backup" }
    ]
  },
  {
    id: 4,
    name: "Tesla Model 3",
    brand: "Tesla",
    model: "Model 3 Long Range",
    category: "Vehicle",
    purchaseDate: "2023-03-15",
    warrantyExpiry: "2027-03-15",
    warrantyType: "Basic Vehicle Warranty",
    warrantyDuration: "4 years / 50,000 miles",
    price: 47240.00,
    serialNumber: "5YJ3E1EA8PF123456",
    retailer: "Tesla Service Center",
    status: "Active",
    daysRemaining: 850,
    image: "/demo/tesla.jpg",
    receipt: "/demo/receipt-tesla.jpg",
    documents: [
      { name: "Purchase Agreement", type: "receipt", url: "/demo/purchase-tesla.pdf" },
      { name: "Vehicle Warranty", type: "warranty", url: "/demo/warranty-tesla.pdf" }
    ],
    reminders: [
      { type: "service_due", date: "2024-12-20", message: "Annual service due" },
      { type: "tire_rotation", date: "2024-12-15", message: "Tire rotation recommended" }
    ]
  },
  {
    id: 5,
    name: "Dyson V15 Detect",
    brand: "Dyson",
    model: "V15 Detect",
    category: "Home Appliances",
    purchaseDate: "2024-02-28",
    warrantyExpiry: "2026-02-28",
    warrantyType: "Manufacturer Warranty",
    warrantyDuration: "2 years",
    price: 749.99,
    serialNumber: "DY123456789",
    retailer: "Best Buy",
    status: "Active",
    daysRemaining: 430,
    image: "/demo/dyson.jpg",
    receipt: "/demo/receipt-dyson.jpg",
    documents: [
      { name: "Purchase Receipt", type: "receipt", url: "/demo/receipt-dyson.jpg" },
      { name: "User Manual", type: "manual", url: "/demo/manual-dyson.pdf" }
    ],
    reminders: [
      { type: "filter_clean", date: "2024-12-25", message: "Clean HEPA filter" },
      { type: "maintenance", date: "2025-02-28", message: "Annual maintenance check" }
    ]
  }
];

export const demoCategories = [
  { id: 'all', name: 'All Items', count: demoItems.length },
  { id: 'electronics', name: 'Electronics', count: demoItems.filter(item => item.category === 'Electronics').length },
  { id: 'home', name: 'Home Appliances', count: demoItems.filter(item => item.category === 'Home Appliances').length },
  { id: 'vehicle', name: 'Vehicle', count: demoItems.filter(item => item.category === 'Vehicle').length }
];

export const demoStats = {
  totalItems: demoItems.length,
  activeWarranties: demoItems.filter(item => item.status === 'Active').length,
  expiredWarranties: demoItems.filter(item => item.status === 'Expired').length,
  expiringThisMonth: demoItems.filter(item => item.daysRemaining <= 30 && item.daysRemaining > 0).length,
  totalValue: demoItems.reduce((sum, item) => sum + item.price, 0),
  avgWarrantyDuration: 1.8 // years
};

export const demoNotifications = [
  {
    id: 1,
    type: 'warning',
    title: 'Warranty Expiring Soon',
    message: 'iPhone 15 Pro warranty expires in 45 days',
    date: '2024-12-01',
    read: false,
    itemId: 1
  },
  {
    id: 2,
    type: 'info',
    title: 'Service Reminder',
    message: 'Tesla Model 3 annual service due in 20 days',
    date: '2024-11-30',
    read: false,
    itemId: 4
  },
  {
    id: 3,
    type: 'error',
    title: 'Warranty Expired',
    message: 'MacBook Pro warranty expired 30 days ago',
    date: '2024-11-10',
    read: true,
    itemId: 3
  },
  {
    id: 4,
    type: 'success',
    title: 'Filter Replacement',
    message: 'Samsung Refrigerator filter changed successfully',
    date: '2024-11-25',
    read: true,
    itemId: 2
  }
];

export const demoUploadSimulation = {
  steps: [
    { id: 1, name: 'File Upload', status: 'completed', duration: 500 },
    { id: 2, name: 'Image Processing', status: 'completed', duration: 1200 },
    { id: 3, name: 'OCR Analysis', status: 'completed', duration: 800 },
    { id: 4, name: 'AI Extraction', status: 'completed', duration: 1500 },
    { id: 5, name: 'Data Validation', status: 'completed', duration: 600 },
    { id: 6, name: 'Database Update', status: 'completed', duration: 400 }
  ],
  extractedData: {
    retailer: 'Apple Store',
    date: '2024-01-15',
    total: '$999.99',
    product: 'iPhone 15 Pro',
    model: 'A3108',
    serialNumber: 'F2LW48XHQM',
    warranty: '1 Year Limited Warranty',
    confidence: 98.5
  }
};

export const demo3DItems = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    position: { x: 2, y: 1, z: 0 },
    rotation: { x: 0, y: 0.5, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    color: "#1f2937",
    room: "office"
  },
  {
    id: 2,
    name: "Samsung Refrigerator",
    position: { x: -3, y: 0, z: -2 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1.5, y: 2, z: 1 },
    color: "#6b7280",
    room: "kitchen"
  },
  {
    id: 3,
    name: "MacBook Pro",
    position: { x: 0, y: 1.2, z: 1 },
    rotation: { x: -0.2, y: 0, z: 0 },
    scale: { x: 1.2, y: 0.1, z: 0.8 },
    color: "#374151",
    room: "office"
  },
  {
    id: 4,
    name: "Dyson V15",
    position: { x: -1, y: 0, z: 2 },
    rotation: { x: 0, y: 0.3, z: 0 },
    scale: { x: 0.3, y: 1.5, z: 0.3 },
    color: "#7c3aed",
    room: "living"
  }
];

export const demoRooms = [
  { id: 'office', name: 'Office', items: 2, color: '#3b82f6' },
  { id: 'kitchen', name: 'Kitchen', items: 1, color: '#10b981' },
  { id: 'living', name: 'Living Room', items: 1, color: '#f59e0b' },
  { id: 'bedroom', name: 'Bedroom', items: 0, color: '#8b5cf6' }
];
