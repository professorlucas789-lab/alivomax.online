// Shopping cart utilities
export class ShoppingCart {
  constructor() {
    this.items = [];
    this.taxRate = 0.08; // 8% tax rate
  }

  addItem(product) {
    if (!product || !product.id || !product.price || product.price <= 0) {
      throw new Error('Invalid product');
    }

    const existingItem = this.items.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += product.quantity || 1;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity || 1,
      });
    }
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
  }

  updateItemQuantity(productId, quantity) {
    if (quantity < 0) {
      throw new Error('Quantity cannot be negative');
    }

    const item = this.items.find(item => item.id === productId);
    if (!item) {
      throw new Error('Item not found in cart');
    }

    if (quantity === 0) {
      this.removeItem(productId);
    } else {
      item.quantity = quantity;
    }
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getTax() {
    return Number((this.getSubtotal() * this.taxRate).toFixed(2));
  }

  getTotal() {
    return Number((this.getSubtotal() + this.getTax()).toFixed(2));
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  clear() {
    this.items = [];
  }

  applyDiscount(discountPercent) {
    if (discountPercent < 0 || discountPercent > 100) {
      throw new Error('Discount must be between 0 and 100');
    }
    this.discount = discountPercent / 100;
  }

  getDiscountedTotal() {
    if (!this.discount) return this.getTotal();
    const discountAmount = this.getSubtotal() * this.discount;
    const discountedSubtotal = this.getSubtotal() - discountAmount;
    const tax = Number((discountedSubtotal * this.taxRate).toFixed(2));
    return Number((discountedSubtotal + tax).toFixed(2));
  }
}

export function calculateShipping(cartTotal, weight) {
  if (cartTotal >= 100) return 0; // Free shipping over $100
  if (weight > 50) return 15; // Heavy item
  return 5; // Standard shipping
}
