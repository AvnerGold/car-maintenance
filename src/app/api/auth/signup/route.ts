import { NextResponse } from 'next/server';

// Simulate a user database (in real app, use actual database)
const users: any[] = [
  {
    id: 'user123',
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
    createdAt: new Date(),
  },
];

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password, // In real app, hash this!
      name,
      createdAt: new Date(),
    };

    users.push(newUser);

    // Don't send password back
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      { user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Signup failed' },
      { status: 500 }
    );
  }
}
