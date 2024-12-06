import React from 'react';
import jwt_decode from 'jwt-decode';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDljMDk5Mzk4NmJhZDFlNjc0ZGJkNSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzMzNDY4MjMwLCJleHAiOjE3MzM0NzE4MzB9.j10JFIXe2pz2WX6NWvNQ0wdOQknLG75VNK80ekDY9Zg'; // Replace with a real JWT
try {
  const decoded = jwt_decode(token);
  console.log('Decoded info:', decoded);  // Corrected the console.log statement
} catch (error) {
  console.error('Decoding error:', error);
}

const test4 = () => {
  return (
    <div>
      {/* Your component content */}
    </div>
  );
};

export default test4;
