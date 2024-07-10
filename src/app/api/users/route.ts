// app/api/users/route.ts
import { getUsers } from '@/lib/userServices';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log(searchParams)
  
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  
  const { users, totalRecords } = await getUsers(limit, page, true);
  
  return NextResponse.json({ users, total: totalRecords });
}
