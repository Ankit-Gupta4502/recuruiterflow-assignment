import { supabase } from "~/supabase"
import { type Response } from "~/shared-types/ApiResponse"

export interface Order {
    id: string
    receiver: string
    weight_kg: number
    color: string | null
    country: string
    shipping_cost: number
    currency: string
    created_at: string
}

class OrderService {
    private static serviceInstance: OrderService

    getInstance() {
        if (OrderService.serviceInstance) {
            return OrderService.serviceInstance
        } else {
            OrderService.serviceInstance = new OrderService()
            return OrderService.serviceInstance
        }
    }

    async getShippingOrders() {
        try {
            const data = await supabase.from("orders").select() as Response<Order[]>
            return { error: null, data }
        } catch (error) {
            return { error, data: null }
        }

    }


    async addShippingOrder() {
        try {

        } catch (error) {
            return { error, data: null }
        }
    }


}

export default new OrderService().getInstance()