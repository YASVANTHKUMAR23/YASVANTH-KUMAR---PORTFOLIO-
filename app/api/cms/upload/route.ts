import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Helper to get admin client safely
function getAdminClient() {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
  // Using the secure server-only key (no NEXT_PUBLIC_ prefix)
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
  
  if (!url || !key) {
    throw new Error('Supabase URL or Service Role Key is missing');
  }
  
  return createClient(url, key);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const bucket = formData.get('bucket') as string || 'portfolio';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const supabaseAdmin = getAdminClient();

    // Convert file to ArrayBuffer then to Buffer for Supabase upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload to Supabase Storage using the ADMIN client (bypasses RLS)
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (error) {
      console.error('Supabase storage upload error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return NextResponse.json({ url: publicUrl });
  } catch (error: any) {
    console.error('Error handling upload:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      details: error.message || 'Unknown error' 
    }, { status: 500 });
  }
}
