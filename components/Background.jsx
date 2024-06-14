const Background = () => {
  return (
    <div className="absolute top-0 flex w-full h-screen z-0">
      <div className="bg-white  left-0 w-1/4  flex-1 shadow-xl"></div>
      <div className="bg-white  left-[25%] w-1/4  flex-1 shadow-xl"></div>
      <div className="bg-white  left-[50%] w-1/4  flex-1 shadow-xl"></div>
      <div className="bg-white  left-[75%] w-1/4  flex-1 shadow-xl"></div>
    </div>
  );
};

export default Background;
