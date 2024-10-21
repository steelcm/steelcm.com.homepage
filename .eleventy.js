import eleventySass from "@11tyrocks/eleventy-plugin-sass-lightningcss";

export default (eleventyConfig) => {
  // Compile Sass in Eleventy (11ty) and process it with LightningCSS to minify, prefix, and add future CSS support.
  eleventyConfig.addPlugin(eleventySass);
  // Add current year shortcode {% year %}
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  return {
    dir: {
      input: "src",
    },
  };
};
