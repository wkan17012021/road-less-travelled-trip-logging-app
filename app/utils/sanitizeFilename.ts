export function sanitizeFilename(filename: string): string {
    return filename
      .normalize("NFD") // Normalize accented characters like é → e
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/[^a-zA-Z0-9.\-_]/g, "-") // Replace unsafe characters with dashes
      .toLowerCase(); // Optional: lowercase for consistency
  }