import { fetcher } from '@web/lib/fetcher';
import { endpoints } from '@web/routes/endpoints';

import type { PurchaseOrder, Reservation } from '@booking/server/types';

export const purchaseService = {
  getReservation(id: string) {
    return fetcher<Reservation>(endpoints.booking.reservation(id), { method: 'GET' });
  },
  startCheckout(reservationId: string) {
    return fetcher<PurchaseOrder>(endpoints.booking.checkout(reservationId), { method: 'POST' });
  },
  getOrder(id: string) {
    return fetcher<PurchaseOrder>(endpoints.booking.order(id), { method: 'GET' });
  },
  listOrders() {
    return fetcher<PurchaseOrder[]>(endpoints.booking.orders, { method: 'GET' });
  },
  simulatePayment(id: string, outcome: 'approved' | 'declined' | 'expired') {
    return fetcher<PurchaseOrder>(endpoints.booking.simulatePayment(id), {
      method: 'POST',
      body: JSON.stringify({ outcome }),
    });
  },
  createReservation(input: { session_id: string; idempotency_key: string; full_quantity: number; half_quantity: number }) {
    return fetcher<Reservation>(endpoints.booking.reservations, {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },
};
