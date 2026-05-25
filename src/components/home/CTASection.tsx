export function CTASection() {
  return (
    <section className="cta-section bg-primary text-on-primary rounded-xl py-16 px-8 flex flex-col items-center text-center my-16">
      <h3 className="text-h2 font-serif mb-4">
        Ready to give your ideas the home they deserve?
      </h3>
      <p className="text-body-lg mb-8 max-w-2xl mx-auto">
        Join over 10,000 creators who have found their voice on SCRIBBLED. Start
        your creative journey today with no commitment.
      </p>
      <div className="flex gap-4 justify-center">
        <button className="btn-secondary bg-secondary text-on-secondary px-6 py-3 rounded">
          Join the Community
        </button>
        <button className="btn-primary border border-on-primary px-6 py-3 rounded bg-transparent text-on-primary">
          Explore Membership
        </button>
      </div>
    </section>
  );
}
