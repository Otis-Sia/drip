import { supabase } from '../lib/supabase';
import fs from 'fs';

async function run() {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error(error);
    return;
  }
  fs.writeFileSync('scratch/all_products.json', JSON.stringify(data, null, 2));
}

run();
