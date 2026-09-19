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
  return NextResponse.json({ orders: data.orders || [] });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const data = getDbData();
    let orders = data.orders || [];

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      ...body,
      id: orderId,
      paymentStatus: body.paymentMethod === 'Cash on Delivery (COD)' ? 'Pending' : 'Paid',
      orderStatus: 'Processing',
      createdAt: new Date().toISOString()
    };

    orders.unshift(newOrder);
    data.orders = orders;
    saveDbData(data);

    return NextResponse.json({ success: true, order: newOrder });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, orderStatus } = await request.json();
    const data = getDbData();
    let orders = data.orders || [];

    const idx = orders.findIndex(o => o.id === id);
    if (idx !== -1) {
      orders[idx].orderStatus = orderStatus;
      data.orders = orders;
      saveDbData(data);
      return NextResponse.json({ success: true, order: orders[idx] });
    }

    return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
