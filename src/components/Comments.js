import React, { useEffect } from 'react';

const REPO_NAME = 'sakakinox/sakakinox_gatsby_blog';

const Utterances = () => {
  useEffect(() => {
    const scriptEl = document.createElement('script');
    scriptEl.src = 'https://utteranc.es/client.js';
    scriptEl.async = true;
    scriptEl.crossOrigin = 'anonymous';
    scriptEl.setAttribute('repo', REPO_NAME);
    scriptEl.setAttribute('issue-term', 'pathname'); 
    scriptEl.setAttribute('label','comments');
    scriptEl.setAttribute('theme', 'github-light');

    const commentsEl = document.getElementById('utterances-comments');
    if (commentsEl) commentsEl.appendChild(scriptEl);

    return () => {
      if (commentsEl) commentsEl.innerHTML = '';
    };
  }, []);

  return <div id="utterances-comments"></div>;
};

export default Utterances;
