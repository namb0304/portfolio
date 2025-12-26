import { useState, useEffect, useCallback } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

export const useEmblaSelected = (emblaApi: EmblaCarouselType | undefined) => {
  const [selected, setSelected] = useState(0);

  const updateSelected = useCallback(() => {
    if (!emblaApi) return;
    const selectedIndex = emblaApi.selectedScrollSnap();
    setSelected(selectedIndex);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    updateSelected();
    emblaApi.on('select', updateSelected);
    emblaApi.on('reInit', updateSelected);

    return () => {
      emblaApi.off('select', updateSelected);
      emblaApi.off('reInit', updateSelected);
    };
  }, [emblaApi, updateSelected]);

  return selected;
};
