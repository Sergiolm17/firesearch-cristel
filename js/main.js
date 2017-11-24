/* global instantsearch */

app({
  appId: 'MNMUV5EOBC',
  apiKey: '0d4851d5220a91896691b0cf432abde0',
  indexName: 'USUARIOS',
});

function app(opts) {
  const search = instantsearch({
    appId: opts.appId,
    apiKey: opts.apiKey,
    indexName: opts.indexName,
    urlSync: true,
  });
/*
  search.addWidget(
    instantsearch.widgets.stats({
      container: '#stats',
    })
  );
  */
  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-input',
      placeholder: 'Buscador de Clientes',
    })
  );

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      hitsPerPage: 3,
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results'),
      },
    })
  );
search.addWidget(
    instantsearch.widgets.pagination({
     container: '#pagination',
     scrollTo: '#search-input',
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
