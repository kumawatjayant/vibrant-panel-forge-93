import { useState } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
interface SearchField {
  key: string;
  label: string;
  placeholder: string;
  type?: string;
}
interface AdvancedSearchFormProps {
  fields: SearchField[];
  onSearch: (searchParams: Record<string, string>) => void;
  onReset: () => void;
  title?: string;
}
export function AdvancedSearchForm({
  fields,
  onSearch,
  onReset,
  title = "Search"
}: AdvancedSearchFormProps) {
  const [searchParams, setSearchParams] = useState<Record<string, string>>(fields.reduce((acc, field) => ({
    ...acc,
    [field.key]: ''
  }), {}));
  const handleInputChange = (key: string, value: string) => {
    setSearchParams(prev => ({
      ...prev,
      [key]: value
    }));
  };
  const handleSearch = () => {
    onSearch(searchParams);
  };
  const handleReset = () => {
    const resetParams = fields.reduce((acc, field) => ({
      ...acc,
      [field.key]: ''
    }), {});
    setSearchParams(resetParams);
    onReset();
  };
  return <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {fields.map(field => <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key}>{field.label}</Label>
            <Input id={field.key} type={field.type || 'text'} placeholder={field.placeholder} value={searchParams[field.key]} onChange={e => handleInputChange(field.key, e.target.value)} className="bg-muted/20 border-muted/30" />
          </div>)}
      </div>
      
      <div className="flex gap-2">
        <Button onClick={handleSearch} className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Search
        </Button>
        <Button variant="outline" onClick={handleReset} className="flex items-center gap-2">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>;
}