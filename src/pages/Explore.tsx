import { useState, useEffect } from "react";
import Pagination from "@/molecules/Pagination";
import { Problem, ProblemSummary } from "@/constants/mockData";
import { fetchGrandTotal ,fetchProblems } from "@/service/problemService";
import ExplorePageHeader from "@/molecules/ExplorePageHeader";
import ExplorePageMenuSection from "@/molecules/ExplorePageMenuSectiob";
import ExplorePageProblemSection from "@/molecules/ExplorePageProblemSection";

const Explore = () => {

  const [problems, setProblems] = useState<ProblemSummary[]>([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [grandTotalProblems,setGrandTotalProblems] = useState(0);
  const [totalProblems,setTotalProblems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    fetchGrandTotal(setGrandTotalProblems,setAvailableTags);
  }, []);

  useEffect(() => {
    fetchProblems(
      setLoading,
      setError,
      currentPage,
      searchQuery,
      selectedDifficulty,
      sortBy,selectedTag,
      setProblems,
      setTotalPages,
      setTotalProblems);
  }, [currentPage, searchQuery, selectedDifficulty, sortBy, selectedTag]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDifficulty, sortBy, selectedTag]);


  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <ExplorePageHeader grandTotalProblems={grandTotalProblems}/>
        
        <ExplorePageMenuSection 
          searchQuery={searchQuery}
          setSearchQuery = {setSearchQuery}
          selectedDifficulty= {selectedDifficulty}
          setSelectedDifficulty = {setSelectedDifficulty}
          sortBy = {sortBy}
          setSortBy = {setSortBy}
          setSelectedTag = {setSelectedTag}
          availableTags = {availableTags}
          selectedTag = {selectedTag}/>
        
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {problems.length} of {totalProblems} problems
        </div>

        <ExplorePageProblemSection
          loading={loading}
          problemsummary={problems}
          error={error}
        />
        
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
