import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src','data', 'rate.json');
    console.log('File path:', filePath); // Log du chemin d'accès au fichier
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in API route:', error); // Log de l'erreur complète
    return new Response(JSON.stringify({ error: 'Failed to load data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


