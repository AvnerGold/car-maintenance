'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCars } from '@/context/CarContext';
import { AddCarForm } from '@/components/AddCarForm';
import { AddMaintenanceForm } from '@/components/AddMaintenanceForm';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, logout, isLoading: authLoading } = useAuth();
  const { cars, selectedCar, selectCar, maintenanceTasks, getCarMaintenanceHistory } = useCars();
  const router = useRouter();

  React.useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const carHistory = selectedCar ? getCarMaintenanceHistory(selectedCar.id) : [];

  if (authLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Car Maintenance Tracker</h1>
            <p className="text-gray-600">Welcome, {user.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Add Car */}
          <div className="lg:col-span-1">
            <AddCarForm />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cars List */}
            <section className="text-gray-900">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Your Cars</h2>
              {cars.length === 0 ? (
                <p className="text-gray-600">No cars yet. Add one to get started!</p>
              ) : (
                <div className="space-y-2">
                  {cars.map(car => (
                    <button
                      key={car.id}
                      onClick={() => selectCar(car.id)}
                      className={`w-full text-left p-4 rounded-lg transition ${
                        selectedCar?.id === car.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-300 hover:border-blue-500 text-gray-900'
                      }`}
                    >
                      <h3 className="font-bold">{car.name}</h3>
                      <p className="text-sm">
                        {car.year} {car.make} {car.model} • {car.mileage} miles
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Add Maintenance */}
            {selectedCar && (
              <AddMaintenanceForm />
            )}

            {/* Maintenance History */}
            {selectedCar && (
              <section className="text-gray-900">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Maintenance History</h2>
                {carHistory.length === 0 ? (
                  <p className="text-gray-600">No maintenance records yet.</p>
                ) : (
                  <div className="space-y-3">
                    {carHistory.map(task => (
                      <div key={task.id} className="bg-white p-4 rounded-lg border border-gray-300 text-gray-900">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold capitalize text-gray-900">
                              {task.type.replace(/_/g, ' ')}
                            </h4>
                            <p className="text-gray-600">{task.description}</p>
                            <p className="text-sm text-gray-500 mt-2">
                              Mileage: {task.mileage} • Cost: ${task.cost}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            task.completed
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {task.completed ? 'Done' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
