import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ShippingOrderServices, {
  type Order,
} from "~/services/ShippingOrderServices";
import Table, { type Column } from "~/components/ui/Table";

const columns: Column<Order>[] = [
  {
    key: "receiver",
    label: "Receiver",
    accessor: (order) => order.receiver,
  },
  {
    key: "country",
    label: "Country",
    accessor: (order) => order.country,
  },
  {
    key: "weight_kg",
    label: "Weight (kg)",
    accessor: (order) => order.weight_kg,
  },
  {
    key: "color",
    label: "Color",
    accessor: (order) =>
      order.color ? (
        <div
          className=" size-6 rounded-full"
          style={{ background: order.color }}
        />
      ) : (
        "-"
      ),
  },
  {
    key: "shipping_cost",
    label: "Shipping Cost",
    accessor: (order) => `${order.currency} ${order.shipping_cost}`,
  },
  {
    key: "created_at",
    label: "Created At",
    accessor: (order) => new Date(order.created_at).toLocaleDateString(),
  },
];

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    current: { getShippingOrders },
  } = useRef(ShippingOrderServices);
  useEffect(() => {
    (async () => {
      const { data, error } = await getShippingOrders();
      if (error) {
        toast.error("Oops! Something went wrong");
        console.error(error, "error in getting orders");
      } else {
        setOrders(data?.data || []);
      }
      setIsLoading(false);
    })();
  }, []);
  return (
    <Table
      data={orders}
      columns={columns}
      isLoading={isLoading}
      getRowId={(order) => order.id}
    />
  );
};

export default Orders;
