import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock inquiries data
const mockInquiries = [
  {
    id: 'INQ-001',
    customerName: 'Rajesh Kumar',
    customerEmail: 'rajesh@example.com',
    subject: 'Custom frame sizing inquiry',
    message: 'I need a custom frame for a 24x36 inch artwork. What are the pricing options?',
    date: '2024-01-15',
    status: 'new'
  },
  {
    id: 'INQ-002',
    customerName: 'Priya Sharma',
    customerEmail: 'priya@example.com',
    subject: 'Bulk order discount',
    message: 'I am interested in ordering 20 frames for my gallery. Do you offer bulk discounts?',
    date: '2024-01-14',
    status: 'responded'
  },
  {
    id: 'INQ-003',
    customerName: 'Arjun Patel',
    customerEmail: 'arjun@example.com',
    subject: 'Frame repair service',
    message: 'Do you provide repair services for damaged frames? I have an antique frame that needs restoration.',
    date: '2024-01-13',
    status: 'in_progress'
  },
  {
    id: 'INQ-004',
    customerName: 'Meera Singh',
    customerEmail: 'meera@example.com',
    subject: 'Wedding photo framing',
    message: 'I need frames for my wedding photos. Can you help me choose the right style?',
    date: '2024-01-12',
    status: 'resolved'
  },
  {
    id: 'INQ-005',
    customerName: 'Vikram Reddy',
    customerEmail: 'vikram@example.com',
    subject: 'Delivery timeline question',
    message: 'What is the typical delivery time for custom frames to Bangalore?',
    date: '2024-01-11',
    status: 'responded'
  },
  {
    id: 'INQ-006',
    customerName: 'Anita Desai',
    customerEmail: 'anita@example.com',
    subject: 'Material options inquiry',
    message: 'What types of wood are available for custom frames? I prefer sustainable materials.',
    date: '2024-01-10',
    status: 'new'
  },
  {
    id: 'INQ-007',
    customerName: 'Suresh Gupta',
    customerEmail: 'suresh@example.com',
    subject: 'Corporate framing services',
    message: 'We need framing services for our office artwork. Can you provide a quote?',
    date: '2024-01-09',
    status: 'in_progress'
  },
  {
    id: 'INQ-008',
    customerName: 'Kavya Nair',
    customerEmail: 'kavya@example.com',
    subject: 'Glass protection options',
    message: 'What UV protection options do you have for valuable artwork?',
    date: '2024-01-08',
    status: 'resolved'
  }
];

export default function AdminInquiriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter inquiries based on search term
  const filteredInquiries = mockInquiries.filter(inquiry =>
    inquiry.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInquiries = filteredInquiries.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">New</Badge>;
      case 'responded':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Responded</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">In Progress</Badge>;
      case 'resolved':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Resolved</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateMessage = (message: string, maxLength: number = 60) => {
    return message.length > maxLength ? message.substring(0, maxLength) + '...' : message;
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Customer Inquiries
        </h1>
        <p className="text-lg text-gray-600">
          Manage and respond to customer inquiries and support requests
        </p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Inquiry Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search inquiries by ID, customer, or subject..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>
            <div className="text-sm text-gray-600">
              {filteredInquiries.length} inquir{filteredInquiries.length !== 1 ? 'ies' : 'y'} found
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">All Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Inquiry ID</TableHead>
                <TableHead className="font-semibold">Customer</TableHead>
                <TableHead className="font-semibold">Subject</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedInquiries.map((inquiry) => (
                <TableRow key={inquiry.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-primary">
                    {inquiry.id}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{inquiry.customerName}</div>
                      <div className="text-sm text-gray-600">{inquiry.customerEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{inquiry.subject}</div>
                      <div className="text-sm text-gray-600">
                        {truncateMessage(inquiry.message)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(inquiry.date)}</TableCell>
                  <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredInquiries.length)} of {filteredInquiries.length} inquiries
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="w-10"
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}