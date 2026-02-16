'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CarContextType, Car, MaintenanceTask } from '@/types';
import { useAuth } from './AuthContext';

const CarContext = createContext<CarContextType | undefined>(undefined);

export function CarProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Create a new car
  const createCar = useCallback(async (carData: Omit<Car, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) throw new Error('User not authenticated');
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/cars/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...carData, userId: user.id }),
      });
      
      if (!response.ok) throw new Error('Failed to create car');
      
      const newCar = await response.json();
      setCars([...cars, newCar]);
    } catch (error) {
      console.error('Create car error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [user, cars]);

  // Delete a car
  const deleteCar = useCallback(async (carId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/cars/${carId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete car');
      
      setCars(cars.filter(car => car.id !== carId));
      if (selectedCar?.id === carId) setSelectedCar(null);
    } catch (error) {
      console.error('Delete car error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [cars, selectedCar]);

  // Select a car
  const selectCar = useCallback((carId: string) => {
    const car = cars.find(c => c.id === carId);
    setSelectedCar(car || null);
  }, [cars]);

  // Add maintenance task
  const addMaintenanceTask = useCallback(async (task: Omit<MaintenanceTask, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) throw new Error('User not authenticated');
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/maintenance/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, userId: user.id }),
      });
      
      if (!response.ok) throw new Error('Failed to create maintenance task');
      
      const newTask = await response.json();
      setMaintenanceTasks([...maintenanceTasks, newTask]);
    } catch (error) {
      console.error('Create maintenance task error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [user, maintenanceTasks]);

  // Update maintenance task
  const updateMaintenanceTask = useCallback(async (taskId: string, updates: Partial<MaintenanceTask>) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/maintenance/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) throw new Error('Failed to update maintenance task');
      
      const updatedTask = await response.json();
      setMaintenanceTasks(maintenanceTasks.map(t => t.id === taskId ? updatedTask : t));
    } catch (error) {
      console.error('Update maintenance task error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [maintenanceTasks]);

  // Delete maintenance task
  const deleteMaintenanceTask = useCallback(async (taskId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/maintenance/${taskId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete maintenance task');
      
      setMaintenanceTasks(maintenanceTasks.filter(t => t.id !== taskId));
    } catch (error) {
      console.error('Delete maintenance task error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [maintenanceTasks]);

  // Get maintenance history for a car
  const getCarMaintenanceHistory = useCallback((carId: string) => {
    return maintenanceTasks.filter(task => task.carId === carId);
  }, [maintenanceTasks]);

  const value: CarContextType = {
    cars,
    selectedCar,
    maintenanceTasks,
    isLoading,
    createCar,
    deleteCar,
    selectCar,
    addMaintenanceTask,
    updateMaintenanceTask,
    deleteMaintenanceTask,
    getCarMaintenanceHistory,
  };

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
}

export function useCars() {
  const context = useContext(CarContext);
  if (context === undefined) {
    throw new Error('useCars must be used within a CarProvider');
  }
  return context;
}
