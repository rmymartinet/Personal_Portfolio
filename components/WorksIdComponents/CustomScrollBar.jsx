const CustomScrollbar = ({ scrollRef }) => {
  const bars = Array.from({ length: 25 }, (_, i) => (
    <div key={i} className="bg-black w-[3px] h-[10px]"></div>
  ));
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-[60%] flex items-center gap-10">
      <div className="opacity-40">Scroll</div>
      <div ref={scrollRef} className="flex gap-1">
        {bars}
      </div>
    </div>
  );
};

export default CustomScrollbar;
