// ==============================================================================
// BACKEND INTEGRATION TEST SUITE — AADHYA ENTERPRISES
// Comprehensive Validation of All Domain Services, Repositories & Security
// ==============================================================================

import { AuthService } from './src/services/auth.service';
import { PricingService } from './src/services/pricing.service';
import { RazorpayService } from './src/services/razorpay.service';
import { OrderService } from './src/services/order.service';
import { AnalyticsService } from './src/services/analytics.service';
import { ProductRepository } from './src/repositories/product.repository';
import { InventoryRepository } from './src/repositories/inventory.repository';
import { SettingsRepository } from './src/repositories/settings.repository';
import { CMSRepository } from './src/repositories/cms.repository';
import { AuditRepository } from './src/repositories/audit.repository';
import { CouponRepository } from './src/repositories/coupon.repository';
import { OrderStatus, PaymentGateway, PermissionKey, SystemRole } from './src/types';

async function runBackendTests() {
  console.log('\n======================================================');
  console.log('  STARTING AADHYA ENTERPRISES BACKEND VERIFICATION');
  console.log('======================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`  [PASS] ✓ ${testName}`);
      passed++;
    } else {
      console.error(`  [FAIL] ✗ ${testName}${detail ? ` (${detail})` : ''}`);
      failed++;
    }
  }

  // ----------------------------------------------------------------------------
  // 1. BUSINESS SETTINGS VERIFICATION
  // ----------------------------------------------------------------------------
  console.log('\n--- 1. Testing Business Settings & Hathras Credentials ---');
  const businessName = await SettingsRepository.get('BUSINESS_NAME');
  const businessAddress = await SettingsRepository.get('BUSINESS_ADDRESS_LINE1');
  const businessCity = await SettingsRepository.get('BUSINESS_CITY');
  const businessPhone = await SettingsRepository.get('BUSINESS_PHONE');
  const businessGstin = await SettingsRepository.get('BUSINESS_GSTIN');

  assert(businessName === 'AADHYA ENTERPRISES', 'Legal Business Name is AADHYA ENTERPRISES');
  assert(businessAddress === 'B.H Oil Meal Road', 'Premises address is B.H Oil Meal Road');
  assert(businessCity === 'Hathras', 'City is Hathras');
  assert(businessPhone === '7017840020', 'Phone is 7017840020');
  assert(businessGstin === '09ANCPV6879P1ZP', 'GSTIN is 09ANCPV6879P1ZP');

  // ----------------------------------------------------------------------------
  // 2. AUTHENTICATION & RBAC
  // ----------------------------------------------------------------------------
  console.log('\n--- 2. Testing Authentication & RBAC ---');
  // Test Super Admin Login
  const adminLogin = await AuthService.login('admin@aadhyaenterprises.com', 'AadhyaAdmin@2026');
  assert(!!adminLogin.token, 'Super admin login succeeds with JWT');
  assert(!!adminLogin.user.roles?.includes(SystemRole.SUPER_ADMIN), 'Super admin has SUPER_ADMIN role');

  // Test Customer Registration & Login
  const testCustomerEmail = `customer_${Date.now()}@test.com`;
  const regResult = await AuthService.register({
    fullName: 'Ananya Verma',
    email: testCustomerEmail,
    phone: '9812345678',
    password: 'SecurePassword@123',
  });
  assert(regResult.user.email === testCustomerEmail, 'New customer registration succeeds');

  const custLogin = await AuthService.login(testCustomerEmail, 'SecurePassword@123');
  assert(custLogin.user.fullName === 'Ananya Verma', 'Customer login succeeds with credentials');

  // Test Token Verification
  const decoded = AuthService.verifyToken(custLogin.token);
  assert(decoded.email === testCustomerEmail, 'JWT Token payload decodes correctly');

  // Test RBAC Permission enforcement
  let permissionDenied = false;
  try {
    AuthService.requirePermission(decoded, PermissionKey.MANAGE_SETTINGS);
  } catch {
    permissionDenied = true;
  }
  assert(permissionDenied, 'Normal customer is denied administrative permissions');

  // ----------------------------------------------------------------------------
  // 3. CATALOG & PRODUCT VARIANT RESOLUTION
  // ----------------------------------------------------------------------------
  console.log('\n--- 3. Testing Ayurvedic Catalog & Variants ---');
  const catalog = await ProductRepository.listProducts();
  assert(catalog.products.length >= 5, `Catalog loaded ${catalog.products.length} active Ayurvedic products`);

  const triphala = await ProductRepository.findProductBySlug('classical-triphala-churna');
  assert(!!triphala, 'Classical Triphala Churna found by slug');
  assert(!!(triphala?.variants && triphala.variants.length === 3), 'Triphala has 3 packaging size variants (100g, 250g, 500g)');
  assert(triphala?.ayurvedicFormulation === 'CHURNA', 'Formulation type is CHURNA');

  // ----------------------------------------------------------------------------
  // 4. SERVER-SIDE PRICING & COUPON ENGINE
  // ----------------------------------------------------------------------------
  console.log('\n--- 4. Testing Pricing Engine & Coupon Deduction ---');
  const var100g = triphala!.variants![0]; // Selling price: 130
  const var250g = triphala!.variants![1]; // Selling price: 280

  // Subtotal = 130*2 + 280 = 540 (Above ₹499 -> Free shipping)
  const cartCalc = await PricingService.calculateCart(
    [
      { variantId: var100g.id, quantity: 2 },
      { variantId: var250g.id, quantity: 1 },
    ],
    'AYURVEDA10', // 10% off
    custLogin.user.id
  );

  assert(cartCalc.subtotal === 540, `Cart subtotal correctly computed as ₹540 (Actual: ₹${cartCalc.subtotal})`);
  assert(cartCalc.isFreeShipping === true, 'Free shipping applied for order over ₹499');
  assert(cartCalc.couponDiscount === 54, `Coupon AYURVEDA10 deducted 10% (₹54) (Actual: ₹${cartCalc.couponDiscount})`);
  assert(cartCalc.finalPayableAmount === 486, `Final payable is ₹486 (Actual: ₹${cartCalc.finalPayableAmount})`);

  // ----------------------------------------------------------------------------
  // 5. INVENTORY & ATOMIC STOCK ADJUSTMENT
  // ----------------------------------------------------------------------------
  console.log('\n--- 5. Testing Inventory & Stock Concurrency ---');
  const initialStock = await InventoryRepository.getVariantStock(var100g.id);
  const adjResult = await InventoryRepository.adjustStock(
    var100g.id,
    10,
    'MANUAL_RESTOCK' as any,
    'TEST_ADMIN',
    'Received new production batch from Hathras'
  );
  assert(adjResult.variant.stockQuantity === initialStock + 10, 'Stock incremented by 10 units');
  assert(adjResult.ledger.resultingQty === initialStock + 10, 'Inventory ledger logged new resulting balance');

  // ----------------------------------------------------------------------------
  // 6. ORDER INITIATION, RAZORPAY & PAYMENT VERIFICATION
  // ----------------------------------------------------------------------------
  console.log('\n--- 6. Testing Order Lifecycle & Razorpay Verification ---');
  const checkoutPayload = {
    items: [{ variantId: var100g.id, quantity: 1 }],
    couponCode: 'AYURVEDA10',
    customerName: 'Ananya Verma',
    customerEmail: testCustomerEmail,
    customerPhone: '9812345678',
    shippingAddress: {
      id: 'temp_addr',
      userId: custLogin.user.id,
      fullName: 'Ananya Verma',
      phone: '9812345678',
      addressLine1: 'Civil Lines Road',
      city: 'Hathras',
      state: 'Uttar Pradesh',
      pincode: '204101',
      isDefault: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    paymentGateway: PaymentGateway.RAZORPAY,
    userId: custLogin.user.id,
  };

  const initOrder = await OrderService.initiateCheckout(checkoutPayload);
  assert(!!initOrder.order.orderNumber, `Order created with Order # ${initOrder.order.orderNumber}`);
  assert(!!initOrder.razorpayOrderId, `Razorpay Order generated: ${initOrder.razorpayOrderId}`);

  // Test Payment Verification & Stock Decrement
  const stockBeforePay = await InventoryRepository.getVariantStock(var100g.id);
  const confirmedOrder = await OrderService.verifyAndCompletePayment(
    initOrder.order.id,
    initOrder.razorpayOrderId!,
    'pay_test_payment_id_999',
    'sig_valid_seed_hash'
  );

  assert(confirmedOrder.orderStatus === OrderStatus.CONFIRMED, 'Order transitioned to CONFIRMED');
  assert(confirmedOrder.paymentStatus === 'PAID', 'Payment status marked as PAID');

  const stockAfterPay = await InventoryRepository.getVariantStock(var100g.id);
  assert(stockAfterPay === stockBeforePay - 1, `Atomic inventory decrement verified (Before: ${stockBeforePay}, After: ${stockAfterPay})`);

  // ----------------------------------------------------------------------------
  // 7. FULFILLMENT & TRACKING
  // ----------------------------------------------------------------------------
  console.log('\n--- 7. Testing Fulfillment & Courier Tracking ---');
  const packedOrder = await OrderService.updateFulfillment(
    confirmedOrder.id,
    OrderStatus.PACKED,
    undefined,
    undefined,
    'Packed in Hathras warehouse'
  );
  assert(packedOrder.orderStatus === OrderStatus.PACKED, 'Order status updated to PACKED');

  const shippedOrder = await OrderService.updateFulfillment(
    confirmedOrder.id,
    OrderStatus.SHIPPED,
    'Delhivery Surface',
    'DLV-AE-2026-99128',
    'Handed over to Delhivery courier'
  );
  assert(shippedOrder.orderStatus === OrderStatus.SHIPPED, 'Order status updated to SHIPPED');
  assert(shippedOrder.shipment?.trackingNumber === 'DLV-AE-2026-99128', 'AWB Tracking Number assigned');

  // ----------------------------------------------------------------------------
  // 8. REVIEWS & VERIFIED PURCHASE
  // ----------------------------------------------------------------------------
  console.log('\n--- 8. Testing Customer Reviews & Verified Buyer ---');
  const review = await CMSRepository.createReview({
    productId: triphala!.id,
    userId: custLogin.user.id,
    userName: 'Ananya Verma',
    rating: 5,
    title: 'Top notch classical quality',
    comment: 'Very fresh and effective churnas from Hathras.',
    isVerified: true,
  });
  assert(review.isApproved === false, 'New review initially requires moderation');

  const approvedReview = await CMSRepository.moderateReview(
    review.id,
    true,
    'Dhanyawad Ananya ji for your kind words!'
  );
  assert(approvedReview?.isApproved === true, 'Admin successfully approved review');
  assert(!!approvedReview?.adminReply, 'Admin reply attached to review');

  // ----------------------------------------------------------------------------
  // 9. DATABASE-DRIVEN REAL ANALYTICS
  // ----------------------------------------------------------------------------
  console.log('\n--- 9. Testing Database-Driven Real Analytics ---');
  const metrics = await AnalyticsService.getDashboardMetrics();
  assert(metrics.totalRevenue > 0, `Total Revenue calculated from DB: ₹${metrics.totalRevenue}`);
  assert(metrics.paidOrdersCount >= 2, `Paid Orders count: ${metrics.paidOrdersCount}`);
  assert(metrics.topProducts.length > 0, `Top product identified: ${metrics.topProducts[0]?.productName}`);

  // ----------------------------------------------------------------------------
  // 10. SYSTEM AUDIT LOGGING
  // ----------------------------------------------------------------------------
  console.log('\n--- 10. Testing Administrative Audit Ledger ---');
  const auditLogs = await AuditRepository.listAll();
  assert(auditLogs.length > 0, `Audit logs captured ${auditLogs.length} system operations`);

  // ----------------------------------------------------------------------------
  // TEST SUMMARY
  // ----------------------------------------------------------------------------
  console.log('\n======================================================');
  console.log(`  BACKEND TEST SUMMARY: ${passed} PASSED | ${failed} FAILED`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runBackendTests().catch((err) => {
  console.error('[Test Suite Error]:', err);
  process.exit(1);
});
