(function() {
  // Ensure React and ReactDOM are loaded
  function loadScript(src, callback) {
    var script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = callback;
    document.head.appendChild(script);
  }

  // Load React and ReactDOM
  function loadReact(callback) {
    if (!window.React || !window.ReactDOM) {
      loadScript('https://unpkg.com/react@17/umd/react.production.min.js', function() {
        loadScript('https://unpkg.com/react-dom@17/umd/react-dom.production.min.js', callback);
      });
    } else {
      callback();
    }
  }

  // Load and render the React app
  function loadReactApp() {
    loadScript('https://world-table-appiness.vercel.app/static/js/main.js', function() {
      if (typeof window.App !== 'undefined') {
        var container = document.getElementById('react-app-root');
        if (!container) {
          container = document.createElement('div');
          container.id = 'react-app-root';
          document.body.appendChild(container);
        }
        ReactDOM.render(React.createElement(App), container);
      } else {
        console.error('App component is not defined');
      }
    });
  }

  // Start loading process
  loadReact(loadReactApp);
})();

