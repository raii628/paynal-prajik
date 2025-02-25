import axios from 'axios'
import { FC, FormEvent, useEffect, useState } from 'react'
import './App.css'

interface Guest {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  contact_number: string;
  role: 'regular' | 'vip';
  created_at?: string;
  updated_at?: string;
}

const App: FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    contact_number: '',
    role: 'regular',
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/booking/guests`);
        setGuests(response.data);
        setError(null);
      } catch (error) {
        console.error(`Error: ${error}`);
        setError('An error occurred while fetching guests.');
      }
    }
    fetchGuests();
  }, []);

  const createGuest = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<Guest>(`${import.meta.env.VITE_API_URL}/booking/guests`, formData);
      setGuests([...guests, response.data]);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        contact_number: '',
        role: 'regular',
      });
      setError(null);
    } catch (error) {
      console.error(`Error: ${error}`);
      setError('An error occurred while creating a guest.');
    }
  }

  return (
    <div>
      <h1 className='border text-2xl'>Guests</h1>
      <h2>Create New Guest</h2>
      <form onSubmit={createGuest}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="first_name" value={formData.first_name} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="last_name" value={formData.last_name} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <textarea id="address" name="address" value={formData.address} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="contactNumber">Contact Number:</label>
          <input type="text" id="contactNumber" name="contact_number" value={formData.contact_number} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select id="role" name="role" value={formData.role} onChange={handleInputChange}>
            <option value="regular">Regular</option>
            <option value="vip">VIP</option>
          </select>
        </div>
        <button type="submit" className='text-2xl cursor-pointer border'>Create</button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <h2>Guest List</h2>
      <ul>
        {guests.map(guest => (
          <li key={guest.id}>
            {guest.first_name} {guest.last_name} - Email: {guest.email} (Role: {guest.role})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
