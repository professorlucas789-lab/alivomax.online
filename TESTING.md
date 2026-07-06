# Testing Guide - Alivomax Online

## Overview

This document provides comprehensive guidelines for testing the Alivomax ecommerce application. Our testing strategy covers unit tests, integration tests, and end-to-end tests to ensure code quality and reliability.

## Test Structure

```
tests/
├── unit/              # Unit tests for individual functions/classes
│   ├── validation.test.js
│   ├── cart.test.js
│   └── ...
├── integration/       # Integration tests for API interactions
│   ├── api.test.js
│   └── ...
├── e2e/               # End-to-end tests for user workflows
│   └── checkout.spec.js
└── setup.js          # Jest configuration and global mocks
```

## Test Coverage Goals

| Category | Minimum Coverage | Target Coverage |
|----------|------------------|-----------------|
| Overall | 70% | 80%+ |
| Utilities | 75% | 90%+ |
| Components | 70% | 85%+ |
| API Routes | 80% | 90%+ |
| Critical Paths* | 85% | 95%+ |

*Critical paths: Payment processing, authentication, checkout

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode (for development)
```bash
npm run test:watch
```

### Generate Coverage Report
```bash
npm run test:coverage
```

### Unit Tests Only
```bash
npm run test:unit
```

### Integration Tests Only
```bash
npm run test:integration
```

### End-to-End Tests
```bash
npm run test:e2e
```

## Testing Patterns

### 1. Unit Testing

Unit tests focus on testing individual functions and classes in isolation.

**Example: Validation Tests**
```javascript
describe('Email Validation', () => {
  test('should accept valid emails', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });

  test('should reject invalid emails', () => {
    expect(isValidEmail('invalid.email')).toBe(false);
  });
});
```

**Best Practices:**
- Test one thing per test
- Use descriptive test names that explain the expected behavior
- Test both success and failure cases
- Test edge cases (empty strings, null, negative numbers, etc.)
- Keep tests small and focused

### 2. Integration Testing

Integration tests verify that multiple components work together correctly, especially API interactions.

**Example: API Integration Test**
```javascript
describe('API Integration Tests', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('should create an order successfully', async () => {
    const orderData = { items: [{ productId: 1, quantity: 2 }] };
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 456, ...orderData }),
    });

    const result = await createOrder(orderData);
    expect(result.id).toBe(456);
  });
});
```

**Best Practices:**
- Mock external dependencies (API calls, database queries)
- Test data flow between components
- Test error scenarios and API failures
- Verify correct HTTP methods and headers are used

### 3. End-to-End Testing (Playwright)

E2E tests simulate real user interactions with the application.

**Example: Checkout Flow Test**
```javascript
test('should complete checkout flow', async ({ page }) => {
  // Navigate to product page
  await page.goto('http://localhost:3000/products/1');
  
  // Add to cart
  await page.click('[data-testid="add-to-cart"]');
  expect(page.locator('[data-testid="cart-count"]')).toContainText('1');
  
  // Go to checkout
  await page.click('[data-testid="checkout-btn"]');
  
  // Fill form
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="cardNumber"]', '4532015112830366');
  
  // Submit
  await page.click('[data-testid="submit-payment"]');
  
  // Verify success
  expect(page.locator('[data-testid="order-success"]')).toBeVisible();
});
```

**Best Practices:**
- Use data-testid attributes for element selection
- Test complete user workflows
- Test on different screen sizes
- Verify visual feedback (loading states, success messages)
- Clean up test data after each test

## Mocking Strategies

### Mocking fetch (API calls)
```javascript
global.fetch = jest.fn()
  .mockResolvedValueOnce({
    ok: true,
    json: async () => ({ data: 'response' }),
  });
```

### Mocking localStorage
```javascript
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;
```

### Mocking Functions
```javascript
const mockFunction = jest.fn();
mockFunction.mockReturnValue('mocked value');
mockFunction.mockImplementation((x) => x * 2);
```

## Critical Path Testing

Focus on these high-risk areas with high coverage:

### 1. Authentication Flow
- [ ] User registration validation
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Token storage and retrieval
- [ ] Logout functionality
- [ ] Password reset flow

### 2. Payment Processing
- [ ] Card validation
- [ ] Payment submission
- [ ] Payment failure handling
- [ ] Transaction ID tracking
- [ ] Receipt generation
- [ ] Refund processing

### 3. Checkout Flow
- [ ] Add items to cart
- [ ] Update cart quantities
- [ ] Apply discount codes
- [ ] Calculate shipping
- [ ] Fill billing/shipping address
- [ ] Place order
- [ ] Order confirmation

### 4. Product Search & Catalog
- [ ] Search products by keyword
- [ ] Filter by category
- [ ] Filter by price range
- [ ] Sort results
- [ ] Pagination
- [ ] Product detail loading

## Code Coverage Analysis

Current coverage can be viewed in two ways:

### Terminal Report
```bash
npm run test:coverage
```

### HTML Report
```bash
npm run test:coverage:report
```

This opens an HTML dashboard showing:
- Overall coverage percentage
- File-by-file coverage
- Uncovered lines
- Branch coverage

## Best Practices

### 1. Naming Conventions
- Test files: `<module>.test.js`
- Describe blocks: Use feature description
- Test cases: Start with "should" (e.g., "should validate email format")

### 2. Organize Tests
```javascript
describe('Feature Name', () => {
  describe('Sub-feature', () => {
    test('should do something', () => {
      // test code
    });
  });
});
```

### 3. Setup and Teardown
```javascript
beforeEach(() => {
  // Reset state before each test
});

afterEach(() => {
  // Clean up after each test
});

beforeAll(() => {
  // One-time setup
});

afterAll(() => {
  // One-time cleanup
});
```

### 4. Assertions
```javascript
// Use clear, specific assertions
expect(result).toBe(true);
expect(result).toEqual({ id: 1, name: 'Test' });
expect(result).toContain('expected string');
expect(result).toHaveLength(3);
expect(result).toThrow('error message');
expect(result).toHaveBeenCalledWith(arg1, arg2);
```

### 5. Async Testing
```javascript
test('should handle async operations', async () => {
  const result = await fetchData();
  expect(result).toBeDefined();
});

test('should handle promises', () => {
  return fetchData().then(result => {
    expect(result).toBeDefined();
  });
});
```

## Common Issues & Solutions

### Issue: Tests timeout
**Solution:** Increase timeout for slow tests
```javascript
test('slow operation', async () => {
  // test code
}, 10000); // 10 second timeout
```

### Issue: Mock not working
**Solution:** Clear mocks between tests
```javascript
beforeEach(() => {
  jest.clearAllMocks();
});
```

### Issue: Async test doesn't wait
**Solution:** Use async/await or return promise
```javascript
test('async test', async () => {
  await expect(promise).resolves.toBeDefined();
});
```

## Continuous Integration

Tests should run automatically on:
- Every push to feature branches
- Every pull request
- Before merge to main
- Nightly full test runs

Minimum requirements for merging:
- All tests passing
- ≥70% code coverage
- ≥90% coverage for critical paths
- No console errors/warnings

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [Playwright Documentation](https://playwright.dev/)

## Questions or Issues?

For testing-related questions or issues:
1. Check this guide and existing test examples
2. Review similar tests in the codebase
3. Consult official documentation
4. Ask the team in code reviews
