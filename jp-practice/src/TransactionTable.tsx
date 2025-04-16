import React, { useMemo, useState } from 'react'


type Transaction = {
  id: number;
  date: string;
  amount: number;
};

const generateBigData = (): Transaction[] => {
  const data: Transaction[] = [];
  for (let i = 0; i < 10000; i++) {
    data.push({
      id: i,
      date: new Date(Date.now() - i * 10000000).toISOString(),
      amount: Math.random() * 10000,
    });
  }
  return data;
};

const transactions = generateBigData();
const TransactionTable = () => {
  const [sortByAmount, setSortByAmount] = useState(false);
  const [counter, setCounter] = useState(0);
  const sortedTransactions: Transaction[] = useMemo(() => {
    console.log("Sorting transactions...");
    const dataCopy = [...transactions];
    if (sortByAmount) {
      return dataCopy.sort((a, b) => b.amount - a.amount);
    } else {
      return dataCopy.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
  }, [sortByAmount]); 
  

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>Force Re-render</button>
      <button onClick={() => setSortByAmount(!sortByAmount)}>
        Sort By {sortByAmount ? "Date" : "Amount"}</button>
        <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.slice(0, 20).map((txn: Transaction) => (
            <tr key={txn.id}>
              <td>{txn.id}</td>
              <td>{new Date(txn.date).toLocaleDateString()}</td>
              <td>${txn.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable