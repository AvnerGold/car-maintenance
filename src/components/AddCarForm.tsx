'use client';

import React from 'react';
import { useCars } from '@/context/CarContext';

export function AddCarForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    mileage: 0,
  });
  const [error, setError] = React.useState('');
  const { createCar, isLoading } = useCars();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await createCar(formData);
      setFormData({ name: '', make: '', model: '', year: new Date().getFullYear(), mileage: 0 });
    } catch (err) {
      setError('Failed to add car');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-gray-300 rounded-lg bg-white text-gray-900">
      <h3 className="text-xl font-bold text-gray-900">Add New Car</h3>
      {error && <div className="text-red-600">{error}</div>}

      <input
        type="text"
        placeholder="Car Name (e.g., My Honda Civic)"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
      />

      <input
        type="text"
        placeholder="Make (e.g., Honda)"
        value={formData.make}
        onChange={(e) => setFormData({ ...formData, make: e.target.value })}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
      />

      <input
        type="text"
        placeholder="Model (e.g., Civic)"
        value={formData.model}
        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
      />

      <input
        type="number"
        placeholder="Year"
        value={formData.year}
        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
      />

      <input
        type="number"
        placeholder="Current Mileage"
        value={formData.mileage}
        onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
      >
        {isLoading ? 'Adding...' : 'Add Car'}
      </button>
    </form>
  );
}
