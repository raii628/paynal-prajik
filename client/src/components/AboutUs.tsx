import aboutUs_bg from "../assets/aboutUs_bg.jpg";

const AboutUs = () => {
  return (
    <div className="flex justify-between items-center p-10">
      <div>
        <img src={aboutUs_bg} />
      </div>
      <div>
        <h1>
          <i className="fa fa-moon"></i>AboutUs
        </h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est,
          eligendi. Quod corrupti explicabo commodi, tempore aperiam facere,
          amet voluptatem eaque minima iure eos similique ipsam laborum labore
          ipsum qui culpa.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
