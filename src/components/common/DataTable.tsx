// Reusable optimized data table component
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { TableColumn, ActionButton, BaseEntity, PaginationResult } from '@/types';
import * as Icons from 'lucide-react';

interface DataTableProps<T extends BaseEntity> {
  data: PaginationResult<T>;
  columns: TableColumn<T>[];
  actions?: ActionButton<T>[];
  onPageChange: (page: number) => void;
  className?: string;
}

export function DataTable<T extends BaseEntity>({
  data,
  columns,
  actions = [],
  onPageChange,
  className = ''
}: DataTableProps<T>) {
  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      'Active': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Inactive': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Suspended': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Ongoing': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Completed': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Dropped': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return statusColors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const renderCell = (item: T, column: TableColumn<T>) => {
    if (column.render) {
      return column.render(item);
    }

    const value = (item as any)[column.key];
    
    // Special rendering for common patterns
    if (column.key === 'status') {
      return (
        <Badge variant="outline" className={getStatusColor(value)}>
          {value}
        </Badge>
      );
    }

    if (column.key === 'avatar' || column.key === 'user') {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={item.avatar || '/placeholder.svg'} alt={item.name} />
            <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.email}</p>
          </div>
        </div>
      );
    }

    if (column.key === 'progress' && typeof value === 'number') {
      return (
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full" 
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-sm">{value}%</span>
        </div>
      );
    }

    return value;
  };

  const renderPagination = () => {
    if (data.totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, data.currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(data.totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                if (data.currentPage > 1) onPageChange(data.currentPage - 1);
              }}
              className={data.currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          
          {pageNumbers.map(pageNum => (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href="#"
                isActive={pageNum === data.currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(pageNum);
                }}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                if (data.currentPage < data.totalPages) onPageChange(data.currentPage + 1);
              }}
              className={data.currentPage === data.totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Table>
        <TableHeader>
          <TableRow className="border-border/50">
            {columns.map((column, index) => (
              <TableHead key={index} className={column.className}>
                {column.label}
              </TableHead>
            ))}
            {actions.length > 0 && (
              <TableHead className="text-right">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((item) => (
            <TableRow key={item.id} className="border-border/50 hover:bg-muted/20">
              {columns.map((column, index) => (
                <TableCell key={index} className={column.className}>
                  {renderCell(item, column)}
                </TableCell>
              ))}
              {actions.length > 0 && (
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {actions.map((action, index) => {
                      const IconComponent = (Icons as any)[action.icon] || Icons.MoreHorizontal;
                      return (
                        <Button
                          key={index}
                          variant={action.variant || "ghost"}
                          size="sm"
                          onClick={() => action.onClick(item)}
                          className={action.className}
                        >
                          <IconComponent className="h-4 w-4" />
                        </Button>
                      );
                    })}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="flex items-center justify-between pt-4">
        <p className="text-sm text-muted-foreground">
          Showing {data.startIndex}-{data.endIndex} of {data.totalItems} items
        </p>
        {renderPagination()}
      </div>
    </div>
  );
}