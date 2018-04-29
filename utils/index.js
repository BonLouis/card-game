module.exports = {
	mapToStr: map => JSON.stringify([...map]),
	strToMap: str => new Map(JSON.parse(str)),
}
