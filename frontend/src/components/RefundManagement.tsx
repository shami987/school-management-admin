import React, { useState, useEffect } from 'react';
import { Check, X, DollarSign } from 'lucide-react';
import { getAllRefunds, approveRefund, rejectRefund, Refund } from '../services/refundService';

const RefundManagement: React.FC = () => {
  const [refunds, setRefunds] = useState<Refund[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    loadRefunds();
  }, [filter]);

  const loadRefunds = async () => {
    try {
      const data = await getAllRefunds(filter || undefined);
      setRefunds(data);
    } catch (error) {
      console.error('Failed to load refunds:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      await approveRefund(id);
      await loadRefunds();
    } catch (error) {
      console.error('Failed to approve refund:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    setActionLoading(id);
    try {
      await rejectRefund(id);
      await loadRefunds();
    } catch (error) {
      console.error('Failed to reject refund:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Refund Management</h1>
        <div className="flex items-center text-sm text-gray-600">
          <DollarSign className="h-5 w-5 mr-2" />
          {refunds.length} Refunds
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Filter Refunds</h3>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        >
          <option value="">All Refunds</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* Refunds Table */}
      {refunds.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Refunds Found</h3>
          <p className="text-gray-600">No refund requests match the current filter.</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {refunds.map((refund) => (
                <tr key={refund.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {refund.student?.firstName || 'N/A'} {refund.student?.lastName || ''}
                      </div>
                      <div className="text-sm text-gray-500">{refund.student?.class?.name || 'N/A'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${Number(refund.amount || 0).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                    {refund.reason || 'No reason provided'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(refund.status)}`}>
                      {refund.status || 'UNKNOWN'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {refund.requestDate ? new Date(refund.requestDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {refund.status === 'PENDING' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApprove(refund.id)}
                          disabled={actionLoading === refund.id}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(refund.id)}
                          disabled={actionLoading === refund.id}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-400"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </button>
                      </div>
                    )}
                    {refund.status !== 'PENDING' && (
                      <span className="text-gray-400">
                        {refund.processedDate && `Processed ${new Date(refund.processedDate).toLocaleDateString()}`}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RefundManagement;