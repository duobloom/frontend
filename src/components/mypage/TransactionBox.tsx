import { PointType } from "@/types";

type TransactionProps = {
  transactions: PointType[];
};

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${month}/${day} - ${dayOfWeek}요일`;
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

// 날짜별로 그룹화
const groupByDate = (transactions: PointType[]) => {
  return transactions.reduce(
    (acc, transaction) => {
      const dateKey = new Date(transaction.created_at).toDateString(); // 그룹화 키로 날짜만 사용
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(transaction);
      return acc;
    },
    {} as Record<string, PointType[]>,
  );
};

const TransactionBox = ({ transactions }: TransactionProps) => {
  const groupedTransactions = groupByDate(transactions);

  return (
    <div className="flex flex-col">
      {Object.keys(groupedTransactions).map((dateKey) => (
        <div key={dateKey} className="mb-[1.5rem]">
          <h1 className="mb-[1.5rem] mt-[1.5rem] text-[1.5rem] font-bold">{formatDate(dateKey)}</h1>
          {groupedTransactions[dateKey].map((transaction) => (
            <div
              key={transaction.transaction_id}
              className="mb-[1rem] flex w-full items-center justify-between rounded-[1rem] border border-gray-300 bg-gray-50 px-[1.5rem] py-[1rem]"
            >
              <span className="text-[1.4rem] font-bold">{formatTime(transaction.created_at)}</span>
              <span className="text-[1.4rem] font-medium">{transaction.amount}P</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TransactionBox;
