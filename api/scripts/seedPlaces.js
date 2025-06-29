const { connectWithDB } = require('../config/db');
const Place = require('../models/Place');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  // Union Territories
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Lakshadweep', 'Puducherry', 'Andaman and Nicobar Islands'
];

const cities = {
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur', 'Amravati', 'Nanded'],
  'Delhi': ['New Delhi', 'Old Delhi', 'Dwarka', 'Rohini', 'Pitampura', 'Janakpuri', 'Lajpat Nagar', 'Hauz Khas', 'Connaught Place', 'Khan Market'],
  'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum', 'Gulbarga', 'Davanagere', 'Bellary', 'Bijapur', 'Shimoga'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli', 'Vellore', 'Erode', 'Tiruppur', 'Dindigul', 'Thanjavur'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar', 'Anand', 'Bharuch', 'Valsad'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Prayagraj', 'Noida', 'Bareilly', 'Aligarh', 'Moradabad'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman', 'Malda', 'Baharampur', 'Habra', 'Kharagpur'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Ramagundam', 'Khammam', 'Mahbubnagar', 'Nalgonda', 'Adilabad', 'Siddipet'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Udaipur', 'Bhilwara', 'Alwar', 'Sri Ganganagar', 'Sikar'],
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Rajahmundry', 'Kakinada', 'Tirupati', 'Anantapur', 'Kadapa'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Malappuram', 'Kannur', 'Kollam', 'Palakkad', 'Alappuzha', 'Pathanamthitta'],
  'Madhya Pradesh': ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam', 'Rewa'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Pathankot', 'Moga', 'Hoshiarpur', 'Batala', 'Mohali'],
  'Haryana': ['Faridabad', 'Gurgaon', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak', 'Hisar', 'Karnal', 'Sonipat', 'Panchkula'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Arrah', 'Begusarai', 'Katihar', 'Chhapra'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Brahmapur', 'Sambalpur', 'Puri', 'Baleshwar', 'Bhadrak', 'Baripada', 'Balangir'],
  'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur', 'Sivasagar', 'Goalpara', 'Barpeta'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro Steel City', 'Deoghar', 'Phusro', 'Adityapur', 'Hazaribagh', 'Giridih', 'Ramgarh'],
  'Chhattisgarh': ['Raipur', 'Bhilai', 'Korba', 'Bilaspur', 'Durg', 'Rajnandgaon', 'Jagdalpur', 'Raigarh', 'Ambikapur', 'Mahasamund'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudrapur', 'Kashipur', 'Rishikesh', 'Kotdwara', 'Ramnagar', 'Pithoragarh'],
  'Himachal Pradesh': ['Shimla', 'Mandi', 'Solan', 'Kullu', 'Dharamshala', 'Chamba', 'Palampur', 'Kangra', 'Una', 'Hamirpur'],
  'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda', 'Bicholim', 'Valpoi', 'Sanquelim', 'Curchorem', 'Cuncolim'],
  'Manipur': ['Imphal', 'Thoubal', 'Bishnupur', 'Churachandpur', 'Ukhrul', 'Senapati', 'Tamenglong', 'Chandel', 'Jiribam', 'Kakching'],
  'Meghalaya': ['Shillong', 'Tura', 'Jowai', 'Nongstoin', 'Williamnagar', 'Baghmara', 'Nongpoh', 'Mairang', 'Resubelpara', 'Khliehriat'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Saiha', 'Champhai', 'Kolasib', 'Serchhip', 'Lawngtlai', 'Mamit', 'Saitual', 'Khawzawl'],
  'Nagaland': ['Dimapur', 'Kohima', 'Mokokchung', 'Tuensang', 'Wokha', 'Zunheboto', 'Phek', 'Mon', 'Longleng', 'Kiphire'],
  'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar', 'Kailasahar', 'Belonia', 'Khowai', 'Teliamura', 'Sabroom', 'Amarpur', 'Kamalpur'],
  'Sikkim': ['Gangtok', 'Namchi', 'Mangan', 'Gyalshing', 'Ravongla', 'Lachung', 'Pelling', 'Jorethang', 'Rangpo', 'Singtam'],
  'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat', 'Bomdila', 'Tawang', 'Ziro', 'Along', 'Tezu', 'Roing', 'Khonsa'],
  'Ladakh': ['Leh', 'Kargil', 'Drass', 'Nubra Valley', 'Pangong Lake', 'Zanskar', 'Suru Valley', 'Changthang', 'Sham Valley', 'Indus Valley']
};

// Location-specific image mappings
const locationImages = {
  // Maharashtra - Modern cityscapes and heritage
  'Mumbai': [
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
  ],
  'Pune': [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop'
  ],
  
  // Delhi - Historical and modern
  'New Delhi': [
    'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
  ],
  'Old Delhi': [
    'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop'
  ],
  
  // Karnataka - Tech and heritage
  'Bangalore': [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop'
  ],
  'Mysore': [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop'
  ],
  
  // Tamil Nadu - Heritage and beaches
  'Chennai': [
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop'
  ],
  
  // Gujarat - Business and heritage
  'Ahmedabad': [
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop'
  ],
  
  // Uttar Pradesh - Historical
  'Agra': [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop'
  ],
  'Varanasi': [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
  ],
  
  // West Bengal - Cultural
  'Kolkata': [
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop'
  ],
  
  // Telangana - Tech hub
  'Hyderabad': [
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop'
  ],
  
  // Rajasthan - Heritage and desert
  'Jaipur': [
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop'
  ],
  'Udaipur': [
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
  ],
  'Jodhpur': [
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
  ],
  
  // Kerala - Backwaters and beaches
  'Kochi': [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop'
  ],
  'Thiruvananthapuram': [
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop'
  ],
  
  // Goa - Beaches and Portuguese heritage
  'Panaji': [
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop'
  ],
  'Margao': [
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
  ],
  
  // Himachal Pradesh - Mountains and hill stations
  'Shimla': [
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
  ],
  'Manali': [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop'
  ],
  'Dharamshala': [
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop'
  ],
  
  // Uttarakhand - Spiritual and adventure
  'Rishikesh': [
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop'
  ],
  'Haridwar': [
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
  ],
  
  // Ladakh - High altitude desert
  'Leh': [
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
  ],
  
  // Sikkim - Himalayan beauty
  'Gangtok': [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop'
  ],
  
  // Assam - Tea gardens and wildlife
  'Guwahati': [
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop'
  ],
  
  // Punjab - Golden Temple and agriculture
  'Amritsar': [
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop'
  ],
  
  // Haryana - Modern development
  'Gurgaon': [
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
  ],
  
  // Default images for other cities
  'default': [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
  ]
};

const placeTypes = [
  'Cozy Apartment', 'Luxury Villa', 'Heritage Haveli', 'Beach Resort', 'Mountain Retreat', 
  'City Studio', 'Garden Bungalow', 'Farmhouse', 'Treehouse', 'Houseboat',
  'Palace Suite', 'Desert Camp', 'Forest Lodge', 'Riverside Cottage', 'Hill Station Villa',
  'Beach House', 'Urban Penthouse', 'Traditional Homestay', 'Eco Resort', 'Boutique Hotel',
  'Heritage Hotel', 'Spa Resort', 'Adventure Camp', 'Lakeside Villa', 'Tea Estate Bungalow'
];

const amenities = [
  'WiFi', 'Kitchen', 'Free parking', 'Washing machine', 'Air conditioning', 
  'Dedicated workspace', 'TV', 'Gym', 'Pool', 'Hot tub', 'BBQ grill', 
  'Fireplace', 'Balcony', 'Garden', 'Beach access', 'Mountain view', 
  'City view', 'Pet friendly', 'Family friendly', 'Long term stays',
  'Room service', 'Spa facilities', 'Yoga room', 'Meditation space', 'Ayurvedic treatments',
  'Traditional cooking classes', 'Local guide services', 'Airport pickup', 'Car rental',
  'Bicycle rental', 'Trekking equipment', 'Water sports equipment', 'Cultural performances'
];

const descriptions = [
  'Experience authentic Indian hospitality in this beautifully designed StayInn accommodation with modern amenities and traditional touches.',
  'Immerse yourself in the rich culture and heritage of India while enjoying contemporary comforts and luxury at this StayInn property.',
  'Discover the perfect blend of traditional architecture and modern convenience in this thoughtfully curated StayInn space.',
  'Escape to tranquility with stunning views and world-class amenities in this premium StayInn accommodation.',
  'Experience the warmth of Indian hospitality in this charming StayInn property with all the comforts of home.',
  'Luxurious StayInn retreat featuring traditional Indian design elements and modern luxury amenities.',
  'Peaceful StayInn sanctuary with beautiful surroundings and authentic local experiences.',
  'Elegant StayInn accommodation showcasing the best of Indian craftsmanship and contemporary design.',
  'Comfortable and welcoming StayInn space perfect for experiencing the local culture and lifestyle.',
  'Premium StayInn property offering a unique blend of traditional charm and modern sophistication.'
];

const generateLocationSpecificPhotos = (city, state) => {
  // Get city-specific images or fallback to state-based or default
  let photoUrls = locationImages[city] || locationImages[state] || locationImages['default'];
  
  const numPhotos = Math.floor(Math.random() * 6) + 5; // 5-10 photos
  const selectedPhotos = [];
  
  for (let i = 0; i < numPhotos; i++) {
    const randomPhoto = photoUrls[Math.floor(Math.random() * photoUrls.length)];
    selectedPhotos.push(randomPhoto);
  }
  
  return selectedPhotos;
};

const generateRandomPerks = () => {
  const numPerks = Math.floor(Math.random() * 8) + 4; // 4-11 perks
  const shuffled = amenities.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numPerks);
};

const generateRandomPrice = () => {
  // Indian pricing: ₹1000-₹15000 per night
  return Math.floor(Math.random() * 14000) + 1000;
};

const generateRandomGuests = () => {
  return Math.floor(Math.random() * 8) + 1; // 1-8 guests
};

const generateIndianAddress = (city, state) => {
  const streetNames = [
    'MG Road', 'Park Street', 'Marine Drive', 'Connaught Place', 'Khan Market',
    'Lajpat Nagar', 'Hauz Khas', 'Bandra West', 'Juhu', 'Andheri West',
    'Koramangala', 'Indiranagar', 'Whitefield', 'Electronic City', 'HSR Layout',
    'Baner', 'Koregaon Park', 'Viman Nagar', 'Kalyani Nagar', 'Hadapsar',
    'Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'Hitech City', 'Secunderabad',
    'Anna Nagar', 'T Nagar', 'Adyar', 'Mylapore', 'Besant Nagar', 'Egmore'
  ];
  
  const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
  const streetNumber = Math.floor(Math.random() * 999) + 1;
  const area = ['Near', 'Behind', 'Opposite', 'Adjacent to'][Math.floor(Math.random() * 4)];
  const landmark = ['Mall', 'Metro Station', 'Park', 'Hospital', 'School', 'Temple', 'Market'][Math.floor(Math.random() * 7)];
  
  return `${streetNumber}, ${streetName}, ${area} ${landmark}, ${city}, ${state}`;
};

const seedPlaces = async () => {
  try {
    await connectWithDB();
    console.log('Connected to database');

    // Create a default user if not exists
    let defaultUser = await User.findOne({ email: 'host@airbnb.com' });
    if (!defaultUser) {
      defaultUser = await User.create({
        name: 'Sample Host',
        email: 'host@airbnb.com',
        password: 'password123',
        role: 'user'
      });
      console.log('Created default user');
    }

    // Clear existing places
    await Place.deleteMany({});
    console.log('Cleared existing places');

    const places = [];
    let placeId = 1;

    for (const state of states) {
      const stateCities = cities[state] || [state + ' City', state + ' Town', state + ' Village'];
      
      // Generate 4-10 places per state (more for major states)
      const numPlaces = stateCities.length > 5 ? 
        Math.floor(Math.random() * 7) + 4 : // 4-10 for major states
        Math.floor(Math.random() * 4) + 2;  // 2-5 for smaller states
      
      for (let i = 0; i < numPlaces; i++) {
        const city = stateCities[Math.floor(Math.random() * stateCities.length)];
        const placeType = placeTypes[Math.floor(Math.random() * placeTypes.length)];
        const description = descriptions[Math.floor(Math.random() * descriptions.length)];
        
        const place = {
          owner: defaultUser._id,
          title: `${placeType} in ${city}`,
          address: generateIndianAddress(city, state),
          photos: generateLocationSpecificPhotos(city, state),
          description: `${description} Located in the vibrant city of ${city}, ${state}, this ${placeType.toLowerCase()} offers an authentic Indian experience with modern comforts through StayInn.`,
          perks: generateRandomPerks(),
          extraInfo: `Check-in: 2:00 PM | Check-out: 11:00 AM | Self check-in with keypad | No smoking | No parties or events | Pets allowed with prior approval | Traditional Indian breakfast included | StayInn verified property`,
          maxGuests: generateRandomGuests(),
          price: generateRandomPrice()
        };
        
        places.push(place);
        placeId++;
      }
    }

    // Insert all places
    await Place.insertMany(places);
    console.log(`Successfully seeded ${places.length} places across ${states.length} Indian states and union territories`);

    // Log some statistics
    const totalPlaces = await Place.countDocuments();
    console.log(`Total places in database: ${totalPlaces}`);
    
    const avgPrice = await Place.aggregate([
      { $group: { _id: null, avgPrice: { $avg: '$price' } } }
    ]);
    console.log(`Average price: ₹${Math.round(avgPrice[0]?.avgPrice || 0)}`);

    // Show places by major states
    const majorStates = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat'];
    for (const state of majorStates) {
      const count = await Place.countDocuments({ address: { $regex: state, $options: 'i' } });
      console.log(`${state}: ${count} places`);
    }

    console.log('\n🎉 Location-specific images have been assigned!');
    console.log('📸 Each place now has images that match its location and character.');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding places:', error);
    process.exit(1);
  }
};

seedPlaces(); 