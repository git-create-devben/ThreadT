import React from 'react'

export async function getData() {
  const url = 'https://threads-by-instagram-fast.p.rapidapi.com/users/details?userId=314216';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '7dd1c7dee4mshcfec6817a02ae0cp191b12jsn491b5cf51ed9',
      'X-RapidAPI-Host': 'threads-by-instagram-fast.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.json;
    console.log(result);
  } catch (error) {
    console.error(error);
  }

 
}

// getData();

async function threadcircle() {
return(
  <div>
    <h1>Textiing data</h1>
  </div>
)
}




export default threadcircle