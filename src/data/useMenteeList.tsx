import { useQuery } from "@tanstack/react-query";
import { pb } from "@/lib/pocketbase";
import { User } from "@/types";

const fetchMenteeDetails = async (menteeIds: string[]): Promise<User[]> => {
  if (!menteeIds || menteeIds.length === 0) return [];
  const menteeDetails = await Promise.all(
    menteeIds.map((id) =>
      pb
        .collection("users")
        .getOne<User>(id)
        .catch((error) => {
          console.error(`Error fetching mentee with ID ${id}:`, error);
          return null;
        }),
    ),
  );
  return menteeDetails.filter((mentee) => mentee !== null) as User[];
};

export const useMenteeList = (menteeIds?: string[]) => {
  return useQuery({
    queryKey: ["menteeList", menteeIds],
    queryFn: () => fetchMenteeDetails(menteeIds || []),
    enabled: !!menteeIds && menteeIds.length > 0,
  });
};
