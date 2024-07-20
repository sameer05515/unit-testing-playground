function generateDummyData() {
    return Array.from({ length: 10 }, (_, i) => ({
      name: `Category ${i + 1}`,
      value: Math.floor(Math.random() * 100)
    }));
  }
  
  export default  generateDummyData;
  