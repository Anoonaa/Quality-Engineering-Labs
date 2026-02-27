/**
 * MerchantHub — Persistent JSON "Database" via localStorage
 * Shared data layer for wallet, products, cart, transactions, customers, and receipts.
 */

const FlashDB = (function () {
  const KEYS = {
    wallet: 'mhub_wallet',
    products: 'mhub_products',
    cart: 'mhub_cart',
    transactions: 'mhub_transactions',
    receipts: 'mhub_receipts',
    customers: 'mhub_customers',
    settings: 'mhub_settings',
    initialized: 'mhub_init',
  };

  // ===== DEFAULT PRODUCTS =====
  const DEFAULT_PRODUCTS = [
    { id: 'AIR-V5',   name: 'Vodacom Airtime R5',   category: 'airtime',   price: 5,   provider: 'Vodacom',     stock: 50, image: 'https://logo.clearbit.com/vodacom.co.za' },
    { id: 'AIR-V10',  name: 'Vodacom Airtime R10',  category: 'airtime',   price: 10,  provider: 'Vodacom',     stock: 40, image: 'https://logo.clearbit.com/vodacom.co.za' },
    { id: 'AIR-V29',  name: 'Vodacom Airtime R29',  category: 'airtime',   price: 29,  provider: 'Vodacom',     stock: 35, image: 'https://logo.clearbit.com/vodacom.co.za' },
    { id: 'AIR-V60',  name: 'Vodacom Airtime R60',  category: 'airtime',   price: 60,  provider: 'Vodacom',     stock: 20, image: 'https://logo.clearbit.com/vodacom.co.za' },
    { id: 'AIR-M10',  name: 'MTN Airtime R10',      category: 'airtime',   price: 10,  provider: 'MTN',         stock: 45, image: 'https://logo.clearbit.com/mtn.co.za' },
    { id: 'AIR-M30',  name: 'MTN Airtime R30',      category: 'airtime',   price: 30,  provider: 'MTN',         stock: 30, image: 'https://logo.clearbit.com/mtn.co.za' },
    { id: 'AIR-M55',  name: 'MTN Airtime R55',      category: 'airtime',   price: 55,  provider: 'MTN',         stock: 25, image: 'https://logo.clearbit.com/mtn.co.za' },
    { id: 'AIR-T10',  name: 'Telkom Airtime R10',   category: 'airtime',   price: 10,  provider: 'Telkom',      stock: 30, image: 'https://logo.clearbit.com/telkom.co.za' },
    { id: 'AIR-T30',  name: 'Telkom Airtime R30',   category: 'airtime',   price: 30,  provider: 'Telkom',      stock: 20, image: 'https://logo.clearbit.com/telkom.co.za' },
    { id: 'AIR-C15',  name: 'Cell C Airtime R15',   category: 'airtime',   price: 15,  provider: 'Cell C',      stock: 25, image: 'https://logo.clearbit.com/cellc.co.za' },
    { id: 'DAT-V1G',  name: 'Vodacom 1GB Data',     category: 'data',      price: 99,  provider: 'Vodacom',     stock: 30, image: 'https://logo.clearbit.com/vodacom.co.za' },
    { id: 'DAT-V3G',  name: 'Vodacom 3GB Data',     category: 'data',      price: 199, provider: 'Vodacom',     stock: 20, image: 'https://logo.clearbit.com/vodacom.co.za' },
    { id: 'DAT-M1G',  name: 'MTN 1GB Data',         category: 'data',      price: 89,  provider: 'MTN',         stock: 30, image: 'https://logo.clearbit.com/mtn.co.za' },
    { id: 'DAT-M5G',  name: 'MTN 5GB Data',         category: 'data',      price: 299, provider: 'MTN',         stock: 15, image: 'https://logo.clearbit.com/mtn.co.za' },
    { id: 'DAT-T2G',  name: 'Telkom 2GB Data',      category: 'data',      price: 120, provider: 'Telkom',      stock: 25, image: 'https://logo.clearbit.com/telkom.co.za' },
    { id: 'DAT-C1G',  name: 'Cell C 1GB Data',      category: 'data',      price: 79,  provider: 'Cell C',      stock: 20, image: 'https://logo.clearbit.com/cellc.co.za' },
    { id: '1V-10',    name: '1Voucher R10',   category: '1voucher',  price: 10,  provider: '1Voucher', stock: 50, image: 'https://ui-avatars.com/api/?name=1V&background=c9a96e&color=fff&size=80' },
    { id: '1V-20',    name: '1Voucher R20',   category: '1voucher',  price: 20,  provider: '1Voucher', stock: 50, image: 'https://ui-avatars.com/api/?name=1V&background=c9a96e&color=fff&size=80' },
    { id: '1V-50',    name: '1Voucher R50',   category: '1voucher',  price: 50,  provider: '1Voucher', stock: 40, image: 'https://ui-avatars.com/api/?name=1V&background=c9a96e&color=fff&size=80' },
    { id: '1V-100',   name: '1Voucher R100',  category: '1voucher',  price: 100, provider: '1Voucher', stock: 30, image: 'https://ui-avatars.com/api/?name=1V&background=c9a96e&color=fff&size=80' },
    { id: '1V-200',   name: '1Voucher R200',  category: '1voucher',  price: 200, provider: '1Voucher', stock: 20, image: 'https://ui-avatars.com/api/?name=1V&background=c9a96e&color=fff&size=80' },
    { id: 'ELC-50',   name: 'Electricity R50',  category: 'electricity', price: 50,  provider: 'Eskom', stock: 99, image: 'https://ui-avatars.com/api/?name=Eskom&background=d97706&color=fff&size=80' },
    { id: 'ELC-100',  name: 'Electricity R100', category: 'electricity', price: 100, provider: 'Eskom', stock: 99, image: 'https://ui-avatars.com/api/?name=Eskom&background=d97706&color=fff&size=80' },
    { id: 'ELC-200',  name: 'Electricity R200', category: 'electricity', price: 200, provider: 'Eskom', stock: 99, image: 'https://ui-avatars.com/api/?name=Eskom&background=d97706&color=fff&size=80' },
    { id: 'ELC-500',  name: 'Electricity R500', category: 'electricity', price: 500, provider: 'Eskom', stock: 99, image: 'https://ui-avatars.com/api/?name=Eskom&background=d97706&color=fff&size=80' },
    { id: 'GAM-PS150', name: 'PlayStation Store R150', category: 'gaming', price: 150, provider: 'PlayStation', stock: 15, image: 'https://logo.clearbit.com/playstation.com' },
    { id: 'GAM-PS300', name: 'PlayStation Store R300', category: 'gaming', price: 300, provider: 'PlayStation', stock: 10, image: 'https://logo.clearbit.com/playstation.com' },
    { id: 'GAM-STM',   name: 'Steam Wallet R100',     category: 'gaming', price: 100, provider: 'Steam',       stock: 20, image: 'https://logo.clearbit.com/steampowered.com' },
    { id: 'GAM-ROB',   name: 'Roblox R50',            category: 'gaming', price: 50,  provider: 'Roblox',      stock: 25, image: 'https://logo.clearbit.com/roblox.com' },
    { id: 'GAM-FF',    name: 'Free Fire R30',          category: 'gaming', price: 30,  provider: 'Free Fire',   stock: 30, image: 'https://ui-avatars.com/api/?name=FF&background=dc2626&color=fff&size=80' },
    { id: 'GAM-RAZ',   name: 'Razer Gold R100',       category: 'gaming', price: 100, provider: 'Razer',       stock: 15, image: 'https://logo.clearbit.com/razer.com' },
    { id: 'ENT-SHOW',  name: 'Showmax Monthly',           category: 'entertainment', price: 99,  provider: 'Showmax',         stock: 99, image: 'https://logo.clearbit.com/showmax.com' },
    { id: 'ENT-HWB50', name: 'Hollywoodbets R50 Voucher', category: 'entertainment', price: 50,  provider: 'Hollywoodbets',   stock: 30, image: 'https://logo.clearbit.com/hollywoodbets.net' },
    { id: 'ENT-BW100', name: 'Betway R100 Voucher',       category: 'entertainment', price: 100, provider: 'Betway',          stock: 20, image: 'https://logo.clearbit.com/betway.co.za' },
    { id: 'ENT-LOTTO', name: 'Lotto Ticket',              category: 'entertainment', price: 5,   provider: 'National Lottery', stock: 99, image: 'https://ui-avatars.com/api/?name=Lotto&background=059669&color=fff&size=80' },
  ];

  // ===== DEFAULT CUSTOMERS =====
  const DEFAULT_CUSTOMERS = [
    { id: 'CUS-001', name: 'Thabo Mokoena',   phone: '072 345 6789', email: 'thabo.m@email.co.za',   avatar: 'https://randomuser.me/api/portraits/men/32.jpg',   created: '2026-01-15T08:30:00Z', totalSpend: 2450, transactions: 12, notes: 'Regular customer, buys airtime weekly' },
    { id: 'CUS-002', name: 'Naledi Khumalo',   phone: '081 234 5678', email: 'naledi.k@email.co.za',  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',  created: '2026-01-20T10:15:00Z', totalSpend: 1890, transactions: 8,  notes: 'Prefers Vodacom products' },
    { id: 'CUS-003', name: 'Sipho Dlamini',    phone: '063 456 7890', email: 'sipho.d@email.co.za',   avatar: 'https://randomuser.me/api/portraits/men/67.jpg',   created: '2026-01-25T14:00:00Z', totalSpend: 3200, transactions: 15, notes: 'Business account, bulk purchases' },
    { id: 'CUS-004', name: 'Lindiwe Nkosi',    phone: '076 789 0123', email: 'lindiwe.n@email.co.za', avatar: 'https://randomuser.me/api/portraits/women/28.jpg',  created: '2026-02-01T09:45:00Z', totalSpend: 950,  transactions: 5,  notes: '' },
    { id: 'CUS-005', name: 'Bongani Zulu',     phone: '082 567 8901', email: 'bongani.z@email.co.za', avatar: 'https://randomuser.me/api/portraits/men/45.jpg',   created: '2026-02-05T11:20:00Z', totalSpend: 4100, transactions: 22, notes: 'VIP customer, gaming voucher enthusiast' },
    { id: 'CUS-006', name: 'Nomsa Mthembu',    phone: '071 890 1234', email: 'nomsa.m@email.co.za',   avatar: 'https://randomuser.me/api/portraits/women/55.jpg',  created: '2026-02-08T16:30:00Z', totalSpend: 680,  transactions: 3,  notes: 'New customer' },
    { id: 'CUS-007', name: 'Andile Naidoo',    phone: '084 123 4567', email: 'andile.n@email.co.za',  avatar: 'https://randomuser.me/api/portraits/men/22.jpg',   created: '2026-02-10T13:00:00Z', totalSpend: 5600, transactions: 28, notes: 'Merchant reseller, high volume' },
    { id: 'CUS-008', name: 'Zanele Mahlangu',  phone: '073 234 5678', email: 'zanele.m@email.co.za',  avatar: 'https://randomuser.me/api/portraits/women/19.jpg',  created: '2026-02-12T08:00:00Z', totalSpend: 1200, transactions: 7,  notes: 'Electricity tokens primarily' },
    { id: 'CUS-009', name: 'Mandla Sithole',   phone: '060 345 6789', email: 'mandla.s@email.co.za',  avatar: 'https://randomuser.me/api/portraits/men/55.jpg',   created: '2026-02-14T10:30:00Z', totalSpend: 320,  transactions: 2,  notes: '' },
    { id: 'CUS-010', name: 'Precious Ndlovu',  phone: '079 456 7890', email: 'precious.n@email.co.za',avatar: 'https://randomuser.me/api/portraits/women/63.jpg',  created: '2026-02-18T15:45:00Z', totalSpend: 1750, transactions: 10, notes: 'Monthly Showmax subscription' },
  ];

  // ===== DEFAULT SETTINGS =====
  const DEFAULT_SETTINGS = {
    storeName: 'My Merchant Store',
    ownerName: 'Admin User',
    email: 'admin@merchant.co.za',
    phone: '011 234 5678',
    address: '123 Main Road, Johannesburg, 2000',
    currency: 'ZAR',
    commissionRate: 5,
    taxRate: 15,
    theme: 'light',
    notifications: { email: true, sms: false, push: true },
  };

  // ===== HELPERS =====
  function _get(key) { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } }
  function _set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

  // ===== INIT =====
  function init() {
    if (!_get(KEYS.initialized)) {
      _set(KEYS.wallet, { balance: 5000 });
      _set(KEYS.products, DEFAULT_PRODUCTS);
      _set(KEYS.cart, []);
      _set(KEYS.transactions, []);
      _set(KEYS.receipts, []);
      _set(KEYS.customers, DEFAULT_CUSTOMERS);
      _set(KEYS.settings, DEFAULT_SETTINGS);
      _set(KEYS.initialized, true);
    }
  }
  init();

  // ===== WALLET =====
  function getWallet() { return _get(KEYS.wallet) || { balance: 5000 }; }
  function setWalletBalance(amount) { _set(KEYS.wallet, { balance: amount }); }
  function adjustWallet(delta) { const w = getWallet(); w.balance += delta; _set(KEYS.wallet, w); return w.balance; }

  // ===== PRODUCTS =====
  function getProducts() { return _get(KEYS.products) || []; }
  function getProductById(id) { return getProducts().find(p => p.id === id) || null; }
  function updateProductStock(id, delta) {
    const products = getProducts(); const p = products.find(x => x.id === id);
    if (p) { p.stock = Math.max(0, p.stock + delta); _set(KEYS.products, products); } return p;
  }

  // ===== CART =====
  function getCart() { return _get(KEYS.cart) || []; }
  function addToCart(productId, qty) {
    qty = qty || 1; const cart = getCart();
    const existing = cart.find(c => c.productId === productId);
    if (existing) { existing.qty += qty; }
    else { const product = getProductById(productId); if (!product) return null; cart.push({ productId: product.id, name: product.name, price: product.price, provider: product.provider, category: product.category, qty: qty }); }
    _set(KEYS.cart, cart); return getCart();
  }
  function removeFromCart(productId) { _set(KEYS.cart, getCart().filter(c => c.productId !== productId)); return getCart(); }
  function updateCartQty(productId, qty) {
    const cart = getCart(); const item = cart.find(c => c.productId === productId);
    if (item) { item.qty = Math.max(0, qty); if (item.qty === 0) return removeFromCart(productId); _set(KEYS.cart, cart); } return getCart();
  }
  function clearCart() { _set(KEYS.cart, []); }
  function getCartTotal() { return getCart().reduce((s, c) => s + c.price * c.qty, 0); }
  function getCartCount() { return getCart().reduce((s, c) => s + c.qty, 0); }

  // ===== TRANSACTIONS =====
  function getTransactions() { return _get(KEYS.transactions) || []; }
  function addTransaction(txn) {
    const txns = getTransactions();
    txn.id = txn.id || 'TXN-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    txn.timestamp = txn.timestamp || new Date().toISOString();
    txn.processed = txn.processed !== undefined ? txn.processed : false;
    txns.unshift(txn); _set(KEYS.transactions, txns); return txn;
  }
  function deleteTransaction(id) { _set(KEYS.transactions, getTransactions().filter(t => t.id !== id)); return getTransactions(); }
  function toggleTransactionProcessed(id) {
    const txns = getTransactions(); const t = txns.find(x => x.id === id);
    if (t) t.processed = !t.processed; _set(KEYS.transactions, txns); return txns;
  }

  // ===== RECEIPTS =====
  function getReceipts() { return _get(KEYS.receipts) || []; }
  function addReceipt(receipt) {
    const receipts = getReceipts();
    receipt.id = receipt.id || 'RCP-' + Date.now().toString(36).toUpperCase();
    receipt.timestamp = receipt.timestamp || new Date().toISOString();
    receipts.unshift(receipt); _set(KEYS.receipts, receipts); return receipt;
  }

  // ===== CUSTOMERS =====
  function getCustomers() { return _get(KEYS.customers) || []; }
  function getCustomerById(id) { return getCustomers().find(c => c.id === id) || null; }
  function addCustomer(data) {
    const customers = getCustomers();
    const cust = {
      id: 'CUS-' + Date.now().toString(36).toUpperCase(),
      name: data.name || '',
      phone: data.phone || '',
      email: data.email || '',
      avatar: data.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(data.name || 'U') + '&background=c9a96e&color=fff&size=80',
      created: new Date().toISOString(),
      totalSpend: 0,
      transactions: 0,
      notes: data.notes || '',
    };
    customers.unshift(cust); _set(KEYS.customers, customers); return cust;
  }
  function updateCustomer(id, data) {
    const customers = getCustomers(); const c = customers.find(x => x.id === id);
    if (c) { Object.assign(c, data); if (data.name && !data.avatar) c.avatar = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(data.name) + '&background=c9a96e&color=fff&size=80'; _set(KEYS.customers, customers); }
    return c;
  }
  function deleteCustomer(id) { _set(KEYS.customers, getCustomers().filter(c => c.id !== id)); return getCustomers(); }
  function recordCustomerPurchase(phone, amount) {
    const customers = getCustomers();
    const c = customers.find(x => x.phone.replace(/\s/g, '') === phone.replace(/\s/g, ''));
    if (c) { c.totalSpend += amount; c.transactions += 1; _set(KEYS.customers, customers); }
    return c;
  }

  // ===== SETTINGS =====
  function getSettings() { return _get(KEYS.settings) || DEFAULT_SETTINGS; }
  function updateSettings(data) { const s = getSettings(); Object.assign(s, data); _set(KEYS.settings, s); return s; }

  // ===== CHECKOUT =====
  function checkout() {
    const cart = getCart(); if (cart.length === 0) return { success: false, error: 'Cart is empty' };
    const total = getCartTotal(); const wallet = getWallet();
    if (wallet.balance < total) return { success: false, error: 'Insufficient wallet balance. You need R' + total.toFixed(2) + ' but only have R' + wallet.balance.toFixed(2) };
    adjustWallet(-total);
    const products = getProducts(); const lineItems = [];
    cart.forEach(item => {
      const p = products.find(x => x.id === item.productId);
      if (p) p.stock = Math.max(0, p.stock - item.qty);
      lineItems.push({ productId: item.productId, name: item.name, provider: item.provider, category: item.category, qty: item.qty, unitPrice: item.price, lineTotal: item.price * item.qty, voucherPin: _generatePin() });
    });
    _set(KEYS.products, products);
    const receipt = addReceipt({ ref: 'MH-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase(), items: lineItems, total: total, walletBefore: wallet.balance, walletAfter: wallet.balance - total });
    lineItems.forEach(item => { addTransaction({ description: 'Sold: ' + item.name + (item.qty > 1 ? ' x' + item.qty : ''), amount: item.lineTotal, type: 'sale', category: item.category, ref: receipt.ref }); });
    clearCart();
    return { success: true, receipt: receipt };
  }

  // ===== SELL SINGLE =====
  function sellProduct(data) {
    const amount = data.amount || 0;
    const receipt = addReceipt({
      ref: 'MH-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
      items: [{ name: data.productLabel || data.productType, provider: data.provider || '', category: data.productType, qty: 1, unitPrice: amount, lineTotal: amount,
        voucherPin: ['1voucher', 'gaming', 'entertainment'].includes(data.productType) ? _generatePin() : null,
        electricityToken: data.productType === 'electricity' ? _generateToken() : null }],
      total: amount, customerPhone: data.customerPhone, customerName: data.customerName,
      meterNumber: data.meterNumber, accountNumber: data.accountNumber, reference: data.reference,
    });
    addTransaction({ description: 'Sale: ' + (data.productLabel || data.productType) + ' — R' + amount, amount: amount, type: 'sale', category: data.productType, ref: receipt.ref });
    const commission = +(amount * 0.05).toFixed(2);
    adjustWallet(commission);
    if (data.customerPhone) recordCustomerPurchase(data.customerPhone, amount);
    receipt.commission = commission;
    return { success: true, receipt: receipt };
  }

  // ===== RESET =====
  function resetAll() { Object.values(KEYS).forEach(k => localStorage.removeItem(k)); init(); }

  // ===== HELPERS =====
  function _generatePin() { let pin = ''; for (let i = 0; i < 16; i++) { pin += Math.floor(Math.random() * 10); if (i === 3 || i === 7 || i === 11) pin += ' '; } return pin; }
  function _generateToken() { let t = ''; for (let i = 0; i < 20; i++) { t += Math.floor(Math.random() * 10); if (i === 3 || i === 7 || i === 11 || i === 15) t += ' '; } return t; }

  return {
    getWallet, setWalletBalance, adjustWallet,
    getProducts, getProductById, updateProductStock,
    getCart, addToCart, removeFromCart, updateCartQty, clearCart, getCartTotal, getCartCount,
    getTransactions, addTransaction, deleteTransaction, toggleTransactionProcessed,
    getReceipts, addReceipt,
    getCustomers, getCustomerById, addCustomer, updateCustomer, deleteCustomer, recordCustomerPurchase,
    getSettings, updateSettings,
    checkout, sellProduct, resetAll,
  };
})();
