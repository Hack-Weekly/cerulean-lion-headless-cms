import background from "@/image/home-page-lion.jpg";
import Button from "@/components/Button";

export default function HeroSection() {
  const signupButton = "Sign Up";

  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${background.src})` }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-white">
        <div className="max-w-md">
          <h2 className="mb-5 text-3xl font-general">
            where
            <h1 className="text-amber-500 font-heading text-5xl font-bold italic">
              LIONS
            </h1>
            gather
          </h2>
          <p className="mb-5 font-inter">
            Remember Tumblr? Well you're more sophisticated now so welcome to
            the Lion's Den. Click the button below!
          </p>
          <Button
            className={
              "btn lion border-2 border-amber-500 shadow-lg hover:text-amber-500 font-general"
            }
            text={signupButton}
          />
        </div>
      </div>
    </div>
  );
}
