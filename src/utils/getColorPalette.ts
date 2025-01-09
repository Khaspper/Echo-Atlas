import ColorThief from 'colorthief';

/**
 * Fetches the dominant color palette from an image URL.
 * @param {string} imageUrl - The URL of the image to extract colors from.
 * @param {number} colorCount - Number of colors to extract (default: 5).
 * @returns {Promise<number[][]>} - A promise resolving with an array of RGB colors.
 */
const getColorPalette = async (
    imageUrl: string,
    colorCount = 5
): Promise<number[][]> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imageUrl;

        img.onload = () => {
            try {
                const colorThief = new ColorThief();
                if (!(img instanceof HTMLImageElement)) {
                    reject('Invalid image element provided.');
                }
                const palette = colorThief.getPalette(img, colorCount);
                resolve(palette);
            } catch (error) {
                reject(`Error extracting colors: ${error}`);
            }
        };

        img.onerror = () => reject('Failed to load image for color extraction');
    });
};

export default getColorPalette;
