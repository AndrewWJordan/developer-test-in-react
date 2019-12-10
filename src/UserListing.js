import React, { useState, useEffect } from 'react';
import axios from 'axios';

function getData(url) {
  try {
    const results = axios.get(url);
    return results;
  } catch(error) {
    console.log("error", error);
  }
}

export default function UserListing() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getUsers() {
    const {data: {results}} = await getData("https://randomuser.me/api/?results=20&nat=us,ca");
    setUsers(results);
    setIsLoading(false);
  }

  function isoDateTransformer(date) {
    const convertedDate = new Date(date);
    const year = convertedDate.getFullYear();
    const month = convertedDate.getMonth()+1;
    const day = convertedDate.getDate();
    return {
      year,
      month,
      day
    }
  }

  function getBirthday(date) {
    const {day, month, year} = isoDateTransformer(date);
    return `${month}/${day}/${year}`;
  }

  function isBirthday(date) {
    const {day, month} = isoDateTransformer(date);
    const today = new Date();
    const birthday = new Date(today.getFullYear(), month-1, day);
    if(birthday < today) {
      return "Already happend"
    }
    if(birthday > today) {
      return "Has yet to occur";
    }
    if(birthday === today) {
        return "It's today!";
    }
  }

  
  useEffect(() => {
    getUsers();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (users.length === 0) {
    return <div>There are no users.</div>;
  }

  return (
    <div className="user_listing_container">
      <h1>Users listing</h1>
      <table>
        <thead>
          <tr>
            <th>Gender</th>
            <th>Name</th>
            <th>Country</th>
            <th>Date of Birth</th>
            <th>Birthday</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => 
          <tr key={user.login.uuid}>
            <td>{user.gender}</td>
            <td>{`${user.name.first} ${user.name.last}`}</td>
            <td>{user.location.country}</td>
            <td>{getBirthday(user.dob.date)}</td>
            <td>{isBirthday(user.dob.date)}</td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}