
const ExplorePageHeader=({grandTotalProblems})=>{
    return (
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Explore Problems</h1>
          <p className="text-muted-foreground text-lg">
            Browse through {grandTotalProblems} coding challenges
          </p>
        </div>
    );
}

export default ExplorePageHeader;