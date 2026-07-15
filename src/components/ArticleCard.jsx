import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye } from 'lucide-react';

export default function ArticleCard({ article }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-martech-border bg-martech-card transition duration-300 hover:-translate-y-1 hover:border-martech-primary/40 hover:shadow-xl hover:shadow-martech-primary/5">
      
      {/* Cover Image */}
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        <img 
          src={article.featuredImage} 
          alt={article.title}
          className="h-full w-full object-cover transition duration-550 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-slate-100/90 dark:bg-martech-dark/80 backdrop-blur px-2.5 py-0.5 text-[9px] uppercase font-bold text-martech-primary border border-martech-border shadow-sm">
            {article.category}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center space-x-2 text-[10px] text-slate-500 dark:text-slate-400 mb-2">
          <span>{article.date}</span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <Clock className="h-3 w-3 text-martech-primary" />
            <span>{article.readTime}</span>
          </span>
        </div>

        <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white leading-snug mb-2 group-hover:text-martech-primary transition-colors line-clamp-2">
          <Link to={`/article/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Author Footer */}
        <div className="mt-auto flex items-center justify-between pt-3.5 border-t border-martech-border">
          <div className="flex items-center space-x-2.5">
            <img 
              src={article.author.avatar} 
              alt={article.author.name}
              className="h-6 w-6 rounded-full object-cover border border-martech-border"
            />
            <div>
              <p className="text-[10px] font-semibold text-slate-700 dark:text-slate-200 leading-none">{article.author.name}</p>
              <p className="text-[8px] text-slate-500 mt-0.5">{article.author.role}</p>
            </div>
          </div>
          {article.views && (
            <span className="flex items-center space-x-1 text-[9px] text-slate-450">
              <Eye className="h-3 w-3" />
              <span>{article.views}</span>
            </span>
          )}
        </div>
      </div>

    </article>
  );
}
