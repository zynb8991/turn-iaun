import React from 'react'
import { cookies } from 'next/headers';

const authToken = async () => {
  const token = cookies().get('turn-iaun-user');
  if(!token) return;

  try {
    const res = await fetch("http://localhost:3000/api/token", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({token: token.value})
    });

    const data = await res.json();
    if(data.error) {
      return false;
    }
    
    return data.data;

  } catch (error) {
    return false;
  }
}

export default authToken