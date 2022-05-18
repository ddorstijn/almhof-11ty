const fs   = require('fs');
const yaml = require("js-yaml")

const htmlmin = require("html-minifier")

const addFilters = require("./src/_11ty/filters");
const addShortcodes = require("./src/_11ty/shortcodes");

const i18n = require('eleventy-plugin-i18n');
const sitemap = require("@quasibit/eleventy-plugin-sitemap");

const translations = yaml.load(fs.readFileSync('./src/_11ty/data/translations.yml', 'utf8'));

module.exports = (eleventyConfig) => {
    // Disable automatic use of your .gitignore
    eleventyConfig.setUseGitIgnore(false)
    // Merge data instead of overriding
    eleventyConfig.setDataDeepMerge(true)

    // Support .yaml Extension in _data
    eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents))

    // Transforms
    // ---------------------------------------------------
    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
        if (!outputPath.endsWith(".html")) return content
        
        return htmlmin.minify(content, {
            useShortDoctype: true,
            removeComments: true,
            collapseWhitespace: true
        })
    });

    // Shortcodes & Filters
    // -----------------------------------------------------
    addShortcodes(eleventyConfig);
    addFilters(eleventyConfig);

    // Plugins
    // -----------------------------------------------------
    eleventyConfig.addPlugin(i18n, {
        translations,
        fallbackLocales: {
            '*': 'en'
        }
    });

    eleventyConfig.addPlugin(sitemap, {
        sitemap: {
            hostname: "https://almhof.netlify.com",
        },
    });

    // Passthroughs
    // -----------------------------------------------------

    return {
        htmlTemplateEngine: 'njk',
        dir: {
            input: 'src',
            output: 'public',
            includes: '_11ty/includes',
            layouts: '_11ty/layouts',
            data: '_11ty/data',
        }
    }
}