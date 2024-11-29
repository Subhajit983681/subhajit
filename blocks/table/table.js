async function createTableHeader(table) {
  const tr = document.createElement('tr');
  const sno = document.createElement('th'); sno.appendChild(document.createTextNode('SNo'));
  const conuntry = document.createElement('th'); conuntry.appendChild(document.createTextNode('Player Name'));
  const continenth = document.createElement('th'); continenth.appendChild(document.createTextNode('Country'));
  const capitalh = document.createElement('th'); capitalh.appendChild(document.createTextNode('Runs'));
  const matchTH = document.createElement('th'); matchTH.appendChild(document.createTextNode('Match'));
  const innTH = document.createElement('th'); innTH.appendChild(document.createTextNode('Innings'));
  const avgTh = document.createElement('th'); avgTh.appendChild(document.createTextNode('Avg'));
  tr.append(sno);
  tr.append(conuntry);
  tr.append(capitalh);
  tr.append(continenth);
  tr.append(matchTH);
  tr.append(innTH);
  tr.append(avgTh);
  table.append(tr);
}
async function createTableRow(table, row, i) {
  const tr = document.createElement('tr');
  const sno = document.createElement('td'); sno.appendChild(document.createTextNode(i));
  const conuntry = document.createElement('td'); conuntry.appendChild(document.createTextNode(row.player_name));
  const continent = document.createElement('td'); continent.appendChild(document.createTextNode(row.country));
  const capital = document.createElement('td'); capital.appendChild(document.createTextNode(row.runs));
  const abbr = document.createElement('td'); abbr.appendChild(document.createTextNode(row.match));
  const inn = document.createElement('td'); inn.appendChild(document.createTextNode(row.innings));
  const avg = document.createElement('td'); avg.appendChild(document.createTextNode(row.avg));
  tr.append(sno);
  tr.append(conuntry);
  tr.append(continent);
  tr.append(capital);
  tr.append(abbr);
  tr.append(inn);
  tr.append(avg);
  table.append(tr);
}

async function createSelectMap() {
  const optionsMap = new Map();

  optionsMap.set('all', 'All');
  optionsMap.set('india', 'India');
  optionsMap.set('australian', 'Australian');
  optionsMap.set('england', 'England');
  const select = document.createElement('select');
  select.id = 'country';
  select.name = 'country';
  optionsMap.forEach((val, key) => {
    const option = document.createElement('option');
    option.textContent = val;
    option.value = key;
    select.append(option);
  });

  const div = document.createElement('div');
  div.classList.add('country-select');
  div.append(select);
  return div;
}
async function createTable(jsonURL, val) {
  let pathname = null;
  if (val) {
    pathname = jsonURL;
  } else {
    pathname = new URL(jsonURL);
  }

  const resp = await fetch(pathname);
  const json = await resp.json();

  const table = document.createElement('table');
  createTableHeader(table);
  json.data.forEach((row, i) => {
    createTableRow(table, row, (i + 1));
  });

  return table;
}

export default async function decorate(block) {
  const countries = block.querySelector('a[href$=".json"]');
  const parientDiv = document.createElement('div');
  parientDiv.classList.add('contries-block');

  if (countries) {
    parientDiv.append(await createSelectMap(countries.href));
    parientDiv.append(await createTable(countries.href, null));
    countries.replaceWith(parientDiv);
  }
  const dropdown = document.getElementById('country');
  dropdown.addEventListener('change', () => {
    let url = countries.href;
    if (dropdown.value !== 'all') {
      url = `${countries.href}?sheet=${dropdown.value}`;
      console.log("url", url)
    }
    const tableE = parientDiv.querySelector(':scope > table');
    const promise = Promise.resolve(createTable(url, dropdown.value));
    promise.then((val) => {
      tableE.replaceWith(val);
    });
  });
}
