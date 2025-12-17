import React from 'react'

const Orders = () => {
  return (
<div className="max-w-6xl mx-auto mt-6 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
  <table className="w-full table-fixed text-sm">
    <thead className="bg-gray-50 border-b border-b-gray-200">
      <tr>
        <th className="px-4 py-3 text-left font-medium text-gray-600">
          Name
        </th>
        <th className="px-4 py-3 text-left font-medium text-gray-600">
          Orders
        </th>
      </tr>
    </thead>

    <tbody className="divide-y  divide-gray-200  ">
      <tr className="hover:bg-gray-50 transition">
        <td className="px-4 py-3 text-gray-700">
          fii
        </td>
        <td className="px-4 py-3 text-gray-700">
          figidg
        </td>
      </tr>
    </tbody>
  </table>
</div>

  )
}

export default Orders