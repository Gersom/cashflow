const fs = require('fs').promises;
const path = require('path');

const getRouteFolders = async (ROUTES_DIR) => {
  const files = await fs.readdir(ROUTES_DIR);
  const folders = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(ROUTES_DIR, file);
      const stats = await fs.stat(filePath);
      return stats.isDirectory() ? file : null;
    })
  );
  return folders.filter(Boolean);
};

module.exports = getRouteFolders;