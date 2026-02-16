import { NextResponse } from 'next/server';

// Simulate a cars database
const cars: any[] = [];

export async function POST(request: Request) {
  try {
    const { userId, name, make, model, year, mileage } = await request.json();

    const newCar = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      name,
      make,
      model,
      year,
      mileage,
      createdAt: new Date(),
    };

    cars.push(newCar);

    return NextResponse.json(newCar, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create car' },
      { status: 500 }
    );
  }
}
