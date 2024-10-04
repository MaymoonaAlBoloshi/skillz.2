import { Button } from "./ui/button";
import { HeroCards } from "./HeroCards";
import { useNavigate, Link } from "@tanstack/react-router";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span
              className="
        inline bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
        text-transparent bg-clip-text
        transition-transform duration-500 ease-in-out
        hover:scale-105
      "
            >
              Skillz
            </span>{" "}
            For the future, empowering
          </h1>{" "}
          for{" "}
          <h2 className="inline">
            <span
              className="
        inline bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
        text-transparent bg-clip-text
        transition-transform duration-500 ease-in-out
        hover:scale-105
      "
            >
              YOU
            </span>{" "}
            today
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Unlock endless possibilities with a seamless learning experience that
          takes you from beginner to expert. Learn at your own pace and watch
          yourself transform into the developer you’ve always dreamed of.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Link
            to="/signin"
            className="
    w-full md:w-1/3
    py-3 px-6
    text-lg font-bold text-white
    bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
    rounded-full
    shadow-lg
    transition-all duration-500 ease-in-out
    hover:scale-105 hover:shadow-2xl hover:animate-gradient-x
  "
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
