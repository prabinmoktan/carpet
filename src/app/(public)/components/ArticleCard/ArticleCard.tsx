/* eslint-disable @next/next/no-img-element */
import Image, { StaticImageData } from "next/image";
import React from "react";
import Badge from "../../ui/Badge/Badge";
import TitleHeader from "../../ui/TitleHeader/TitleHeader";
import AnimateParagraph from "../../ui/AnimateParagraph/AnimateParagraph";
import { MoveRight } from "lucide-react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface InspirationPostTypes {
  id?: number;
  title: string;
  excerpt: string;
  content?: string;
  category?: string | undefined;
  date?: string;
  image?: string | StaticImageData;
  author?: string;
  readTime?: string;
  gradient?: string;
  className?: string;
  onClick?: ()=>void;
}

const ArticleCard: React.FC<InspirationPostTypes> = ({
  id,
  title,
  excerpt,
  content,
  category,
  date,
  image,
  author,
  gradient,
  readTime,
  className,
  onClick
}) => {
  return (
    <>
      <article className={`${className}  w-full bg-zinc-200 rounded-lg`}>
        <div
          className="w-1/2  rounded-lg"
          style={{ backgroundImage: gradient }}
        ></div>
        <div className="space-y-10 py-5">
          <Badge title={category} variant={"primary"} />
          <TitleHeader title={title} />
          <AnimateParagraph paragraph={excerpt} />
          <div className="flex justify-between  text-sm">
            <span className="text-gray-400">{date}</span>
            <span className="flex gap-3 cursor-pointer hover:bg-gray-300 px-2 py-1 duration-150 rounded-lg transition-all" onClick={onClick}>
              <p>Read More</p>
              <MoveRight />
            </span>
          </div>
        </div>
      </article>
    </>
  );
};

export default ArticleCard;
