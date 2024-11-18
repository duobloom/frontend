import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { createErrorHandler } from "@/configs/errorHandler";
import { AuthenticationError, NetworkError } from "@/apis/errors";

export const createQueryClient = () => {
  const errorHandler = createErrorHandler();

  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          if (error instanceof AuthenticationError) {
            return false;
          }
          if (error instanceof NetworkError) {
            return failureCount < 3;
          }
          return false;
        },
        networkMode: "always",
      },
      mutations: {
        retry: false,
        networkMode: "always",
      },
    },
    queryCache: new QueryCache({
      onError: errorHandler,
    }),
    mutationCache: new MutationCache({
      onError: errorHandler,
    }),
  });
};
