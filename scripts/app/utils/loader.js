export function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loading';
    loader.innerHTML = '<img src="assets/images/icons/loading.gif" alt="Loading...">';
    document.body.appendChild(loader);
  }
  
  export function hideLoading() {
    const loader = document.querySelector('.loading');
    if (loader) loader.remove();
  }
  