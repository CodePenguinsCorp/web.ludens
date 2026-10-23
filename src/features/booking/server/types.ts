export type Reservation = {
  id: string;
  session_id: string;
  show_title: string;
  starts_at: string;
  venue: string;
  full_quantity: number;
  half_quantity: number;
  full_price_cents: number;
  half_price_cents: number;
  total_cents: number;
  status: 'open' | 'confirmed' | 'expired' | 'cancelled';
  created_at: string;
  expires_at: string;
  server_now: string;
};

export type Ticket = {
  id: string;
  ticket_type: 'full' | 'half';
  price_cents: number;
  code: string;
  status: 'valid' | 'cancelled';
  is_demonstration: true;
};

export type PurchaseOrder = {
  id: string;
  reservation_id: string;
  session_id: string;
  show_title: string;
  session_starts_at: string;
  venue: string;
  full_quantity: number;
  half_quantity: number;
  full_price_cents: number;
  half_price_cents: number;
  amount_cents: number;
  status: 'pending' | 'paid' | 'declined' | 'expired' | 'cancelled';
  expires_at: string;
  resolved_at: string | null;
  tickets: Ticket[];
  is_demonstration: true;
};
