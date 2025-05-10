"use client";

import { MessageCircle } from "lucide-react";
import type { DiscussionPost } from "./types";

interface DiscussionSectionProps {
  posts: DiscussionPost[];
}

export default function DiscussionSection({ posts }: DiscussionSectionProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <MessageCircle size={20} />
          Discussion
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{post.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>Posted by {post.author}</span>
                <span>{post.timeAgo}</span>
                <span>{post.replies} replies</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t dark:border-gray-700">
        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Start New Discussion
        </button>
      </div>
    </div>
  );
} 