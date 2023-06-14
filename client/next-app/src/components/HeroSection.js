import background from "@/image/home-page-lion.jpg";
import Button from "@/components/Button";

export default function HeroSection() {
  const signupButton = "Sign Up";
  const signupButtonRoute = "/auth/register";

  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${background.src})` }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-white">
        <div className="max-w-md">
          <h2 className="mb-5 text-3xl font-general">
            where <br />
            <span className="text-amber-500 font-heading text-5xl font-bold italic">
              LIONS
            </span>
            <br />
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
            onClick={() => (location.href = "/auth/register")}
            value="register"
          />
        </div>
      </div>
    </div>
  );
}
