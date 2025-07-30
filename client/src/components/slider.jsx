"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Slider() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="relative w-screen h-[500px]"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="h-[500px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="h-[500px]">
            <div className=" h-[500px]">
              <img
                src="https://picsum.photos/200"
                alt=""
                className="w-full overflow-hidden"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className=" left-5" />
      <CarouselNext className=" right-5" />
    </Carousel>
  );
}
