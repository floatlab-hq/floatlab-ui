import { get, post, del } from './client'
import type { Notification } from '@/types/models'

export const listNotifications = () => get<Notification[]>('/notifications')
export const getNotification = (id: string) => get<Notification>(`/notifications/${id}`)
export const silenceNotification = (id: string, until: string) =>
  post<void>(`/notifications/${id}/silence`, { until })
export const resolveNotification = (id: string) =>
  post<void>(`/notifications/${id}/resolve`)
export const deleteNotification = (id: string) => del<void>(`/notifications/${id}`)
