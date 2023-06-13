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
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Where Lions Gather</h1>
          <p className="mb-5">
            Remember Tumblr? We've turned it into the Lion's Den. Click the
            button below!
          </p>
          <Button text={signupButton} />
        </div>
      </div>
    </div>
  );
}
