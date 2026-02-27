import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

export const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-eea9c73f`;

export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${serverUrl}${endpoint}`;
  const headers = {
    ...options.headers,
  };
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'API call failed');
  }
  
  return data;
}
