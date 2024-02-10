import { useEffect, useState } from "react";

const placeholders = [
  "Figma for Developers",
  "Weekly Meal Prep",
  "Home Gardening For Dummies",
  "Guitar Lessons",
  "Web Development Bootcamp",
];

export default function useAnimatedPlaceholder() {
  const [index, setIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    let place = "";
    const typingInterval = setInterval(() => {
      if (place.length < placeholders[index].length) {
        place += placeholders[index][place.length];
        setPlaceholder(place);
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          const deletingInterval = setInterval(() => {
            if (place.length > 0) {
              place = place.slice(0, place.length - 1);
              setPlaceholder(place);
            } else {
              clearInterval(deletingInterval);
              setIndex((index + 1) % placeholders.length);
            }
          }, 75);
        }, 1000);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, [index]);

  return placeholder;
}
