import { useState, useEffect } from "react";
import Pagination from "@/molecules/Pagination";
import { ProblemSummary } from "@/constants/mockData";
import { fetchGrandTotal ,fetchProblems } from "@/service/problemService";
import ExplorePageHeader from "@/molecules/ExplorePageHeader";
import ExplorePageMenuSection from "@/molecules/ExplorePageMenuSectiob";
import ExplorePageProblemSection from "@/molecules/ExplorePageProblemSection";

const Explore = () => {
  const [problems, setProblems] = useState<ProblemSummary[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [grandTotalProblems, setGrandTotalProblems] = useState(0);


  const [totalProblems, setTotalProblems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    setLoading(true);

    const handler = setTimeout(() => {
      fetchProblems({
        page: currentPage,
        search: searchQuery,
        difficulty: selectedDifficulty,
        sortBy,
        tag: selectedTag,
        onSuccess: (data) => {
          setProblems(data.problems);
          setTotalPages(data.totalPages);
          setTotalProblems(data.totalCount);
          setLoading(false);
        },
        onError: (err) => {
          setError(err.message || "Failed to fetch problems");
          setLoading(false);
        },
      });
    }, 500); // 🕒 debounce delay in ms (adjust to taste)

    return () => clearTimeout(handler); // cleanup on every dependency change
  }, [currentPage, searchQuery, selectedDifficulty, sortBy, selectedTag]);

  
  // Reset page to 1 whenever filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDifficulty, sortBy, selectedTag]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <ExplorePageHeader grandTotalProblems={grandTotalProblems} />

        {/* Filters / Search / Sorting */}
        <ExplorePageMenuSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          sortBy={sortBy}
          setSortBy={setSortBy}
          availableTags={availableTags}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />

        {/* Count display */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {problems.length} of {totalProblems} problems
        </div>

        {/* Problem list */}
        <ExplorePageProblemSection
          loading={loading}
          problemsummary={problems}
          error={error}
        />

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Explore;
