export function randomCrocodileData() {
  const names = ['Ziggy', 'Bruno', 'Lizzy', 'Kiko', 'Rango', 'Drako'];
  const sexes = ['M', 'F'];

  function randomDate(start = new Date(2000, 0, 1), end = new Date(2022, 0, 1)) {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0]; // formato yyyy-mm-dd
  }

  return {
    name: names[Math.floor(Math.random() * names.length)],
    sex: sexes[Math.floor(Math.random() * sexes.length)],
    date_of_birth: randomDate(),
  };
}