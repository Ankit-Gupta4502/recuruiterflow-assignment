

class OrderService {
    private static serviceInstance: OrderService
    private static orders: [] = []

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
            
            return { error: null, data: OrderService.orders }
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