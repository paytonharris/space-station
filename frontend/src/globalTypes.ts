export interface Request {
  method: 'POST' | 'GET',
  event: 'scrap-metal-available' | 'scrap-metal-timeout' | 'scrap-metal-collected' | 'scrap-metal-update',
  amount?: number,
};