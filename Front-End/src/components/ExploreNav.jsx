import { Link } from "react-router";

import planet from "../images/planet.svg";
import calendar from "../images/calendar.svg";
import star from "../images/star.svg";
import image from "../images/image.svg";

function ExploreNav() {
  const sections = [
    {
      id: 1,
      icon: calendar,
      title: "Picture of the Day",
      path: "/apod",
    },
    {
      id: 2,
      icon: image,
      title: "Images & Videos",
      path: "/imagevideo",
    },
    {
      id: 3,
      icon: planet,
      title: "Planets",
      path: "/planets",
    },
    {
      id: 4,
      icon: star,
      title: "Stars",
      path: "/stars",
    },
  ];
  return (
    <div>
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 gap-8">
          {sections.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="group block p-8 bg-gray-900/40 rounded-2xl border border-gray-800 hover:border-sky-500/50 transition-all duration-300"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <img src={item.icon} className="max-w-24 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-sky-400 text-white">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ExploreNav;
