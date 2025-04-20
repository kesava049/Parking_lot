import React from 'react';

function MainPage() {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div>
      <h1>Welcome to Parking Lot Main Page 🚗</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default MainPage;