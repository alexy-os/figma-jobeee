import { Heart, Bookmark, MessageCircle, User, ThumbsUp } from 'lucide-react';
import { Button } from './ui/button';

interface FeedCardProps {
  type: 'quizz' | 'thread' | 'article';
  title: string;
  preview?: string;
  tags?: string[];
  liked?: boolean;
  imageUrl?: string;
  company?: {
    name: string;
    logo?: string;
  };
  likeCount?: number;
  commentCount?: number;
  scale?: 'small' | 'medium' | 'large';
  onCardClick?: () => void;
}

export function FeedCard({ 
  type, 
  title, 
  preview, 
  tags, 
  liked,
  imageUrl,
  company,
  likeCount = 0,
  commentCount = 0,
  scale = 'large',
  onCardClick,
}: FeedCardProps) {
  // Scale-based classes
  const paddingClass = scale === 'small' ? 'p-2 md:p-3' : scale === 'medium' ? 'p-3 md:p-4' : 'p-4 md:p-6';
  const gapClass = scale === 'small' ? 'gap-2 md:gap-2.5' : scale === 'medium' ? 'gap-2.5 md:gap-3' : 'gap-3 md:gap-4';
  const imageSizeClass = scale === 'small' ? 'w-12 h-12 md:w-16 md:h-16' : scale === 'medium' ? 'w-14 h-14 md:w-20 md:h-20' : 'w-16 h-16 md:w-24 md:h-24';
  const logoSizeClass = scale === 'small' ? 'w-4 h-4' : scale === 'medium' ? 'w-4 h-4' : 'w-5 h-5';
  const buttonSizeClass = scale === 'small' ? 'h-6 w-6 md:h-8 md:w-8' : scale === 'medium' ? 'h-7 w-7 md:h-9 md:w-9' : 'h-8 w-8 md:h-10 md:w-10';
  const iconSizeClass = scale === 'small' ? 'h-3 w-3 md:h-4 md:w-4' : scale === 'medium' ? 'h-3.5 w-3.5 md:h-4 md:w-4' : 'h-4 w-4 md:h-5 md:w-5';
  const textSpacingClass = scale === 'small' ? 'mb-1.5' : scale === 'medium' ? 'mb-2' : 'mb-3';
  const tagSpacingClass = scale === 'small' ? 'gap-1.5 mt-1.5' : scale === 'medium' ? 'gap-1.5 mt-1.5' : 'gap-2 mt-2';
  const tagPaddingClass = scale === 'small' ? 'px-1.5 py-0.5' : scale === 'medium' ? 'px-2 py-0.5' : 'px-2 py-1';
  

  return (
    <div 
      className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg ${paddingClass} hover:shadow-md transition-shadow cursor-pointer`}
      onClick={onCardClick}
    >
      <div className={`flex ${gapClass}`}>
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title}
            className={`${imageSizeClass} bg-slate-200 dark:bg-slate-700 rounded object-cover flex-shrink-0`}
          />
        ) : (
          <div className={`${imageSizeClass} bg-slate-200 dark:bg-slate-700 rounded flex-shrink-0`}></div>
        )}
        
        <div className="flex-1 min-w-0">
          {/* Company badge */}
          {company && (
            <div className="flex items-center gap-2 mb-2">
              {company.logo && (
                <img src={company.logo} alt={company.name} className={`${logoSizeClass} rounded-full`} />
              )}
              <span className="text-xs text-slate-500 dark:text-slate-400">{company.name}</span>
            </div>
          )}

          <div className="flex items-start justify-between mb-2">
            <h3 className="text-slate-800 dark:text-slate-100 flex-1">
              {title}
            </h3>
            <Button variant="ghost" size="icon" className={`flex-shrink-0 ${buttonSizeClass}`}>
              {type === 'quizz' && <Heart className={`${iconSizeClass} ${liked ? 'fill-current text-red-500' : 'text-slate-400 dark:text-slate-500'}`} />}
              {type === 'thread' && <ThumbsUp className={`${iconSizeClass} text-slate-600 dark:text-slate-400`} />}
              {type === 'article' && <Bookmark className={`${iconSizeClass} text-slate-600 dark:text-slate-400`} />}
            </Button>
          </div>

          {preview && (
            <p className={`text-sm text-slate-600 dark:text-slate-400 ${textSpacingClass} line-clamp-2`}>
              {preview}
            </p>
          )}

          {type === 'thread' && (
            <div className="flex items-center gap-4 text-xs md:text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{likeCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{commentCount}</span>
              </div>
            </div>
          )}

          {tags && tags.length > 0 && (
            <div className={`flex ${tagSpacingClass} text-xs text-slate-500 dark:text-slate-400 flex-wrap`}>
              {tags.map((tag, idx) => (
                <span key={idx} className={`bg-slate-100 dark:bg-slate-700 ${tagPaddingClass} rounded`}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
