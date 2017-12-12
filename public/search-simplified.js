/* global instantsearch */

app({
  appId: 'MNMUV5EOBC',
  apiKey: '6df7a68d694d65fb9c472c710a8e3f7b',
  indexName: 'MARCAS',
});

function app(opts) {
  const search = instantsearch({
    appId: opts.appId,
    apiKey: opts.apiKey,
    indexName: opts.indexName,
    urlSync: true,
  });

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#name',
      placeholder: 'Nombre de la marca',
    })
  );

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      hitsPerPage: 10,
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results'),
      },
    })
  );










  search.start();
}

function getTemplate(templateName) {
  return document.querySelector(`#${templateName}-template`).innerHTML;
}

function getHeader(title) {
  return `<h5>${title}</h5>`;
}
