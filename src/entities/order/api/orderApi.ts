import { baseApi } from '@/shared/api/baseApi';

import type { CreateOrderPayload, Order } from '../model/types';

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, CreateOrderPayload>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),

    getOrder: builder.query<Order, string>({
      query: (orderId) => `/orders/${orderId}`,
      providesTags: (_result, _error, orderId) => [{ type: 'Order', id: orderId }],
    }),

    payOrder: builder.mutation<Order, string>({
      query: (orderId) => ({
        url: `/orders/${orderId}/pay`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, orderId) => [{ type: 'Order', id: orderId }],
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderQuery, usePayOrderMutation } = orderApi;
