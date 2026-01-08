'use client';
import React from "react";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import { inspirationPosts } from "@/app/constant";
import TitleHeader from "../../ui/TitleHeader/TitleHeader";
import AnimateParagraph from "../../ui/AnimateParagraph/AnimateParagraph";
import { useRouter } from "next/navigation";

const Page = () => {
    const route = useRouter()
  return (
    <>
      <article className="px-10 space-y-10 mt-10">
        <TitleHeader title={"Design Inspiration"} />
        <AnimateParagraph paragraph="Explore stories, tips, and ideas to transform your space with the perfect rug" />
      <article className="w-full mt-5  py-2">
        {inspirationPosts?.[0] && (
            <ArticleCard
            title={inspirationPosts[0].title}
            excerpt={inspirationPosts[0].excerpt}
            date={inspirationPosts[0].date}
            category={inspirationPosts[0].category}
            gradient={inspirationPosts[0].image}
            className="flex gap-10"
            onClick={()=>route.push(`/inspiration/${inspirationPosts[0].id}`)}
            />
        )}
        </article>
        <TitleHeader title={"Latest Article"} />
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
            {
                inspirationPosts?.map((post)=>(
                    <ArticleCard
                    key={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    date={post.date}
                    category={post.category}
                    gradient={post.image}
                    className=" flex flex-col"
                    onClick={()=> route.push(`/inspiration/${post.id}`)}/>
                ))
            }
        </div>

      </article>
    </>
  );
};

export default Page;
