"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { siteConfig } from '@/config';
import Image from 'next/image';
import { FaGithub, FaLink } from 'react-icons/fa';
import useEmblaCarousel from 'embla-carousel-react';

const ProjectsCarousel = () => {
  const { projects } = siteConfig;
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false, 
    align: 'center',
    containScroll: false,
  });

  const [selected, setSelected] = useState(0);

  const updateClasses = useCallback(() => {
    if (!emblaApi) return;
    const selectedIndex = emblaApi.selectedScrollSnap();
    setSelected(selectedIndex);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateClasses();
    emblaApi.on('select', updateClasses);
    emblaApi.on('reInit', updateClasses);
  }, [emblaApi, updateClasses]);

  return (
    <section id="projects" className="container mx-auto p-4 md:p-1 scroll-mt-16">
      <div className="container mx-auto">
        <p className="text-center text-gray-400 mb-5">カードをドラッグまたはスクロールしてみてください</p>
        
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {projects.map((project, index) => {
                const isSelected = index === selected;
                const isPrev = index === (selected - 1 + projects.length) % projects.length;
                const isNext = index === (selected + 1) % projects.length;
                
                let slideClass = '';
                if (isSelected) slideClass = 'is-selected';
                else if (isPrev) slideClass = 'is-prev';
                else if (isNext) slideClass = 'is-next';

                return (
                  <div className={`embla__slide ${slideClass}`} key={index}>
                    <div className="relative w-full h-[400px] bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                      <div className="relative h-1/2">
                        <Image src={project.image} alt={project.title} fill className="object-cover" />
                      </div>
                      <div className="p-4 flex flex-col h-1/2">
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-gray-400 text-sm mb-3 flex-grow overflow-hidden">{project.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="bg-gray-700 text-cyan-400 text-xs font-semibold px-2 py-0.5 rounded-full">{tag}</span>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4">
                            {project.github !== "なし" ? (
                          <a href={project.github} target="_blank" rel="noopener noreferrer"><FaGithub className="text-gray-400 hover:text-white" /></a>
                        ) : (
                          <span className="text-gray-600" title="リポジトリ非公開"><FaGithub /></span>
                        )}

                        {project.url !== "なし" ? (
                          <a href={project.url} target="_blank" rel="noopener noreferrer"><FaLink className="text-gray-400 hover:text-white" /></a>
                        ) : (
                          <span className="text-xs italic text-gray-500" title="現在デプロイされていません">
                            デプロイ準備中...
                          </span>
                        )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;