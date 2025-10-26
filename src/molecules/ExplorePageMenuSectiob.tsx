import SearchBar from "./SearchBar";
import { Filter} from "lucide-react";
import Select from "@/atoms/Select";
import Badge from "@/atoms/Badge";

const ExplorePageMenuSection = 
    ({searchQuery,
    setSearchQuery,
    selectedDifficulty,
    setSelectedDifficulty,
    sortBy,
    setSortBy,
    setSelectedTag,
    availableTags,
    selectedTag
})=>{
    return (
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
    );
}

export default ExplorePageMenuSection;