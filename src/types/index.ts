// User authentication types
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

// Car types
export interface Car {
  id: string;
  userId: string;
  name: string; // e.g., "Honda Civic 2020"
  make: string; // e.g., "Honda"
  model: string; // e.g., "Civic"
  year: number;
  mileage: number; // Current mileage in km/miles
  createdAt: Date;
}

// Maintenance types
export interface MaintenanceTask {
  id: string;
  carId: string;
  userId: string;
  type: MaintenanceType;
  description: string; // Details about what was done
  cost: number;
  mileage: number; // Mileage when maintenance was done
  dueDate?: Date; // When next maintenance is due
  completed: boolean;
  completedDate?: Date;
  createdAt: Date;
}

export type MaintenanceType =
  | "oil_change"
  | "tire_rotation"
  | "brake_pads"
  | "air_filter"
  | "cabin_filter"
  | "battery"
  | "coolant"
  | "transmission_fluid"
  | "spark_plugs"
  | "inspection"
  | "other";

// Auth context types
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Car context types
export interface CarContextType {
  cars: Car[];
  selectedCar: Car | null;
  maintenanceTasks: MaintenanceTask[];
  isLoading: boolean;
  createCar: (carData: Omit<Car, "id" | "userId" | "createdAt">) => Promise<void>;
  deleteCar: (carId: string) => Promise<void>;
  selectCar: (carId: string) => void;
  addMaintenanceTask: (task: Omit<MaintenanceTask, "id" | "userId" | "createdAt">) => Promise<void>;
  updateMaintenanceTask: (taskId: string, updates: Partial<MaintenanceTask>) => Promise<void>;
  deleteMaintenanceTask: (taskId: string) => Promise<void>;
  getCarMaintenanceHistory: (carId: string) => MaintenanceTask[];
}
