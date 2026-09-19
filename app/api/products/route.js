import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'src/data/db.json');

function getDbData() {
  try {
    const fileData = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    return { products: [], orders: [] };
  }
}

function saveDbData(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET() {
  const data = getDbData();
  return NextResponse.json({ products: data.products || [] });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const data = getDbData();
    let products = data.products || [];

    if (body.id) {
      // Update existing product
      const index = products.findIndex(p => p.id === body.id);
      if (index !== -1) {
        products[index] = { ...products[index], ...body };
      } else {
        products.unshift(body);
      }
    } else {
      // Create new product
      const newProduct = {
        ...body,
        id: `p_${Date.now()}`,
        rating: body.rating || 5.0,
        reviewsCount: body.reviewsCount || 0
      };
      products.unshift(newProduct);
    }

    data.products = products;
    saveDbData(data);
    return NextResponse.json({ success: true, products: data.products });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 });
    }

    const data = getDbData();
    data.products = (data.products || []).filter(p => p.id !== id);
    saveDbData(data);
    
    return NextResponse.json({ success: true, products: data.products });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
