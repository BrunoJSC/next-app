interface BoxProps {
  title: string;
  paragraph: string;
}

export function Card({ title, paragraph }: BoxProps) {
  return (
    <div className="max-w-full sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] mx-auto my-6 px-4">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
        {title}
      </h1>
      <p className="text-base sm:text-sm md:text-[20px]  text-[#848484] mt-3 leading-relaxed">
        {paragraph}
      </p>
    </div>
  );
}
