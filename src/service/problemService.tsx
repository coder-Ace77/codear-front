import { ApiResponse } from "@/types/apiResponse";
import { ITEMS_PER_PAGE } from "@/constants/AppConstants";
import apiClient from "@/lib/apiClient";
import type { TagsAndCount } from "@/types/TagsAndCount";
import { ProblemSummary } from "@/constants/mockData";

export const fetchGrandTotal = async (setGrandTotalProblems,setAvailableTags) => {
    try {
        const response = await apiClient("/problem/problemCntAndTags");
        const data: TagsAndCount = await response.data;
        setGrandTotalProblems(data.count || 0);
        setAvailableTags(data.tags || []);
    } catch (err) {
        console.error("Failed to fetch grand total:", err);
        setGrandTotalProblems(0);
    }
};

// export const fetchProblems = async (
//     setLoading,
//     setError,
//     currentPage,
//     searchQuery,
//     selectedDifficulty,
//     sortBy,
//     selectedTag,
//     setProblems,
//     setTotalPages,
//     setTotalProblems
// ) => {
//       setLoading(true);
//       setError(null);
      
//       try {
//         const params = new URLSearchParams();
//         params.append("page", String(currentPage));
//         params.append("limit", String(ITEMS_PER_PAGE));
//         if (searchQuery) params.append("search", searchQuery);
//         if (selectedDifficulty !== "all") params.append("difficulty", selectedDifficulty);
//         if (sortBy) params.append("sort", sortBy);
//         if (selectedTag) params.append("tag", selectedTag);

//         const response = await apiClient(`/problem/problems?${params.toString()}`);

//         const data: ProblemSummary[] = await response.data;

//         console.log(response.data);

//         setProblems(data || []);
//         setTotalProblems(data.length || 0);
//         const total_pages = data.length / ITEMS_PER_PAGE;
//         setTotalPages(total_pages || 0);

//       } catch (err) {
//         console.error("Fetch error:", err);
//         setError("Failed to fetch problems. Please try again later.");
//         setProblems([]);
//         setTotalProblems(0);
//         setTotalPages(0);
//       } finally {
//         setLoading(false);
//       }
//     };


export const fetchProblems = async ({
  page,
  search,
  difficulty,
  sortBy,
  tag,
  onSuccess,
  onError,
}: {
  page: number;
  search: string;
  difficulty: string;
  sortBy: string;
  tag: string;
  onSuccess: (data: any) => void;
  onError: (err: any) => void;
}) => {
  try {
    console.log("fetch Problem called..");
    const params: any = {
      page: page - 1, // backend is 0-indexed
      size: 10,
      sortBy,
    };

    if (search) params.search = search;
    if (difficulty !== "all") params.difficulty = difficulty;
    if (tag) params.tags = [tag]; // ✅ plural, backend expects List<String>

    console.log("params", params);

    const { data } = await apiClient(`problem/search`, { params });

    console.log("data " , data);

    onSuccess({
      problems: data.content || [],
      totalCount: data.totalCount || 0,
      totalPages: data.totalPages || 1,
    });
  } catch (err: any) {
    console.error("❌ fetchProblems failed:", err);
    onError(err);
  }
};


