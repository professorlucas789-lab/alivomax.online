import { fetchProducts, createOrder, getUserProfile, processPayment } from '../../src/utils/api';

describe('API Integration Tests', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('fetchProducts', () => {
    test('should fetch all products', async () => {
      const mockProducts = [
        { id: 1, name: 'Product 1', price: 29.99 },
        { id: 2, name: 'Product 2', price: 39.99 },
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      });

      const result = await fetchProducts();

      expect(fetch).toHaveBeenCalledWith('/api/products');
      expect(result).toEqual(mockProducts);
    });

    test('should fetch products by category', async () => {
      const mockProducts = [
        { id: 1, name: 'Electronics', price: 99.99, category: 'electronics' },
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      });

      const result = await fetchProducts('electronics');

      expect(fetch).toHaveBeenCalledWith('/api/products?category=electronics');
      expect(result).toEqual(mockProducts);
    });

    test('should throw error on failed fetch', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(fetchProducts()).rejects.toThrow('Failed to fetch products: Not Found');
    });
  });

  describe('createOrder', () => {
    test('should create an order successfully', async () => {
      const orderData = {
        items: [{ productId: 1, quantity: 2 }],
        total: 59.98,
        userId: 123,
      };

      const mockResponse = {
        id: 456,
        ...orderData,
        status: 'confirmed',
        createdAt: '2024-01-01T00:00:00Z',
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await createOrder(orderData);

      expect(fetch).toHaveBeenCalledWith('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      expect(result).toEqual(mockResponse);
      expect(result.status).toBe('confirmed');
    });

    test('should throw error for empty order', async () => {
      await expect(createOrder({ items: [] })).rejects.toThrow('Order must contain at least one item');
    });

    test('should throw error for null order', async () => {
      await expect(createOrder(null)).rejects.toThrow('Order must contain at least one item');
    });

    test('should throw error on failed order creation', async () => {
      const orderData = { items: [{ productId: 1, quantity: 1 }] };

      fetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error',
      });

      await expect(createOrder(orderData)).rejects.toThrow('Failed to create order');
    });
  });

  describe('getUserProfile', () => {
    test('should fetch user profile', async () => {
      const mockUser = {
        id: 123,
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: '2024-01-01T00:00:00Z',
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      });

      const result = await getUserProfile(123);

      expect(fetch).toHaveBeenCalledWith('/api/users/123');
      expect(result).toEqual(mockUser);
    });

    test('should throw error without userId', async () => {
      await expect(getUserProfile(null)).rejects.toThrow('User ID is required');
      await expect(getUserProfile(undefined)).rejects.toThrow('User ID is required');
    });

    test('should throw error on failed fetch', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(getUserProfile(999)).rejects.toThrow('Failed to fetch user profile');
    });
  });

  describe('processPayment', () => {
    test('should process payment successfully', async () => {
      const paymentInfo = {
        cardNumber: '4532015112830366',
        amount: 99.99,
        cvv: '123',
        expiryDate: '12/25',
      };

      const mockResponse = {
        transactionId: 'txn_12345',
        status: 'success',
        amount: 99.99,
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await processPayment(paymentInfo);

      expect(fetch).toHaveBeenCalledWith('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentInfo),
      });
      expect(result.status).toBe('success');
      expect(result.transactionId).toBe('txn_12345');
    });

    test('should throw error for invalid payment info', async () => {
      await expect(processPayment(null)).rejects.toThrow('Invalid payment information');
      await expect(processPayment({})).rejects.toThrow('Invalid payment information');
      await expect(processPayment({ cardNumber: '123' })).rejects.toThrow('Invalid payment information');
    });

    test('should throw error on payment failure', async () => {
      const paymentInfo = {
        cardNumber: '4532015112830366',
        amount: 99.99,
      };

      fetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Payment Declined',
      });

      await expect(processPayment(paymentInfo)).rejects.toThrow('Payment failed');
    });
  });
});
