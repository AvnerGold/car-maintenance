import { NextResponse } from 'next/server';

// Simulate a maintenance database
const maintenanceTasks: any[] = [];

export async function POST(request: Request) {
  try {
    const { userId, carId, type, description, cost, mileage, dueDate, completed } = await request.json();

    const newTask = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      carId,
      type,
      description,
      cost,
      mileage,
      dueDate,
      completed: completed || false,
      completedDate: completed ? new Date() : undefined,
      createdAt: new Date(),
    };

    maintenanceTasks.push(newTask);

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create maintenance task' },
      { status: 500 }
    );
  }
}
