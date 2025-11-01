import { Link } from "react-router-dom";
import Button from "@/atoms/Button";
import { Code2, Zap, Trophy, Users, ArrowRight, TrendingUp, Target } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-50" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Master Your Coding Skills
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Level Up Your
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              Coding Journey
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Practice coding problems, compete with developers worldwide, and prepare for technical interviews at top tech companies.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/explore">
              <Button variant="primary" size="lg" className="group">
                Start Solving
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg">
                Create Account
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur border border-border">
              <div className="text-4xl font-bold text-primary mb-2">2000+</div>
              <div className="text-muted-foreground">Coding Problems</div>
            </div>
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur border border-border">
              <div className="text-4xl font-bold text-accent mb-2">500K+</div>
              <div className="text-muted-foreground">Active Developers</div>
            </div>
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur border border-border">
              <div className="text-4xl font-bold text-success mb-2">50M+</div>
              <div className="text-muted-foreground">Solutions Submitted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose CodeArena?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to become a better programmer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-card border border-border hover:border-primary hover:shadow-glow transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-all">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rich Problem Set</h3>
              <p className="text-muted-foreground">
                Thousands of problems covering all difficulty levels and topics, from arrays to dynamic programming.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border hover:border-primary hover:shadow-glow transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4 group-hover:shadow-glow transition-all">
                <Target className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interview Prep</h3>
              <p className="text-muted-foreground">
                Practice problems commonly asked by FAANG companies and ace your technical interviews.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border hover:border-primary hover:shadow-glow transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-all">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Contests & Rankings</h3>
              <p className="text-muted-foreground">
                Participate in weekly contests and climb the global leaderboard to showcase your skills.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border hover:border-primary hover:shadow-glow transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4 group-hover:shadow-glow transition-all">
                <TrendingUp className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your solving patterns, track your streak, and visualize your improvement over time.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border hover:border-primary hover:shadow-glow transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-all">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-muted-foreground">
                Learn from others' solutions, discuss approaches, and grow with a supportive community.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border hover:border-primary hover:shadow-glow transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4 group-hover:shadow-glow transition-all">
                <Zap className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Languages</h3>
              <p className="text-muted-foreground">
                Solve problems in your preferred language with support for JavaScript, Python, Java, C++, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-2xl bg-gradient-primary relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2Mi1oMnYtMmgtMnptMC00djJoMnYtMmgtMnptMC00djJoMnYtMmgtMnptMC00djJoMnYtMmgtMnptMC00djJoMnYtMmgtMnptMC00djJoMnYtMmgtMnptMC00djJoMnYtMmgtMnptMC00djJoMnYtMmgtMnptMC00djJoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
            
            <div className="relative">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of developers improving their skills every day. Start solving problems now!
              </p>
              <Link to="/explore">
                <Button variant="accent" size="lg" className="group">
                  Explore Problems
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
