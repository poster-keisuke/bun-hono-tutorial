import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/api/expenses/total-spent');
  });

  return (
    <Card className='w-[350px] m-auto'>
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>{totalSpent}</CardContent>
    </Card>
  );
}

export default App;
