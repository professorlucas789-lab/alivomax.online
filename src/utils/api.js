// API utility functions
export async function fetchProducts(category = null) {
  const url = category ? `/api/products?category=${category}` : '/api/products';
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  return response.json();
}

export async function createOrder(orderData) {
  if (!orderData || !orderData.items || orderData.items.length === 0) {
    throw new Error('Order must contain at least one item');
  }

  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create order: ${response.statusText}`);
  }

  return response.json();
}

export async function getUserProfile(userId) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const response = await fetch(`/api/users/${userId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch user profile: ${response.statusText}`);
  }

  return response.json();
}

export async function processPayment(paymentInfo) {
  if (!paymentInfo || !paymentInfo.cardNumber || !paymentInfo.amount) {
    throw new Error('Invalid payment information');
  }

  const response = await fetch('/api/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentInfo),
  });

  if (!response.ok) {
    throw new Error(`Payment failed: ${response.statusText}`);
  }

  return response.json();
}
