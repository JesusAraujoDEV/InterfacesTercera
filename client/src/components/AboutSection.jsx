const AboutSection = () => {
  return (
    <section id="about-section" className="px-12 lg:px-32 py-16 border-t relative" style={{ borderColor: 'var(--color-accent)', background: 'var(--color-secondary)', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-paragraph)' }}>
      {/* Main text start */}
      <h1 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-title)', fontSize: 'var(--font-size-headline)' }}>ABOUT US</h1>
      <p style={{ color: 'var(--color-text)', fontSize: 'var(--font-size-paragraph)' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati sint quia quos, nesciunt id esse magnam
        facere eveniet ea laborum minus illo earum! Dolorum repellat eos, quod tempora omnis magni blanditiis eligendi
        nesciunt aut sapiente nemo distinctio placeat voluptas facilis deserunt quaerat, voluptatem hic accusamus dicta,
        eaque asperiores qui quasi?
      </p>
      {/* Main text end */}

      {/* "More" link start */}
      <a href="#" className="text-end">
        <p className="font-semibold text-lg group relative" style={{ color: 'var(--color-accent)' }}>
          <span>Read more </span>
          <i className="fa-solid fa-arrow-right"></i>
        </p>
      </a>
      {/* "More" link end */}

      {/* Circle start */}
      <div className="h-44 w-44 md:h-52 md:w-52 rounded-full absolute top-0 -left-20 mt-16 -z-20" style={{ background: 'var(--color-neutral)' }}></div>
      {/* Circle end */}
    </section>
  )
}

export default AboutSection
