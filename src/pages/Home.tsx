import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const codeSnippets = [
  `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
  `// React Component
const ProblemSolver = () => {
  const [solved, setSolved] = useState(false);
  
  return (
    <div className="solve-card">
      {solved ? <Success /> : <Attempt />}
    </div>
  );
}`,
  `class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }
}`
];

const Home = () => {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const typeSpeed = isDeleting ? 30 : 50;
    const deleteSpeed = 20;
    const pauseTime = 2000;

    const timer = setTimeout(() => {
      const fullText = codeSnippets[currentSnippet];

      if (!isDeleting) {
        setDisplayedCode(fullText.substring(0, displayedCode.length + 1));
        if (displayedCode === fullText) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setDisplayedCode(fullText.substring(0, displayedCode.length - 1));
        if (displayedCode === "") {
          setIsDeleting(false);
          setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timer);
  }, [displayedCode, isDeleting, currentSnippet]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#1e1e1e] overflow-hidden relative">
      <div className="absolute inset-0 opacity-40 overflow-hidden pointer-events-none select-none filter blur-[1px]">
        <div className="transform -rotate-12 scale-110 translate-x-[-10%] translate-y-[-10%] transition-all duration-300">
          <SyntaxHighlighter
            language="javascript"
            style={vscDarkPlus}
            customStyle={{
              background: 'transparent',
              fontSize: '1.2rem',
              lineHeight: '1.5',
              margin: 0,
              padding: '2rem',
            }}
            showLineNumbers={true}
            wrapLines={true}
          >
            {displayedCode}
          </SyntaxHighlighter>
        </div>

        <div className="absolute top-[-10%] right-[-10%] transform rotate-12 scale-90 opacity-20 hidden md:block">
          <SyntaxHighlighter
            language="typescript"
            style={vscDarkPlus}
            customStyle={{ background: 'transparent' }}
          >
            {codeSnippets[1]}
          </SyntaxHighlighter>
        </div>

        <div className="absolute bottom-[-20%] left-[-10%] transform -rotate-6 scale-75 opacity-20 hidden md:block">
          <SyntaxHighlighter
            language="javascript"
            style={vscDarkPlus}
            customStyle={{ background: 'transparent' }}
          >
            {codeSnippets[2]}
          </SyntaxHighlighter>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 md:left-20 text-accent/20 text-4xl md:text-6xl font-mono animate-bounce delay-700">{`{}`}</div>
        <div className="absolute bottom-40 right-10 md:right-40 text-primary/20 text-4xl md:text-6xl font-mono animate-bounce delay-1000">{`</>`}</div>
        <div className="absolute top-1/2 right-4 md:right-20 text-success/20 text-2xl md:text-4xl font-mono animate-pulse">{`[]`}</div>
      </div>

      <div className="relative z-10 text-center p-6 md:p-12 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 shadow-2xl mx-4">
        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-4"
          style={{
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
            transition: "transform 0.1s ease-out"
          }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-text-shimmer bg-[length:200%_auto]">
            CodeArena
          </span>
        </h1>

        <div className="flex items-center justify-center gap-2 text-muted-foreground font-mono mt-4 text-sm md:text-base">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2">Compiling...</span>
        </div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1))] bg-[length:100%_4px] pointer-events-none opacity-20" />
    </div>
  );
};

export default Home;
