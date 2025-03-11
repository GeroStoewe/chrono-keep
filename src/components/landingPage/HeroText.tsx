type HeroTextProps = {
  title: string;
  subtitle: string;
};

/**
 * HeroText component
 *
 * Renders the main title and subtitle for the hero section of the landing page.
 * The title is styled with a large font and bold text, while the subtitle is displayed
 * in a slightly smaller font below the title.
 *
 * @param {HeroTextProps} props - The properties for the HeroText component.
 * @param {string} props.title - The main title text to be displayed.
 * @param {string} props.subtitle - The subtitle text to be displayed beneath the title.
 *
 * @returns {JSX.Element} The rendered HeroText component.
 */
const HeroText = ({ title, subtitle }: HeroTextProps) => {
  const [firstLine, secondLine] = title.split("\n");

  return (
    <div className="relative z-10">
      <h1
        className="text-9xl font-bold text-white mb-8 select-none"
        style={{
          fontFamily: "Bebas Neue, sans-serif"
        }}
      >
        {firstLine}
        <br />
        {secondLine}
      </h1>
      <p className="text-3xl text-white mb-8 select-none">{subtitle}</p>
    </div>
  );
};

export default HeroText;
