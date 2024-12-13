// src/services/urlService.ts
export const urls = [
    {
      name: "Url to fetch streaming data",
      url: "http://localhost:8080/streaming/data",
    },
    {
      name: "Url to fetch general data",
      url: "http://localhost:8080/success",
    },
    {
      name:"Url to fetch all topics",
      url:"http://localhost:3003/topics"
    }
  ];
  
  let selectedIndex = 0;
  
  export function getNextUrl() {
    selectedIndex = (selectedIndex + 1) % urls.length;
    return urls[selectedIndex];
  }
  