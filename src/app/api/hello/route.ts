import { NextResponse } from 'next/server';
//////////////////
// http://localhost:4554/api/hello
//////////////////

export async function GET(req: Request){
  return NextResponse.json({ message: 'Hello!' })
}