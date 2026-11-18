import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RecipeCard } from '../recipe/RecipeCard';

export const RecipeCarousel = ({ recipes = [], title, subtitle }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: false
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  if (!recipes || recipes.length === 0) return null;

  return (
    <div className="relative w-full max-w-full overflow-hidden py-4">
      {/* Header with Title and Prev/Next buttons */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
        <div>
          {title && (
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#244B39]">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm text-[#566459] mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            aria-label="Previous recipe slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A7B99A]/40 bg-white text-[#244B39] transition-all hover:border-[#244B39] hover:bg-[#F5F0E5] disabled:cursor-not-allowed disabled:opacity-30 shadow-xs"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            aria-label="Next recipe slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A7B99A]/40 bg-white text-[#244B39] transition-all hover:border-[#244B39] hover:bg-[#F5F0E5] disabled:cursor-not-allowed disabled:opacity-30 shadow-xs"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Embla Viewport */}
      <div className="overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0" ref={emblaRef}>
        <div className="flex gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="flex-[0_0_88%] sm:flex-[0_0_46%] lg:flex-[0_0_31%] min-w-0"
            >
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      {scrollSnaps.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'w-7 bg-[#244B39]'
                  : 'w-2 bg-[#A7B99A]/60 hover:bg-[#A7B99A]'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
