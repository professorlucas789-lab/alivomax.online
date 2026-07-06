import { ShoppingCart, calculateShipping } from '../../src/utils/cart';

describe('ShoppingCart', () => {
  let cart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  describe('addItem', () => {
    test('should add a product to the cart', () => {
      const product = { id: 1, name: 'Widget', price: 29.99 };
      cart.addItem(product);

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0]).toEqual({
        id: 1,
        name: 'Widget',
        price: 29.99,
        quantity: 1,
      });
    });

    test('should add items with custom quantity', () => {
      const product = { id: 1, name: 'Widget', price: 29.99, quantity: 3 };
      cart.addItem(product);

      expect(cart.items[0].quantity).toBe(3);
    });

    test('should increment quantity if item already exists', () => {
      const product = { id: 1, name: 'Widget', price: 29.99 };
      cart.addItem(product);
      cart.addItem(product);

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].quantity).toBe(2);
    });

    test('should throw error for invalid product', () => {
      expect(() => cart.addItem(null)).toThrow('Invalid product');
      expect(() => cart.addItem({ name: 'No ID' })).toThrow('Invalid product');
      expect(() => cart.addItem({ id: 1, price: -10 })).toThrow('Invalid product');
      expect(() => cart.addItem({ id: 1, price: 0 })).toThrow('Invalid product');
    });
  });

  describe('removeItem', () => {
    test('should remove an item from the cart', () => {
      const product = { id: 1, name: 'Widget', price: 29.99 };
      cart.addItem(product);
      cart.removeItem(1);

      expect(cart.items).toHaveLength(0);
    });

    test('should not throw error when removing non-existent item', () => {
      expect(() => cart.removeItem(999)).not.toThrow();
    });
  });

  describe('updateItemQuantity', () => {
    test('should update item quantity', () => {
      const product = { id: 1, name: 'Widget', price: 29.99 };
      cart.addItem(product);
      cart.updateItemQuantity(1, 5);

      expect(cart.items[0].quantity).toBe(5);
    });

    test('should remove item when quantity is set to 0', () => {
      const product = { id: 1, name: 'Widget', price: 29.99 };
      cart.addItem(product);
      cart.updateItemQuantity(1, 0);

      expect(cart.items).toHaveLength(0);
    });

    test('should throw error for negative quantity', () => {
      const product = { id: 1, name: 'Widget', price: 29.99 };
      cart.addItem(product);

      expect(() => cart.updateItemQuantity(1, -5)).toThrow('Quantity cannot be negative');
    });

    test('should throw error if item not found', () => {
      expect(() => cart.updateItemQuantity(999, 5)).toThrow('Item not found in cart');
    });
  });

  describe('calculations', () => {
    beforeEach(() => {
      cart.addItem({ id: 1, name: 'Item1', price: 50 });
      cart.addItem({ id: 2, name: 'Item2', price: 30, quantity: 2 });
    });

    test('should calculate correct subtotal', () => {
      expect(cart.getSubtotal()).toBe(110); // 50 + (30 * 2)
    });

    test('should calculate correct tax', () => {
      expect(cart.getTax()).toBe(8.8); // 110 * 0.08
    });

    test('should calculate correct total', () => {
      expect(cart.getTotal()).toBe(118.8); // 110 + 8.8
    });

    test('should count total items correctly', () => {
      expect(cart.getItemCount()).toBe(3); // 1 + 2
    });
  });

  describe('discounts', () => {
    beforeEach(() => {
      cart.addItem({ id: 1, name: 'Item1', price: 100 });
    });

    test('should apply discount correctly', () => {
      cart.applyDiscount(10); // 10% discount
      const discountedTotal = cart.getDiscountedTotal();

      expect(discountedTotal).toBe(97.2); // (100 - 10) + tax on 90
    });

    test('should throw error for invalid discount', () => {
      expect(() => cart.applyDiscount(-5)).toThrow('Discount must be between 0 and 100');
      expect(() => cart.applyDiscount(150)).toThrow('Discount must be between 0 and 100');
    });

    test('should return regular total when no discount applied', () => {
      expect(cart.getDiscountedTotal()).toBe(cart.getTotal());
    });
  });

  describe('clear', () => {
    test('should empty the cart', () => {
      cart.addItem({ id: 1, name: 'Widget', price: 29.99 });
      cart.addItem({ id: 2, name: 'Gadget', price: 19.99 });
      cart.clear();

      expect(cart.items).toHaveLength(0);
      expect(cart.getSubtotal()).toBe(0);
    });
  });
});

describe('calculateShipping', () => {
  test('should return free shipping for orders over $100', () => {
    expect(calculateShipping(150, 10)).toBe(0);
    expect(calculateShipping(100, 10)).toBe(0);
  });

  test('should return standard shipping for orders under $100', () => {
    expect(calculateShipping(50, 10)).toBe(5);
  });

  test('should charge extra for heavy items', () => {
    expect(calculateShipping(50, 60)).toBe(15);
    expect(calculateShipping(50, 50)).toBe(15);
  });
});
