import { useQuery } from "@tanstack/react-query";
import { getPointTransaction } from "@/apis";

export const useGetPointTransaction = () => {
  return useQuery({
    queryKey: ["TransactionData"],
    queryFn: () => getPointTransaction(),
  });
};
