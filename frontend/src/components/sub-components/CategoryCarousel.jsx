import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useNavigate } from "react-router-dom";
import { setSearchQueryText } from "@/store/slices/jobSlice";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "Blockchain Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (query) => {
    dispatch(setSearchQueryText(query));
    navigate("/browse");
  };

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
                onClick={() => handleSearch(category)}
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
