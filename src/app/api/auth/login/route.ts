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
    const { email, password } = await request.json();

    // Find user by email and password
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Don't send password back
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { user: userWithoutPassword },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
