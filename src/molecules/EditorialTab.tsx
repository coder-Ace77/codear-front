import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { editorialService, Editorial } from '@/service/editorialService';
import { Loader2, Plus, PenTool, Check, ShieldCheck } from 'lucide-react';

interface EditorialTabProps {
    problemId: number;
}

const EditorialTab: React.FC<EditorialTabProps> = ({ problemId }) => {
    const [editorials, setEditorials] = useState<Editorial[]>([]);
    const [loading, setLoading] = useState(true);
    const [isComposing, setIsComposing] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchEditorials();
    }, [problemId]);

    const fetchEditorials = async () => {
        setLoading(true);
        try {
            const data = await editorialService.getEditorials(problemId);
            setEditorials(data);
        } catch (err) {
            console.error("Failed to load editorials", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!newTitle.trim() || !newContent.trim()) return;
        setSubmitting(true);
        try {
            await editorialService.submitEditorial(problemId, newTitle, newContent);
            setIsComposing(false);
            setNewTitle("");
            setNewContent("");
            fetchEditorials(); 
        } catch (err) {
            console.error("Failed to submit editorial", err);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-blue-500" /></div>;
    }

    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold dark:text-gray-100">Editorials</h2>
                {!isComposing && (
                    <button
                        onClick={() => setIsComposing(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-medium transition-colors"
                    >
                        <Plus size={16} /> Write Editorial
                    </button>
                )}
            </div>

            {isComposing && (
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                    <input
                        type="text"
                        placeholder="Title (e.g. Approach 1: Dynamic Programming)"
                        className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Write your explanation here... Markdown supported!"
                        rows={8}
                        className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 resize-none font-mono"
                        value={newContent}
                        onChange={e => setNewContent(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setIsComposing(false)}
                            className="px-3 py-1.5 text-slate-400 hover:text-slate-200 text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-md text-sm flex items-center gap-2 disabled:opacity-50"
                        >
                            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                            Submit
                        </button>
                    </div>
                </div>
            )}

            {editorials.length === 0 ? (
                <div className="text-center text-slate-500 py-10">
                    <PenTool size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No editorials yet. Be the first to explain this problem!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {editorials.map((editorial) => (
                        <div key={editorial.id} className={`rounded-lg border p-4 ${editorial.isAdmin ? 'bg-slate-900/50 border-yellow-500/30' : 'bg-slate-900 border-slate-800'}`}>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                                    {editorial.username.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-200 text-sm flex items-center gap-2">
                                        {editorial.title}
                                        {editorial.isAdmin && (
                                            <span className="flex items-center gap-1 text-[10px] bg-yellow-500/10 text-yellow-500 px-1.5 py-0.5 rounded border border-yellow-500/20 uppercase tracking-wider font-bold">
                                                <ShieldCheck size={10} /> Official
                                            </span>
                                        )}
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                        by {editorial.username} • {new Date(editorial.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="prose prose-invert prose-sm max-w-none text-slate-300">
                                <ReactMarkdown
                                    components={{
                                        code({ inline, className, children, ...props }: any) {
                                            const match = /language-(\w+)/.exec(className || '');
                                            return !inline && match ? (
                                                <div className="rounded-md border border-slate-700 overflow-hidden my-2">
                                                    <SyntaxHighlighter
                                                        style={atomDark}
                                                        language={match[1]}
                                                        PreTag="div"
                                                        className="!bg-[#0d1117] !p-3 !m-0 !text-xs overflow-x-auto"
                                                        {...props}
                                                    >
                                                        {String(children).replace(/\n$/, '')}
                                                    </SyntaxHighlighter>
                                                </div>
                                            ) : (
                                                <code className="bg-slate-800 px-1.5 py-0.5 rounded text-pink-300 font-mono text-xs" {...props}>
                                                    {children}
                                                </code>
                                            );
                                        }
                                    }}
                                >
                                    {editorial.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EditorialTab;
