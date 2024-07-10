// app/api/users/route.ts
import { getUsers } from '@/lib/userServices';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
  
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  
    const users = await getUsers(limit, page);
  return NextResponse.json({ users, total: 100 }); // Asegúrate de retornar también el total de registros
}
