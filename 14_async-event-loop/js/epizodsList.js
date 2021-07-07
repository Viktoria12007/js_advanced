export function createEpizodsList(data) {
  const title = document.createElement('h1');
  title.textContent = 'THE STAR WARS';
  title.classList.add('main-title');
  const list = document.createElement('ul');
  list.classList.add('epizods-list');
  data.results.map((epizod, index) => {
    const element = document.createElement('li');
    element.classList.add('epizods-item');
    const link = document.createElement('a');
    link.href = `./html/epizod${index+1}.html`;
    link.textContent = `${index+1}. ${epizod.title}`;
    link.classList.add('epizods-link');
    element.append(link);
    list.append(element);
  })
  container.append(title, list);
}
