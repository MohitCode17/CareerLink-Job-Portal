import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "Blockchain Developer",
];

const CategoryCarousel = () => {
  return (
    <div className="px-16">
      <Carousel className="w-full max-w-xl mx-auto">
        <CarouselContent className="px-1">
          {categories.map((category, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/3 lg-basis-1/3"
            >
              <Button
                variant="outline"
                className="rounded-full bg-gray-950 w-full text-white"
              >
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-indigo-800 text-white" />
        <CarouselNext className="bg-indigo-800 text-white" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
