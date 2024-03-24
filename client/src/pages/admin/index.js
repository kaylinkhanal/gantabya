import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, message, Space, Input } from 'antd';

const Home = () => {
  const [userList, setUserList] = useState([]);
  const [acceptedUser, setAcceptedUser] = useState(null); // State to track the accepted user

  useEffect(() => {
    axios.get("http://localhost:4000/users")
      .then((response) => {
        const allUsers = response.data.userList;
        const riderUsers = allUsers.filter((user) => user.role === 'rider');
        setUserList(riderUsers);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleReject = (user) => {
    message.success("Rider successully deleted")
    const updatedUserList = userList.filter((u) => u._id !== user._id);
    setUserList(updatedUserList);
  
  };

  const handleAccept = (user) => {
    // Display a success message
    message.success(`Rider's permission has been accepted for ${user.fullName}`);
    // Set the accepted user in the state
    setAcceptedUser(user);
  };

  return (
    <div>
      <h1>Rider List</h1>
      <ol>
        {userList.map((user) => (
          <li key={user._id}>
            <div>
              <strong>Name:</strong> {user.fullName}
            </div>
            <div>
              <strong>Phone Number:</strong> {user.phoneNumber}
            </div>
            <div>
              <strong>Role:</strong> {user.role}
            </div>
            <div>
              <strong>License Number:</strong> {user.licenseNumber}
            </div>
            <div>
              <strong>Vehicle Number:</strong> {user.vehicleNumber}
            </div>
            <div>
              <strong>Vehicle Type:</strong> {user.vehicleType}
            </div>
            <div>
              <button onClick={() => handleAccept(user)}>Accept</button>
              <button onClick={() => handleReject(user)}>Reject</button>
            </div>
            {acceptedUser && acceptedUser._id === user._id && (
              <div>
                <p>Request accepted for {acceptedUser.fullName}</p>
              </div>
            )}
            <br/><br/>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Home;
