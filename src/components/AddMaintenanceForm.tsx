'use client';

import React from 'react';
import { useCars } from '@/context/CarContext';
import { MaintenanceType } from '@/types';

export function AddMaintenanceForm() {
  const [formData, setFormData] = React.useState({
    type: 'oil_change' as MaintenanceType,
    description: '',
    cost: 0,
    mileage: 0,
    dueDate: '',
  });
  const [error, setError] = React.useState('');
  const { addMaintenanceTask, selectedCar, isLoading } = useCars();

  const maintenanceTypes: { value: MaintenanceType; label: string }[] = [
    { value: 'oil_change', label: 'Oil Change' },
    { value: 'tire_rotation', label: 'Tire Rotation' },
    { value: 'brake_pads', label: 'Brake Pads' },
    { value: 'air_filter', label: 'Air Filter' },
    { value: 'cabin_filter', label: 'Cabin Filter' },
    { value: 'battery', label: 'Battery' },
    { value: 'coolant', label: 'Coolant' },
    { value: 'transmission_fluid', label: 'Transmission Fluid' },
    { value: 'spark_plugs', label: 'Spark Plugs' },
    { value: 'inspection', label: 'Inspection' },
    { value: 'other', label: 'Other' },
  ];

  if (!selectedCar) {
    return <p className="text-gray-600">Please select a car first</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await addMaintenanceTask({
        carId: selectedCar.id,
        type: formData.type,
        description: formData.description,
        cost: formData.cost,
        mileage: formData.mileage,
        dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
        completed: false,
      });
      setFormData({
        type: 'oil_change',
        description: '',
        cost: 0,
        mileage: 0,
        dueDate: '',
      });
    } catch (err) {
      setError('Failed to add maintenance task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-gray-300 rounded-lg bg-white text-gray-900">
      <h3 className="text-xl font-bold text-gray-900">Add Maintenance Task</h3>
      {error && <div className="text-red-600">{error}</div>}

      <select
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value as MaintenanceType })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
      >
        {maintenanceTypes.map(type => (
          <option key={type.value} value={type.value}>{type.label}</option>
        ))}
      </select>

      <textarea
        placeholder="Description of maintenance (what was done, notes)"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
        rows={3}
      />

      <input
        type="number"
        placeholder="Cost ($)"
        value={formData.cost}
        onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) })}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
      />

      <input
        type="number"
        placeholder="Mileage at maintenance"
        value={formData.mileage}
        onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
      />

      <input
        type="date"
        placeholder="Due date for next maintenance"
        value={formData.dueDate}
        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-50"
      >
        {isLoading ? 'Adding...' : 'Add Maintenance'}
      </button>
    </form>
  );
}
