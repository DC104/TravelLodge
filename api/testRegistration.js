import axios from 'axios';

const testRegistration = async () => {
  try {
    const response = await axios.post('https://travellodge-3q9e.onrender.com/register', {
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
