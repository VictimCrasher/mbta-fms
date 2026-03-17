export function parseOffsetFromUrl(url: string | null): number | null {
	if (!url) return null;
	const match = url.match(/page\[offset\]=(\d+)/);
	return match ? parseInt(match[1], 10) : null;
}
