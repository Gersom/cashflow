const fs = require('fs').promises;
const handlebars = require('handlebars');
const path = require('path');
const juice = require('juice');

const generateHTML = async (templatePath, data) => {

  // Read the HTML template
  const fileHTMLPath = path.join(__dirname, '..', 'templates', `${templatePath}.html`);
  const templateHTML = await fs.readFile(fileHTMLPath, 'utf-8');

  // Read CSS file
  const fileCSSPath = path.join(__dirname, '..', 'templates', `${templatePath}.css`);
  const templateCSS = await fs.readFile(fileCSSPath, 'utf-8');

  // Inliner el CSS en la plantilla HTML
  const templateSource = juice.inlineContent(templateHTML, templateCSS);

  // Compile the template
  const template = handlebars.compile(templateSource);

  // Render the template with dynamic data
  return template(data);
}

module.exports = { generateHTML };