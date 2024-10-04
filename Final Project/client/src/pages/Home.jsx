import React from "react";
import HeroBanner from "../components/HeroBanner";
import Categories from "../components/Categories";
import Courses from "../components/Courses";
import Banner01 from "../components/Banner01";
import Stats from "../components/Stats";
import Banner02 from "../components/Banner02";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <div>
      {/* Hero banner */}
      <HeroBanner></HeroBanner>
      {/* Categoried */}
      <Categories></Categories>
      {/* Courses */}
      <Courses></Courses>
      {/* Banner 01 */}
      <Banner01></Banner01>
      {/* Stats */}
      <Stats></Stats>
      {/* Banner 02 */}
      <Banner02></Banner02>
      {/* Testimonials */}
      <Testimonials></Testimonials>
    </div>
  );
}
