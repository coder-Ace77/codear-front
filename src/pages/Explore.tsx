import { useState } from "react";
import ProblemCard from "@/molecules/ProblemCard";
import SearchBar from "@/molecules/SearchBar";
import Pagination from "@/molecules/Pagination";
import Select from "@/atoms/Select";
import Badge from "@/atoms/Badge";
import { mockProblems, availableTags } from "@/constants/mockData";
import { Filter } from "lucide-react";

const ITEMS_PER_PAGE = 6;

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [selectedTag, setSelectedTag] = useState("");

  // Filter problems
  const filteredProblems = mockProblems.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "all" || problem.difficulty.toLowerCase() === selectedDifficulty;
    const matchesTag = !selectedTag || problem.tags.includes(selectedTag);
    return matchesSearch && matchesDifficulty && matchesTag;
  });

  // Sort problems
  const sortedProblems = [...filteredProblems].sort((a, b) => {
    if (sortBy === "popularity") return b.solvedBy - a.solvedBy;
    if (sortBy === "acceptance") return b.acceptanceRate - a.acceptanceRate;
    return a.id - b.id;
  });

  // Paginate
  const totalPages = Math.ceil(sortedProblems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProblems = sortedProblems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Explore Problems</h1>
          <p className="text-muted-foreground text-lg">
            Browse through {mockProblems.length} coding challenges
          </p>
        </div>

        {/* Filters & Search */}
        <div className="mb-6 space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search problems by title..."
          />

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Filters</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-40"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </Select>

                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-40"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="acceptance">Acceptance Rate</option>
                  <option value="latest">Latest</option>
                </Select>
              </div>
            </div>
          </div>

          {/* Tags Filter */}
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-2">Filter by Tag</div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="default"
                className={`cursor-pointer hover:scale-105 transition-transform ${!selectedTag ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedTag("")}
              >
                All
              </Badge>
              {availableTags.slice(0, 10).map((tag) => (
                <Badge
                  key={tag}
                  variant="default"
                  className={`cursor-pointer hover:scale-105 transition-transform ${selectedTag === tag ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedTag(tag === selectedTag ? "" : tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {paginatedProblems.length} of {sortedProblems.length} problems
        </div>

        {/* Problems Grid */}
        <div className="grid gap-4 mb-8">
          {paginatedProblems.length > 0 ? (
            paginatedProblems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No problems found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
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
