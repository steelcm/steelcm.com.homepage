import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default (eleventyConfig) => {
  // Add syntax highlighting at build time via prismJS
  eleventyConfig.addPlugin(syntaxHighlight);
  // Add current year shortcode {% year %}
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  // Add date formatter
  eleventyConfig.addFilter("longDate", (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // eleventyConfig.setFrontMatterParsingOptions({
  //   excerpt: true,
  //   excerpt_alias: "excerpt",
  //   excerpt_separator: "<!-- excerpt -->",
  // });

  eleventyConfig.addPassthroughCopy({
    "src/_includes/assets/css/global.css": "./global.css",
  });

  // Exlude posts that have `draft: true` in their front matter
  eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
    if (data.draft) {
      return false;
    }
  });

  return {
    dir: {
      input: "src",
    },
  };
};
