
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash } from 'lucide-react';
import { Website } from '@/hooks/useWebsites';

interface MyWebsitesTableProps {
  websites: Website[];
  onDeleteWebsite: (websiteId: string) => void;
  formatPrice: (price: number) => string;
  getStatusColor: (status: string) => string;
}

export function MyWebsitesTable({
  websites,
  onDeleteWebsite,
  formatPrice,
  getStatusColor
}: MyWebsitesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Uploaded Websites</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {websites.map((website) => (
              <TableRow key={website.id}>
                <TableCell className="font-medium">{website.title}</TableCell>
                <TableCell>{website.category}</TableCell>
                <TableCell>{formatPrice(website.price)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(website.status)}>
                    {website.status}
                  </Badge>
                </TableCell>
                <TableCell>{website.views_count}</TableCell>
                <TableCell>
                  {website.rating_average?.toFixed(1) || '0.0'} 
                  ({website.rating_count})
                </TableCell>
                <TableCell>
                  {new Date(website.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onDeleteWebsite(website.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
