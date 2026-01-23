export async function fetchAllNFTs() {
  // MOCK DATA — replace with blockchain later
  return [
    {
      id: 1,
      name: "Cyber Cat",
      image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
      price: "0.25",
      collection: "animals",
      category: "animals",
    },
    {
      id: 2,
      name: "Neon Car",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      price: "0.6",
      collection: "vehicles",
      category: "vehicles",
    },
    {
      id: 3,
      name: "Future Laptop",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      price: "0.4",
      collection: "tech",
      category: "tech",
    },
    {
      id: 4,
      name: "Coffee Cup",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      price: "0.15",
      collection: "lifestyle",
      category: "lifestyle",
    },
  ];
}