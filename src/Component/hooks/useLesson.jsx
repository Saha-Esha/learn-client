import { useQuery } from "@tanstack/react-query";

const useLesson = () => {
  const {
    isPending,
    data: lessons = [],
    refetch,
  } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8089/api/v1/lesson/all");
      return res.json();
    },
  });
  return [lessons, refetch, isPending];
};

export default useLesson;
