import axios from 'axios';

const testRegistration = async () => {
  try {
    const response = await axios.post('http://localhost:5000/register', {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });
    console.log('Registration response:', response.data);
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
  }
};

testRegistration();
