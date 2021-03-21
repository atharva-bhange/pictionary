export const getRandom = <T>(items: T[]) => {
	if (items.length === 0) return null;
	return items[Math.floor(Math.random() * items.length)];
};
