import { Book } from '@/components/text/Book.jsx';
import { useState } from 'react';
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@a-type/ui/components/select';
import { books } from '@/data/books.js';

export interface HomePageProps {}

export function HomePage({}: HomePageProps) {
  const [id, setId] = useState('92-1JN');
  return (
    <div>
      <Select value={id} onValueChange={setId}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {books.map((book) => (
            <SelectItem value={book.id} key={book.id}>
              {book.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Book id={id} />
    </div>
  );
}

export default HomePage;
