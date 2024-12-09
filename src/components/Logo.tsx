const Logo = ({ fontSize }) => {
  return (
    <div className="inline-block cursor-pointer">
      <h1
        className="
           font-extrabold bg-clip-text text-transparent
          bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
          transition-transform duration-700 ease-in-out
          hover:scale-105 hover:animate-gradient-move
          drop-shadow-[0_0_10px_rgba(255,105,180,0.5)]
        "
        style={{ fontSize: fontSize }}
      >
        Skillz
      </h1>
    </div>
  );
};

export { Logo };
