const fs = require('fs').promises;
const handlebars = require('handlebars');
const path = require('path');
const juice = require('juice');

const generateHTML = async (templatePath, data) => {

  // Leer la plantilla HTML
  const fileHTMLPath = path.join(__dirname, '..', 'templates', `${templatePath}.html`);
  const templateHTML = await fs.readFile(fileHTMLPath, 'utf-8');

  // Leer el archivo CSS
  const fileCSSPath = path.join(__dirname, '..', 'templates', `${templatePath}.css`);
  const templateCSS = await fs.readFile(fileCSSPath, 'utf-8');

  // Inliner el CSS en la plantilla HTML
  const templateSource = juice.inlineContent(templateHTML, templateCSS);

  // Compilar la plantilla
  const template = handlebars.compile(templateSource);

  // Renderizar la plantilla con datos dinámicos
  return template(data);
}

module.exports = { generateHTML };